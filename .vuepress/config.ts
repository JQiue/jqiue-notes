import { defineUserConfig, Theme } from 'vuepress';
import { viteBundler } from '@vuepress/bundler-vite';
import { baiduAnalyticsPlugin } from '@vuepress/plugin-baidu-analytics';
import { googleAnalyticsPlugin } from '@vuepress/plugin-google-analytics';
import { removePwaPlugin } from '@vuepress/plugin-remove-pwa';
import theme from './theme.js';

const app = defineUserConfig({
  theme,
  bundler: viteBundler(),
  dest: './dist',
  head: [
    // [
    //   'script',
    //   {
    //     deref: true,
    //     src:
    //       process.env.WALINE_ENV == 'production'
    //         ? 'https://track.jinqiu.wang/js/tracker.js'
    //         : 'http://localhost:3000/js/tracker.js',
    //     'data-website-id': '1',
    //     'data-server-url':
    //       process.env.WALINE_ENV == 'production'
    //         ? 'https://track.jinqiu.wang'
    //         : 'http://localhost:3000',
    //   },
    // ],
    // [
    //   'script',
    //   {
    //     src: 'http://localhost:7410/static/yoin.js',
    //   },
    // ],
  ],
  locales: {
    '/': {
      lang: 'zh-CN',
      title: `JQiue's notes`,
      description: '每一个想要学习的念头，都有可能是未来的你在向你求救',
    },
  },
  shouldPrefetch: false,
  plugins: [
    baiduAnalyticsPlugin({
      id: 'b3d18d472fc282c84cd39f184f015bd3',
    }),
    googleAnalyticsPlugin({
      id: 'G-8M8EYLV2TK',
    }),
    removePwaPlugin({
      swLocation: 'service-worker.js',
    }),
  ],
});

app.onWatched = (app) => {
  let m = 0,
    w = 0;
  for (let i = 0; i < app.pages.length; i++) {
    const { minutes, words } = app.pages[i].data.readingTime;
    m += minutes;
    w += words;
  }
  console.log(m, w);
};

export default app;
