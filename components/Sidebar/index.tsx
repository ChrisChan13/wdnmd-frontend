import React from 'react';

import style from './index.less';

export default () => (
  <div className={style.sidebar}>
    <div className={style['sidebar-info']}>
      <img src="https://avatars3.githubusercontent.com/u/27924290" alt="ChrisChan13" />
      <h2>ChrisChan</h2>
      <span>ChrisChan13</span>
      <p>
        <span>TypeError: Cannot read property &apos;Bio&apos; of undefined</span>
      </p>
      <span role="img" aria-hidden="true">6 followers · 6 following · ⭐ 118</span>
    </div>
    <div className={style['sidebar-external']}>
      <span>·&nbsp;友情链接&nbsp;·</span>
      <span>
        <a href="http://eps.ink" target="_new">eps.ink</a>
      </span>
      <hr />
      <span>©2020 ChrisChan</span>
      <span>
        Powered&nbsp;by&nbsp;
        <a href="https://github.com/ChrisChan13" target="_new">@ChrisChan13</a>
      </span>
      <span>
        联系我&nbsp;:&nbsp;
        <a href="mailto:chrischan1213@qq.com">chrischan1213@qq.com</a>
      </span>
    </div>
  </div>
);
