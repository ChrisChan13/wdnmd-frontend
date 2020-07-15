import React from 'react';
import getConfig from 'next/config';
import Head from 'next/head';

import { getArticle } from '../../apis';
import { formatTime } from '../../utils';
import style from './index.less';
import Link from '../../components/Link';
import './markdown.css';
import 'highlight.js/styles/github-gist.css';

const { env: ENV } = getConfig().publicRuntimeConfig;

type Props = {
  article: any,
};

export default class Profile extends React.Component<Props> {
  static async getInitialProps(props: { query: { id: string }}) {
    if (process.browser && ENV !== 'dev') return (window as any).__NEXT_DATA__.props.pageProps;
    const { id } = props.query;
    const article = await getArticle(id);
    return {
      article,
    };
  }

  render() {
    const { article } = this.props;
    return (
      <div className={style.container}>
        <Head>
          <title>{`${article.title} - WDNMD - ChrisChan`}</title>
        </Head>
        <div className={style.article}>
          <div className={style['article-head']}>
            <span>{formatTime(article.postedAt)}</span>
            <span>&nbsp;·&nbsp;</span>
            {
              article.labels.map((label: any) => (
                <Link
                  key={label._id}
                  href={`/category/${label.parent ? `${label.parent.alias}/` : ''}${label.alias}`}
                  label={label.label}
                  className={style['article-label']}
                />
              ))
            }
          </div>
          {
            article.cover && (
              <img src={article.cover} alt={article.title} className={style['article-cover']} />
            )
          }
          <h1 className={style['article-title']}>{article.title}</h1>
          <div className="markdown-content" dangerouslySetInnerHTML={{ __html: article.richtext }} />
        </div>
      </div>
    );
  }
}
