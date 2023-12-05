import { hopeTheme } from 'vuepress-theme-hope';
import * as navbar from './navbar';
import * as sidebar from './sidebar';
import { updatetime } from './updatetime';

export default hopeTheme({
  hostname: 'https://jqiue.github.io/',
  author: {
    name: 'JQiue',
    url: 'https://jqiue.github.io/',
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
        roundAvatar: true,
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
      copyright: 'Copyright © 2019-present JQiue | Last push: ' + updatetime,
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
      serverURL: 'https://waline.jinqiu.wang/',
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
    pwa: {
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
    },
  },
});
