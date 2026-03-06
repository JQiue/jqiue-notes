import { hopeTheme } from 'vuepress-theme-hope';
import { meilisearchPlugin } from '@vuepress/plugin-meilisearch';
import * as navbar from './navbar.ts';
import * as sidebar from './sidebar.ts';
import { updatetime } from './updatetime.ts';

const theme = hopeTheme({
  hostname: 'https://jinqiu.wang/',
  author: {
    name: 'JQiue',
    url: 'https://jinqiu.wang/',
  },
  breadcrumb: false,
  logo: '/logo.png',
  repo: 'https://github.com/JQiue/jqiue-notes',
  docsRepo: 'https://github.com/JQiue/jqiue-notes',
  docsDir: 'docs',
  docsBranch: 'master',
  locales: {
    '/': {
      navbar: navbar.zh,
      sidebar: sidebar.zh,
      blog: {
        intro: 'about.html',
        avatar: '/avatar.png',
        medias: {
          QQ: 'http://wpa.qq.com/msgrd?v=3&uin=861947542&site=qq&menu=yes',
          Email: 'mailto:jqiue@foxmail.com',
          Zhihu: 'https://www.zhihu.com/people/JQiue',
          Github: 'https://github.com/JQiue',
        },
      },
      metaLocales: {
        editLink: '在 GitHub 上编辑此页',
      },
      displayFooter: true,
      copyright: 'Copyright © 2019-present JQiue | Latest push: ' + updatetime,
      footer:
        '<a href="https://beian.miit.gov.cn/" target="_blank">备案号：鄂ICP备2021016538号</a>',
    },
  },
  encrypt: {
    config: {
      '/subject/': '123456',
      '/sundry/interview': '123456',
      '/sundry/escape-fold': '7410',
    },
  },
  markdown: {
    demo: true,
    align: true,
    sup: true,
    sub: true,
    tasklist: true,
    codeTabs: true,
    math: true,
    echarts: true,
    tabs: true,
    highlighter: {
      type: 'shiki',
      langs: [
        'js',
        'properties',
        'jsx',
        'groovy',
        'sh',
        'html',
        'vue',
        'sql',
        'c',
        'rust',
        'json',
        'ts',
        'xml',
        'toml',
        'css',
        'prisma',
        'yaml',
        'tex',
        'python',
        'kotlin',
        'scss',
        'dockerfile',
      ],
      themes: {
        light: 'one-light',
        dark: 'one-dark-pro',
      },
    },
  },
  plugins: {
    blog: true,
    icon: {
      assets: '//at.alicdn.com/t/c/font_1939991_k8fgokhl9ol.css',
      prefix: 'iconfont icon-',
    },
    comment: {
      provider: 'Waline',
      serverURL:
        process.env.WALINE_ENV == 'production'
          ? 'https://waline.jinqiu.wang'
          : 'http://127.0.0.1:8360',
      reaction: true,
    },
    meilisearch: {
      host: 'https://search.jinqiu.wang',
      apiKey:
        '404f43198e3f308584c311410a93dc79cc27e0d70137a2c1833d5f3546839881',
      indexUid: 'jinqiu-wang',
    },
    // meilisearch: {
    //   host: 'http://search.is.me',
    //   apiKey:
    //     '90992298223e9ed4848ce10ad0648e78c00c1df95ec43e1c5ed48bdd5b8097b3',
    //   indexUid: 'docs',
    // },
    // pwa: {
    //   favicon: '/favicon.ico',
    //   themeColor: '#5c92d1',
    //   cacheHTML: true,
    //   cacheImage: true,
    //   update: 'hint',
    //   apple: {
    //     icon: '/assets/icon/appleIcon152.png',
    //   },
    //   manifest: {
    //     id: 'jn',
    //     scope: '/',
    //     start_url: '/',
    //   },
    // },
  },
});

export default theme;
