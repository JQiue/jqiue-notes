import { defineUserConfig } from 'vuepress';
import { meilisearchPlugin } from '@vuepress/plugin-meilisearch';
import theme from './theme.js';
import { viteBundler } from '@vuepress/bundler-vite';

const app = defineUserConfig({
  theme,
  bundler: viteBundler(),
  dest: './dist',
  head: [
    [
      'script',
      {
        deref: true,
        src:
          process.env.WALINE_ENV == 'production'
            ? 'https://track.jinqiu.wang/js/tracker.js'
            : 'http://localhost:3000/js/tracker.js',
        'data-website-id': '1',
        'data-server-url':
          process.env.WALINE_ENV == 'production'
            ? 'https://track.jinqiu.wang'
            : 'http://localhost:3000',
      },
    ],
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
    meilisearchPlugin({
      host: 'https://search.jinqiu.wang',
      apiKey:
        '64294e4e662062d21cdd1a3b7464ccdcf1477f5c9f3f0b8e9b521baf5a39a7ff',
      indexUid: 'jinqiu-wang',
    }),
  ],
});

app.onWatched = (app: any) => {
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
