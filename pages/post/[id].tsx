import React from 'react';
import getConfig from 'next/config';
import Head from 'next/head';

import { getArticle } from '../../apis';
import { formatTime } from '../../utils';
import style from './index.less';
import Link from '../../components/Link';
import './markdown.css';
import 'highlight.js/styles/github-gist.css';
import lazyload from '../../utils/lazyload';

const { env: ENV } = getConfig().publicRuntimeConfig;

type Props = {
  article: any,
};

type State = {
  showCatalog: boolean;
};

export default class Profile extends React.Component<Props, State> {
  articleContent: React.RefObject<HTMLDivElement>;

  articleCatalog: React.RefObject<HTMLDivElement>;

  constructor(props: any) {
    super(props);
    this.articleContent = React.createRef<HTMLDivElement>();
    this.articleCatalog = React.createRef<HTMLDivElement>();
    this.state = {
      showCatalog: false,
    };
  }

  static async getInitialProps(props: { query: { id: string }}) {
    if (process.browser && ENV !== 'dev') return (window as any).__NEXT_DATA__.props.pageProps;
    const { id } = props.query;
    const article = await getArticle(id);
    return {
      article,
    };
  }

  componentDidMount() {
    const { article } = this.props;
    const articleMarkdown = document.createElement('div');
    articleMarkdown.classList.add('markdown-content');
    articleMarkdown.innerHTML = article.richtext;
    lazyload('iframe', articleMarkdown, {
      rootMargin: '0px 0px -130px 0px',
    });
    lazyload('img', articleMarkdown);
    if (this.articleContent.current) {
      this.articleContent.current.append(articleMarkdown);
    }
    const list = document.createElement('ul');
    if (this.articleContent.current) {
      this.articleContent.current.querySelectorAll('h1,h2,h3,h4,h5,h6').forEach((element: Element) => {
        const id = element.getAttribute('id');
        const tag = element.localName;
        if (id && /^h[1-6]$/.test(tag)) {
          const level = +tag.slice(1);
          const item = document.createElement('li');
          item.innerText = (element as HTMLDivElement).innerText;
          level > 1 && (
            item.style.marginLeft = `${(level - 1) * 10}px`,
            item.style.fontWeight = 'normal'
          );
          level > 2 && (item.style.fontSize = `${14 - (level - 2)}px`);
          const link = document.createElement('a');
          link.href = `#${id}`;
          link.append(item);
          list.append(link);
        }
      });
    }
    if (list.hasChildNodes()) {
      this.setState({
        showCatalog: true,
      }, () => {
        if (this.articleCatalog.current) {
          this.articleCatalog.current.append(list);
        }
      });
    }
  }

  render() {
    const { article } = this.props;
    const { showCatalog } = this.state;
    return (
      <div className={style.container}>
        <Head>
          <title>{`${article.title} - WDNMD - ChrisChan`}</title>
        </Head>
        <div ref={this.articleContent} className={style.article}>
          <div className={style['article-head']}>
            <span>{formatTime(article.postedAt)}</span>
            <span>&nbsp;·&nbsp;</span>
            {
              article.labels.map((label: any) => (
                <Link
                  key={label._id}
                  href={`/tag/${label.parent ? `${label.parent.alias}/` : ''}${label.alias}`}
                  label={label.label}
                  className={style['article-label']}
                />
              ))
            }
          </div>
          <div className={style['article-head']}>
            <span>最近更新</span>
            <span>&nbsp;·&nbsp;</span>
            <span>{formatTime(article.updatedAt)}</span>
          </div>
          {
            article.cover && (
              <img src={article.cover} alt={article.title} className={style['article-cover']} />
            )
          }
          <h1 className={style['article-title']}>{article.title}</h1>
        </div>
        <div className={style.categories}>
          <div ref={this.articleCatalog} className={style['categories-wrap']}>
            {showCatalog && <span>目录</span>}
          </div>
        </div>
        <style>
          {`
            .markdown-content h1,
            .markdown-content h2,
            .markdown-content h3,
            .markdown-content h4,
            .markdown-content h5,
            .markdown-content h6 {
              margin-top: calc(1em - 80px);
              padding-top: 80px;
            }
          `}
        </style>
      </div>
    );
  }
}
