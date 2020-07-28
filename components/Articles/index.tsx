import React from 'react';

import { formatTime } from '../../utils';
import style from './index.less';
import Link from '../../components/Link';

type Props = {
  articles: [],
};

export default (props: Props) => {
  const { articles } = props;
  return (
    <div className={style.articles}>
      {
        articles.length === 0 && (
          <div className={style.empty}>
            <span>暂时没有发布任何文章呦~</span>
          </div>
        )
      }
      {
        articles.map((article: any) => (
          <Link
            key={article._id}
            href={`/post/${article._id}`}
          >
            <div className={style['articles-item']}>
              <div className={style['articles-item-head']}>
                <span>{formatTime(article.postedAt)}</span>
                <span>&nbsp;·&nbsp;</span>
                {
                  article.labels.map((label: any) => (
                    <Link
                      key={label._id}
                      href={`/tag/${label.parent ? `${label.parent.alias}/` : ''}${label.alias}`}
                      label={label.label}
                      className={style['articles-item-label']}
                    />
                  ))
                }
              </div>
              <div className={style['articles-item-title']}>
                <span>{article.title}</span>
              </div>
              {
                article.cover && (
                  <img className={style['articles-item-cover']} src={article.cover} alt={article.title} />
                )
              }
            </div>
          </Link>
        ))
      }
    </div>
  );
};
