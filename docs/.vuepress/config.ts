import { defineUserConfig } from 'vuepress';
import { viteBundler } from '@vuepress/bundler-vite';
import { pwaPlugin } from 'vuepress-plugin-pwa2';
import theme from './theme.ts';
import { MeiliSearchPlugin } from './vuepress-plugin-meilisearch/index.ts';

const app = defineUserConfig({
  bundler: viteBundler(),
  theme,
  base: '/',
  dest: './dist',
  head: [],
  locales: {
    '/': {
      lang: 'zh-CN',
      title: `JQiue's notes`,
      description: '每一个想要学习的念头，都有可能是未来的你在向你求救',
    },
  },
  plugins: [
    MeiliSearchPlugin({
      host: 'https://search.jinqiu.wang',
      apiKey:
        'adaf72e2a6d6f428ec465bc786ec41de868bbd5f1997e89ba2299e9566c88213',
      index: 'jinqiu-wang',
    }),
    pwaPlugin({
      favicon: '/favicon.ico',
      themeColor: '#5c92d1',
      cacheHTML: true,
      cachePic: true,
      maxSize: 40000,
      maxPicSize: 5000,
      apple: {
        icon: '/assets/icon/appleIcon152.png',
        statusBarColor: 'black',
      },
      msTile: {
        image: '/assets/icon/msIcon144.png',
        color: '#ffffff',
      },
      manifest: {
        id: '/',
        scope: '/',
        start_url: '/',
      },
    }),
  ],
  shouldPrefetch: false,
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
