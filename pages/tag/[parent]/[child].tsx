import React from 'react';
import getConfig from 'next/config';
import Head from 'next/head';

import { getLabels, getArticles } from '../../../apis';
import Labels from '../../../components/Labels';
import Articles from '../../../components/Articles';
import Sidebar from '../../../components/Sidebar';
import NoMore from '../../../components/NoMore';
import style from '../index.less';
import { getParentAndChild } from '../../../utils';

type Props = {
  labels: [],
  parent: string,
  child: string,
  articles: [],
  parentEntity: any,
  childEntity: any,
};

const { env: ENV } = getConfig().publicRuntimeConfig;

export default class Category extends React.Component<Props> {
  static async getInitialProps(props: { query: { parent: string, child: string } }) {
    if (process.browser && ENV !== 'dev') return (window as any).__NEXT_DATA__.props.pageProps;
    const { parent, child } = props.query;
    const labels = await getLabels();
    const { child: id, parentEntity, childEntity } = getParentAndChild(labels, parent, child);
    const articles = await getArticles(id);
    return {
      labels,
      parent,
      child,
      articles,
      parentEntity,
      childEntity,
    };
  }

  render() {
    const {
      labels,
      parent,
      child,
      articles,
      parentEntity,
      childEntity,
    } = this.props;
    return (
      <div className={style.container}>
        <Head>
          <title>{`${childEntity.label} - ${parentEntity.label} - WDNMD - ChrisChan`}</title>
        </Head>
        <Labels labels={labels} parent={parent} child={child} />
        <Articles articles={articles} />
        {articles.length > 0 && <NoMore />}
        <Sidebar />
      </div>
    );
  }
}
