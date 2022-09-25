import { navbar } from "vuepress-theme-hope";

export const zh = navbar([
  { text: "首页", icon: "zhuye", link: "/" },
  {
    text: "技能",
    icon: "jishuzhan",
    children: [
      { text: "计算机原理", icon: "yuanli", link: "/computer/" },
      { text: "数据结构与算法", icon: "suanfa", link: "/ds-algorithm/" },
      // { text: '设计模式', icon: 'shejimoshi', link: '/sundry/design-pattern/' },
      { text: "数据库", icon: "SQL", link: "/database/" },
      // { text: 'Linux', icon: 'linux', link: '/sundry/linux' },
    ],
  },
  {
    text: "编程语言",
    icon: "kaifayuyan",
    children: [
      { text: "C", icon: "c", link: "/c/" },
      { text: "Java", icon: "java", link: "/java/" },
      { text: "JavaScript", icon: "javascript", link: "/js/" },
      { text: "Python", icon: "python", link: "/python/" },
    ],
  },
  {
    text: "Web",
    icon: "liulanqi",
    children: [
      { text: "HTML/CSS", icon: "html", link: "/html-css/" },
      { text: "WebAPI", icon: "wangluo", link: "/webapi/" },
      // { text: 'Canvas', icon: 'canvas', link: '/canvas/'},
      // { text: 'WebAssembly', icon: 'wasm', link: '/wasm/'},
    ],
  },
  {
    text: "框架",
    icon: "framework",
    children: [
      { text: "Vue", icon: "vue", link: "/vue/" },
      { text: "React", icon: "react", link: "/react/" },
      { text: "Express/Koa", icon: "express", link: "/express-koa/" },
      { text: "Spring", icon: "spring", link: "/spring/" },
    ],
  },
  {
    text: "基础学科",
    prefix: "/subject",
    icon: "kemu",
    children: [
      { text: "英语", icon: "yingyu", link: "/english/" },
      { text: "数学", icon: "math", link: "/math/" },
      { text: "物理", icon: "physics", link: "/physics/" },
      { text: "化学", icon: "chemistry", link: "/chemistry/" },
      { text: "生物", icon: "biology", link: "/biology/" },
      { text: "历史", icon: "history", link: "/history/" },
      { text: "地理", icon: "geography", link: "/geography/" },
      { text: "逻辑学", icon: "logic", link: "/logic/" },
      { text: "经济和金融", icon: "economics-finance", link: "/economics-finance/" },
    ],
  },
  {
    text: "杂七杂八",
    icon: "baibaoxiang",
    link: "/sundry/",
  },
]);
