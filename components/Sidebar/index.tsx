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
      <p style={{ fontSize: '12px' }}>
        <svg className={style['sidebar-icon']} height="16" width="16">
          <path fillRule="evenodd" d="M5.5 3.5a2 2 0 100 4 2 2 0 000-4zM2 5.5a3.5 3.5 0 115.898 2.549 5.507 5.507 0 013.034 4.084.75.75 0 11-1.482.235 4.001 4.001 0 00-7.9 0 .75.75 0 01-1.482-.236A5.507 5.507 0 013.102 8.05 3.49 3.49 0 012 5.5zM11 4a.75.75 0 100 1.5 1.5 1.5 0 01.666 2.844.75.75 0 00-.416.672v.352a.75.75 0 00.574.73c1.2.289 2.162 1.2 2.522 2.372a.75.75 0 101.434-.44 5.01 5.01 0 00-2.56-3.012A3 3 0 0011 4z" />
        </svg>
        <span>&nbsp;6&nbsp;followers</span>
        <span>&nbsp;·&nbsp;</span>
        <span>6&nbsp;following</span>
        <span>&nbsp;·&nbsp;</span>
        <svg className={style['sidebar-icon']} height="16" width="16">
          <path fillRule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z" />
        </svg>
        <span>&nbsp;121</span>
      </p>
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
