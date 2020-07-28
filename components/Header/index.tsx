import React from 'react';
import Router from 'next/router';

import Link from '../Link';
import style from './index.less';

type State = {
  route: string,
};

export default class Header extends React.Component<{}, State> {
  isMounted: boolean;

  constructor(props: any) {
    super(props);
    this.isMounted = true;
    this.state = { route: '' };
  }

  componentDidMount() {
    this.handleRouteChange();
    Router.events.on('routeChangeComplete', this.handleRouteChange.bind(this));
  }

  componentWillUnmount() {
    this.isMounted = false;
    Router.events.off('routeChangeComplete', this.handleRouteChange.bind(this));
  }

  handleRouteChange() {
    this.isMounted && this.setState({
      route: Router.route,
    });
  }

  render() {
    const { route: currentRoute } = this.state;
    const navs = [{
      url: '/',
      match: /^\/$|^\/tag\/.*$/,
      label: '首页',
    }, {
      url: '/profile',
      match: /^\/profile/,
      label: '关于我',
    }];
    return (
      <div className={style['header-box']}>
        <div className={style.header}>
          <div className={style['header-wrap']}>
            <strong>
              <Link
                href="/"
                label="WDNMD"
                className={style['header-title']}
              />
            </strong>
            <nav className={style['header-navs']}>
              {
                navs.map((route) => (
                  <Link
                    href={route.url}
                    label={route.label}
                    className={`${style['header-navs-item']} ${route.match.test(currentRoute) ? style['header-navs-item_active'] : ''}`}
                    key={route.url}
                  />
                ))
              }
            </nav>
          </div>
        </div>
      </div>
    );
  }
}
