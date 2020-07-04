/* eslint-disable no-param-reassign */
const withCss = require('@zeit/next-css');
const withLess = require('@zeit/next-less');

const fetch = require('isomorphic-unfetch');

const ENV = process.env.NODE_ENV || 'dev';

const prefix = 'http://localhost:1213/api';

const request = async (url) => {
  const response = await fetch(`${prefix}${url}`);
  if (response.status !== 200) return Promise.reject(new Error('请求失败'));
  const json = await response.json();
  if (json.code !== 200) return Promise.reject(new Error(json.message || '请求失败'));
  return Promise.resolve(json.data);
};

const getRoutes = async (defaultPathMap) => {
  if (ENV !== 'dev') {
    const labels = await request('/labels');
    delete defaultPathMap['/category/[parent]'];
    delete defaultPathMap['/category/[parent]/[child]'];
    labels.map((item) => {
      let route = '/category';
      let page = '/category';
      const query = { parent: item._id };
      if (item.parent) {
        const parent = labels.find((label) => label._id === item.parent);
        route += `/${parent.alias}`;
        page += '/[parent]/[child]';
        Object.assign(query, {
          parent: item.parent,
          child: item._id,
        });
      } else {
        page += '/[parent]';
      }
      route += `/${item.alias}`;
      Object.assign(defaultPathMap, {
        [`${route}`]: {
          page,
          query,
        },
      });
      return item;
    });
  }
  console.log(defaultPathMap);
  return defaultPathMap;
};

const getAssetPrefix = (env) => {
  console.log(env);
  // eslint-disable-next-line no-nested-ternary
  const assetPrefix = env === 'test' ? '/wdnmd' : env === 'production' ? 'https://cdn.jsdelivr.net/gh/ChrisChan13/wdnmd' : '';
  console.log(assetPrefix);
  return assetPrefix;
};

module.exports = withLess({
  ...withCss(),
  publicRuntimeConfig: {
    env: ENV,
  },
  exportPathMap: getRoutes,
  exportTrailingSlash: true,
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: '[local]___[hash:base64:5]',
  },
  // eslint-disable-next-line no-nested-ternary
  assetPrefix: getAssetPrefix(ENV),
});
