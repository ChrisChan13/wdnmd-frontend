import React from 'react';
import getConfig from 'next/config';

import { getLabels } from '../../../apis';
import Labels from '../../../components/Labels';
import Articles from '../../../components/Articles';
import style from '../index.less';

type Props = {
  labels: [],
  parent: string,
  child: string,
};

const { env: ENV } = getConfig().publicRuntimeConfig;

export default class Category extends React.Component<Props> {
  static async getInitialProps(props: { query: { parent: string } }) {
    if (process.browser && ENV !== 'dev') return (window as any).__NEXT_DATA__.props.pageProps;
    const { parent } = props.query;
    const labels = await getLabels();
    return {
      labels,
      parent,
    };
  }

  render() {
    const { labels, parent } = this.props;
    return (
      <div className={style.container}>
        <Labels labels={labels} parent={parent} />
        <Articles articles={[]} />
      </div>
    );
  }
}
