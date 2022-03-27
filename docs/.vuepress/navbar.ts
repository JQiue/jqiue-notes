import { defineNavbarConfig } from "vuepress-theme-hope";

export default defineNavbarConfig([
  { text: '首页', icon: 'zhuye', link: '/'},
  {
    text: '技能',
    icon: 'jishuzhan',
    children: [
      { text: '计算机原理', icon: 'yuanli', link: '/computer/' },
      { text: '数据结构与算法', icon: 'suanfa', link: '/ds-algorithm/' },
      { text: '设计模式', icon: 'shejimoshi', link: '/sundry/design-pattern/' },
      { text: '数据库', icon: 'SQL', link: '/database/' },
      { text: 'Linux', icon: 'linux', link: '/sundry/linux' },
      { text: '基础学科', icon: 'kemu', link: '/subject/' },
    ]
  },
  {
    text: '编程语言',
    icon: 'kaifayuyan',
    children: [
      { text: 'C', icon: 'c', link: '/c/' },
      { text: 'Java', icon: 'java', link: '/java/' },
      { text: 'JavaScript', icon: 'javascript', link: '/js/' },
      { text: 'Python', icon: 'python', link: '/python/' }
    ]
  },
  {
    text: 'Web',
    icon: 'liulanqi',
    children: [
      { text: 'HTML/CSS', icon: 'html', link: '/html-css/'},
      { text: 'WebAPI', icon: 'wangluo', link: '/webapi/'},
      { text: 'Canvas', icon: 'canvas', link: '/canvas/'},
      { text: 'WebAssembly', icon: 'wasm', link: '/wasm/'},
    ]
  },
  {
    text: '框架',
    icon: 'framework',
    children: [
      { text: 'Vue', icon: 'vue', link: '/vue/' },
      { text: 'React', icon: 'react', link: '/react/' },
      { text: 'Express', icon: 'express', link: '/express/' },
      { text: 'Spring', icon: 'spring', link: '/spring/' },
    ]
  },
  {
    text: '杂七杂八',
    icon: 'baibaoxiang',
    link: '/sundry/'
  }
]);
