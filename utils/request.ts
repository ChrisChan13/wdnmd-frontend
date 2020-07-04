import fetch from 'isomorphic-unfetch';

const prefix = 'http://localhost:1213/api';

export default async (url: string): Promise<any> => {
  const response = await fetch(`${prefix}${url}`);
  if (response.status !== 200) return Promise.reject(new Error('请求失败'));
  const json = await response.json();
  if (json.code !== 200) return Promise.reject(new Error(json.message || '请求失败'));
  return Promise.resolve(json.data);
};
