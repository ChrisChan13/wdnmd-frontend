import React from 'react';
import { AppContext } from 'next/app';
import getConfig from 'next/config';
import Head from 'next/head';
import echarts from 'echarts';

import '../../utils/json2html/index.css';
import { getProfile, getHeatmap } from '../../apis';
import style from './index.less';
import json2html from '../../utils/json2html';

type Props = {
  profile: {},
  heatmap: [],
};

const { env: ENV } = getConfig().publicRuntimeConfig;

export default class Profile extends React.Component<Props> {
  profileTable: React.Ref<HTMLDivElement>;

  activinessChart: React.Ref<HTMLDivElement>;

  constructor(props: any) {
    super(props);
    this.profileTable = React.createRef<HTMLDivElement>();
    this.activinessChart = React.createRef<HTMLDivElement>();
  }

  static async getInitialProps(props: AppContext) {
    if (process.browser && ENV !== 'dev') return (window as any).__NEXT_DATA__.props.pageProps;
    const profile = await getProfile();
    const heatmap = await getHeatmap();
    return {
      profile,
      heatmap,
    };
  }

  componentDidMount() {
    const { profile = {}, heatmap = [] } = this.props;
    if (this.profileTable) {
      (this.profileTable as any).current.append(json2html(profile));
    }
    if (this.activinessChart) {
      const now = new Date();
      const ONE_YEAR = 365 * 24 * 60 * 60 * 1000;
      const last = new Date(now.getTime() - ONE_YEAR);
      const options = {
        tooltip: {
          formatter(params: any) {
            const [date, counts] = params.data;
            const [year, month, day] = date.split('-');
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
          },
        },
        visualMap: {
          pieces: [
            { gte: 0.1, lt: 1.25, color: '#9be9a8' },
            { gte: 1.25, lt: 2.5, color: '#40c463' },
            { gte: 2.5, lt: 5, color: '#30a14e' },
            { gte: 5, color: '#216e39' },
          ],
          hoverLink: false,
          itemWidth: 13,
          itemHeight: 13,
          text: ['More', 'Less'],
          type: 'piecewise',
          orient: 'horizontal',
          left: 30,
          top: 30,
          textStyle: {
            color: '#000',
          },
        },
        calendar: {
          top: 90,
          left: 30,
          right: 30,
          cellSize: 13,
          range: [
            `${last.getFullYear()}-${last.getMonth() + 1}-${last.getDate()}`,
            `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`,
          ],
          itemStyle: {
            normal: { borderWidth: 0.5 },
          },
          yearLabel: { show: false },
        },
        series: {
          type: 'heatmap',
          coordinateSystem: 'calendar',
          data: heatmap.map((item: any) => ([item.date, item.heat])),
        },
      };
      const chart = echarts.init((this.activinessChart as any).current);
      chart.clear();
      chart.setOption(options);
    }
  }

  render() {
    return (
      <div className={style.container}>
        <Head>
          <title>关于我 - WDNMD - ChrisChan</title>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=EB Garamond" />
        </Head>
        <h2>我的更新</h2>
        <div ref={this.activinessChart} className={style.activiness} />
        <h2>我的资料</h2>
        <div ref={this.profileTable} className={style.profile} />
      </div>
    );
  }
}
