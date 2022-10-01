import { hopeTheme } from "vuepress-theme-hope";
import * as navbar from "./navbar";
import * as sidebar from "./sidebar";

export default hopeTheme({
  hostname: 'https://jinqiu.wang',
  author: {
    name: 'JQiue',
    url: 'https://jinqiu.wang',
  },
  breadcrumb: false,
  iconPrefix: 'iconfont icon-',
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
        roundAvatar: true,
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
      copyright: 'Copyright © 2019-present JQiue',
      footer:
        '<a href="https://beian.miit.gov.cn/" target="_blank">备案号：鄂ICP备2021016538号</a>',
    },
  },
  encrypt: {
    config: {
      '/canvas/': '123456',
      '/vue/': '123456',
      '/react/': '123456',
      '/java/': '123456',
      '/spring/': '123456',
      '/express/': '123456',
      '/python/': '123456',
      '/wasm/': '123456',
      '/computer/': '123456',
      '/sundry/interview': '123456',
    },
  },
  plugins: {
    blog: {
      autoExcerpt: true,
    },
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
    },
    pwa: {
      favicon: '/favicon.ico',
      themeColor: '#5c92d1',
      cacheHTML: true,
      cachePic: true,
      maxSize: 10240,
      maxPicSize: 5000,
      apple: {
        icon: '/assets/icon/appleIcon152.png',
        statusBarColor: 'black',
      },
      msTile: {
        image: '/assets/icon/msIcon144.png',
        color: '#ffffff',
      },
      manifest: {},
    },
    feed: false,
  },
});
