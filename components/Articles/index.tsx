import React from 'react';

import style from './index.less';

type Props = {
  articles: [],
};

export default (props: Props) => (
  <div className={style.articles}>
    <div className={style.empty}>
      <span>暂时没有发布任何文章呦~</span>
    </div>
    {/* <div className={style['articles-item']}>
      <div className={style['articles-item-head']}>
        <span>4小时前</span>
        <span>&nbsp;·&nbsp;</span>
        <span className={style['articles-item-label']}>JavaScript</span>
        <span>&nbsp;/&nbsp;</span>
        <span className={style['articles-item-label']}>React.js</span>
      </div>
      <div className={style['articles-item-title']}>
        <span>这是标题！这是标题！这是标题！</span>
      </div>
      <img className={style['articles-item-cover']} src="" alt="" />
    </div> */}
  </div>
);
