const { config } = require("vuepress-theme-hope");

module.exports = config({
  title: "JQiue's notes",
  description: "每一个想要学习的念头，都有可能是未来的你在向你求救",
  locales: {
    "/": {
      lang: "zh-CN"
    }
  },
  head: [
    ['link', { rel: 'stylesheet', href: '/animate.min.css' }],
    ['script', { src: '/vue.min.js' }],
    ['script', { src: '/vuex.min.js' }],
    ['script', { src: '/mock-min.js' }],
  ],
  themeConfig: {
    logo: "/logo.png",
    hostname: "https://wjqis.me",
    repo: "https://github.com/JQiue/jqiue_notes",
    repoLabel: "Github",
    repoDisplay: false,
    docsDir: "docs",
    docsBranch: 'master',
    nav: require("./config/nav"),
    sidebar: require("./config/sideBar"),
    blog: {
      name: "JQiue",
      avatar: "/avatar.png",
      intro: "/about/me.html",
      sidebarDisplay: "mobile",
      links: {
        QQ: "http://wpa.qq.com/msgrd?v=3&uin=861947542&site=qq&menu=yes",
        Wechat: "https://mp.weixin.qq.com/s/MiOS60rgwWDOdb_-KKs7kw",
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
      sub: true
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
      cachePic: true
    }
  }
});
