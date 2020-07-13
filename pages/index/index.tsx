import React from 'react';
import { AppContext } from 'next/app';
import getConfig from 'next/config';

import { getLabels, getArticles } from '../../apis';
import style from './index.less';
import Labels from '../../components/Labels';
import Articles from '../../components/Articles';

type Props = {
  labels: [],
  articles: [],
};

const { env: ENV } = getConfig().publicRuntimeConfig;

export default class Index extends React.Component<Props> {
  static async getInitialProps(props: AppContext) {
    if (process.browser && ENV !== 'dev') return (window as any).__NEXT_DATA__.props.pageProps;
    const labels = await getLabels();
    const articles = await getArticles();
    return {
      labels,
      articles,
    };
  }

  render() {
    const { labels, articles } = this.props;
    return (
      <div className={style.container}>
        <Labels labels={labels} />
        <Articles articles={articles} />
      </div>
    );
  }
}
