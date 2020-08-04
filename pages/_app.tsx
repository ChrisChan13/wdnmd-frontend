import App from 'next/app';
import React from 'react';
import Head from 'next/head';
import getConfig from 'next/config';

import './_app.less';

import Header from '../components/Header';

const { env: ENV, platform: PLATFORM } = getConfig().publicRuntimeConfig;

export default class wdnmd extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <div id="app">
        <Head>
          <title>WDNMD - ChrisChan</title>
          {
            ENV === 'production' && (
              PLATFORM === 'gitee'
                ? <link rel="shortcut icon" href="/wdnmd/favicon.ico" />
                : <link rel="shortcut icon" href="https://cdn.jsdelivr.net/gh/ChrisChan13/wdnmd/favicon.ico" />
            )
          }
          {
            ENV === 'production' && (
              PLATFORM === 'gitee'
                ? <script src="/wdnmd/baidu.js" />
                : <script src="https://cdn.jsdelivr.net/gh/ChrisChan13/wdnmd/baidu.js" />
            )
          }
        </Head>
        <Header />
        <Component {...pageProps} />
      </div>
    );
  }
}
