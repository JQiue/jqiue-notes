const { config } = require("vuepress-theme-hope");

module.exports = config({
  title: "JQiue's notes",
  description: "每一个想要学习的念头，都有可能是未来的你在向你求救",
  locales: {
    "/": { lang: "zh-CN" }
  },
  head: [
    ['link', { rel: 'stylesheet', href: 'https://cdn.bootcdn.net/ajax/libs/animate.css/4.1.1/animate.min.css', async: ''}],
    ['script', { src: 'https://cdn.bootcdn.net/ajax/libs/vue/2.6.14/vue.min.js', async: '' }],
    ['script', { src: 'https://cdn.bootcdn.net/ajax/libs/vuex/3.6.2/vuex.min.js', async: ''}],
    ['script', { src: 'https://cdn.bootcdn.net/ajax/libs/Mock.js/1.0.0/mock-min.js', async: ''}],
  ],
  plugins: [
    '@vuepress/nprogress'
  ],
  themeConfig: {
    logo: "/logo.png",
    hostname: "https://jinqiu.wang",
    repo: "https://github.com/JQiue/jqiue_notes",
    repoLabel: "Github",
    repoDisplay: false,
    docsDir: "docs",
    docsBranch: 'master',
    nav: require("./navbar"),
    sidebar: require("./sidebar"),
    encrypt: {
      config: {
        "/theory/network/": "123456",
        "/theory/organization/": "123456",
        "/backend/": "123456",
        "/nodejs/": "123456",
        "/canvas/": "123456",
        "/desktop/": "123456",
        "/ds-algorithm/": "123456",
        "/subject/": "123456",
        "/vue/": "123456",
      }
    },
    blog: {
      name: "JQiue",
      avatar: "/avatar.png",
      intro: "/about/index.html",
      sidebarDisplay: "mobile",
      links: {
        QQ: "http://wpa.qq.com/msgrd?v=3&uin=861947542&site=qq&menu=yes",
        Email: "mailto:jqiue@foxmail.com",
        Zhihu: "https://www.zhihu.com/people/JQiue",
        Github: "https://github.com/JQiue",
      }
    },
    themeColor: {
      red: "#ee3f4d",  // 茶花红
      blue: "#10aec2",  // 甸子蓝
      green: "#12aa9c",  // 美蝶绿
      orange: "#feba07"  // 琥珀黄
    },
    mdEnhance: {
      lineNumbers: true,
      tex: true,
      demo: true,
      align: true,
      sup: true,
      sub: true,
      tasklist: true,
    },
    comment: {
      type: "valine",
      appId: "gMiT8uL1OilW1RPmreh23QNJ-MdYXbMMI",
      appKey: "Co0JBAOd7vwoz9UONi5BLjTg"
    },
    footer: {
      copyright: "© 2019-present JQiue",
      display: true
    },
    pwa: {
      favicon: "/favicon.ico",
      themeColor: "#5c92d1",
      manifest: '/manifest.json',
      appleStatusBarColor: "black",
      appleIcon: "/assets/icon/appleIcon152.png",
      msTileImage: "/assets/icon/msIcon144.png",
      msTileColor: "#ffffff",
      cachePic: true,
      maxSize: 10240,
      maxPicSize: 5000,
    },
    feed: false,
  }
});
