import { defineUserConfig } from "vuepress";
const { docsearchPlugin } = require('@vuepress/plugin-docsearch')

import theme from "./theme";

export default defineUserConfig({
  base: "/",
  dest: "./dist",
  head: [
    [
      "link",
      {
        rel: "stylesheet",
        href: "//at.alicdn.com/t/font_1939991_g29apyyacbb.css",
      },
    ],
  ],
  locales: {
    "/": {
      lang: "zh-CN",
      title: `JQiue's notes`,
      description: "每一个想要学习的念头，都有可能是未来的你在向你求救",
    },
  },
  theme,
  plugins: [
    docsearchPlugin({
      appId: "GNXC82PSDS",
      apiKey: "db4a8c13f20ffa235c13fe7cddf32488",
      indexName: "jinqiu-wang",
    }),
  ],
});
