import { hopeTheme } from 'vuepress-theme-hope';
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
  iconPrefix: 'iconfont icon-',
  iconAssets: '//at.alicdn.com/t/c/font_1939991_k8fgokhl9ol.css',
  logo: '/logo.png',
  repo: 'https://github.com/JQiue/jqiue-notes',
  docsRepo: 'https://github.com/JQiue/jqiue-notes',
  docsDir: 'docs',
  docsBranch: 'master',
  pageInfo: [
    'Author',
    'Original',
    'Date',
    'Category',
    'Tag',
    'ReadingTime',
    'PageView',
  ],
  locales: {
    '/': {
      navbar: navbar.zh,
      sidebar: sidebar.zh,
      blog: {
        intro: 'about.html',
        avatar: '/avatar.png',
        articleInfo: [
          'Author',
          'Original',
          'Date',
          'Category',
          'Tag',
          'ReadingTime',
          'PageView',
        ],
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
    },
  },
  plugins: {
    blog: {},
    comment: {
      provider: 'Waline',
      serverURL:
        process.env.NODE_ENV == 'production'
          ? 'https://waline.jinqiu.wang'
          : 'http://127.0.0.1:8360',
      reaction: true,
    },
    mdEnhance: {
      katex: true,
      demo: true,
      align: true,
      sup: true,
      sub: true,
      tasklist: true,
      codetabs: true,
      echarts: true,
      tabs: true,
    },
    shiki: {
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
      ],
      themes: {
        light: 'one-light',
        dark: 'one-dark-pro',
      },
    },
    pwa: {
      favicon: '/favicon.ico',
      themeColor: '#5c92d1',
      cacheHTML: true,
      maxSize: 40000,
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
    },
  },
});

export default theme;
