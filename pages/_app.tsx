import App from 'next/app';
import React from 'react';
import Head from 'next/head';
import getConfig from 'next/config';

import './_app.less';

import Header from '../components/Header';

const { env: ENV } = getConfig().publicRuntimeConfig;

export default class wdnmd extends App {
  render() {
    const { Component, pageProps } = this.props;
    // eslint-disable-next-line no-nested-ternary
    return (
      <div id="app">
        <Head>
          <title>WDNMD - ChrisChan</title>
          {
            ENV === 'production' && (
              <script src="https://cdn.jsdelivr.net/gh/ChrisChan13/wdnmd/site.js" />
            )
          }
        </Head>
        <Header />
        <Component {...pageProps} />
      </div>
    );
  }
}
