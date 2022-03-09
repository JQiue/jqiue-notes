import {
  defineHopeConfig
} from 'vuepress-theme-hope'

import navbar from './navbar';
import sidebar from './sidebar';

export default defineHopeConfig({
  base: '/',
  dest: './dist',
  head: [
    ["link", { rel: "stylesheet", href: "//at.alicdn.com/t/font_1939991_g29apyyacbb.css" }]
  ],
  locales: {
    '/': {
      lang: 'zh-CN',
      title: `JQiue's notes`,
      description: "每一个想要学习的念头，都有可能是未来的你在向你求救",
    }
  },
  themeConfig: {
    hostname: "https://jinqiu.wang",
    author: {
      name: 'JQiue',
      url: 'https://jinqiu.wang'
    },
    breadcrumb: false,
    iconPrefix: "iconfont icon-",
    logo: "/logo.png",
    repo: "https://github.com/JQiue/jqiue-notes",
    docsRepo: 'https://github.com/JQiue/jqiue-notes',
    docsDir: "docs",
    docsBranch: "master",
    navbar,
    sidebar,
    displayFooter: true,
    metaLocales: {
      editLink: "在 GitHub 上编辑此页",
    },
    footer: '<a href="https://beian.miit.gov.cn/" target="_blank">备案号：鄂ICP备2021016538号</a>',
    blog: {
      intro: "about.html",
      avatar: "/avatar.png",
      medias: {
        QQ: "http://wpa.qq.com/msgrd?v=3&uin=861947542&site=qq&menu=yes",
        Email: "mailto:jqiue@foxmail.com",
        Zhihu: "https://www.zhihu.com/people/JQiue",
        Github: "https://github.com/JQiue",
      },
    },
    encrypt: {
      config: {
        "/database/": "123456",
        "/canvas/": "123456",
        "/math-english/": "123456",
        "/vue/": "123456",
        "/react/": "123456",
        "/design-pattern/": "123456",
        "/java/": "123456",
        "/spring/": "123456",
        "/express/": "123456",
        "/python/": "123456",
        "/wasm/": "123456",
      }
    },
    plugins: {
      search: {
        locales: {
          "/": { placeholder: '搜索' }
        },
        hotKeys: ['s'],
        maxSuggestions: 5,
        isSearchable: page => page.path != '/',
        getExtraFields: page => page.frontmatter.tags ?? []
      },
      blog: {
        autoExcerpt: true,
      },
      comment: {
        type: "waline",
        serverURL: "https://vuepress-theme-hope-comment.vercel.app",
      },
      mdEnhance: {
        tex: true,
        demo: true,
        align: true,
        sup: true,
        sub: true,
        tasklist: true,
        codegroup: true,
      },
      pwa: {
        favicon: "/favicon.ico",
        themeColor: "#5c92d1",
        cachePic: true,
        maxSize: 10240,
        maxPicSize: 5000,
        apple: {
          icon: "/assets/icon/appleIcon152.png",
          statusBarColor: "black",
        },
        msTile: {
          image: "/assets/icon/msIcon144.png",
          color: "#ffffff",
        },
        manifest: {
        },
      },
      feed: false
    }
  },
  plugins: []
})