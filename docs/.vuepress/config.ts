import { App, defineUserConfig } from 'vuepress';
import { MeiliSearchPlugin } from 'vuepress-plugin-meilisearch2';
import theme from './theme.js';

const app = defineUserConfig({
  theme,
  dest: './dist',
  head: [
    [
      'script',
      {
        src: 'http://localhost:3000/js/tracker.js',
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
    MeiliSearchPlugin({
      host: 'https://search.jinqiu.wang',
      apiKey:
        '64294e4e662062d21cdd1a3b7464ccdcf1477f5c9f3f0b8e9b521baf5a39a7ff',
      indexUid: 'jinqiu-wang',
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
