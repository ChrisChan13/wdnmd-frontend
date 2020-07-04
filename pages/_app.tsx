import App from 'next/app';
import React from 'react';
import Head from 'next/head';

import './_app.less';

import Header from '../components/Header';

export default class wdnmd extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <div id="app">
        <Head>
          <title>WDNMD - ChrisChan</title>
        </Head>
        <Header />
        <Component {...pageProps} />
      </div>
    );
  }
}
