module.exports = {
  lang: 'zh-CN',
  title: "JQiue's notes",
  description: "每一个想要学习的念头，都有可能是未来的你在向你求救",
  locales: {
    "/": { lang: "zh-CN" }
  },
  plugins: [
    '@vuepress/nprogress'
  ],
  themeConfig: {
    logo: "/logo.png",
    navbar: [
      { text: '首页', link: '/' },
      { text: 'node', link: '/nodejs/' },
    ],
    // sidebar: require("./sidebar"),
  },
};
