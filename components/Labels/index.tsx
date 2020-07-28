import React from 'react';
import Router from 'next/router';

import style from './index.less';
import Link from '../Link';
import { getParentAndChild } from '../../utils';

type Props = {
  labels: [],
  parent?: string,
  child?: string,
};

type State = {
  parent: string | string[],
  child: string | string[],
};

export default class Labels extends React.Component<Props, State> {
  isMounted: boolean;

  constructor(props: any) {
    super(props);
    this.isMounted = true;
    this.state = { parent: '', child: '' };
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
    if (this.isMounted) {
      const { parent, child } = Router.query;
      this.setState({
        parent: parent || '',
        child: child || '',
      });
    }
  }

  render() {
    const { labels } = this.props;
    let { parent = '', child = '' } = this.state;
    const parentAndChild = getParentAndChild(labels, parent, child);
    parent = parentAndChild.parent || '';
    child = parentAndChild.child || '';
    const parents = labels.filter((item: any) => !item.parent);
    const parentlabel: any = labels.find((item: any) => item._id === parent) || {};
    let children = [];
    let childrenNodes = null;
    if (parent) {
      children = labels.filter((item: any) => item.parent === parent);
      childrenNodes = (
        <div className={style['labels-children']}>
          <Link
            key={parent.toString()}
            href={`/tag/${parentlabel.alias}`}
            label="全部"
            className={`${style['labels-children-item']} ${!child ? style['labels-children-item_active'] : ''}`}
          />
          {
            children.map((item: any) => (
              <Link
                key={item._id}
                href={`/tag/${parentlabel.alias}/${item.alias}`}
                label={item.label}
                className={`${style['labels-children-item']} ${child === item._id ? style['labels-children-item_active'] : ''}`}
              />
            ))
          }
        </div>
      );
    }
    return (
      <div>
        <div className={style['labels-box']}>
          <div className={style.labels}>
            <div className={style['labels-wrap']}>
              <Link
                key="0"
                href="/"
                label="推荐"
                className={`${style['labels-item']} ${!parent ? style['labels-item_active'] : ''}`}
              />
              {
                parents.map((item: any) => (
                  <Link
                    key={item._id}
                    href={`/tag/${item.alias}`}
                    label={item.label}
                    className={`${style['labels-item']} ${parent === item._id ? style['labels-item_active'] : ''}`}
                  />
                ))
              }
            </div>
          </div>
        </div>
        {childrenNodes}
      </div>
    );
  }
}
