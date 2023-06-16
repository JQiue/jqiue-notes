import { navbar } from 'vuepress-theme-hope';

export const zh = navbar([
  { text: '首页', icon: 'zhuye', link: '/' },
  {
    text: '技能',
    icon: 'jishuzhan',
    children: [
      { text: '计算机组成', icon: 'yuanli', link: '/composition/' },
      { text: '操作系统', icon: 'caozuoxitong', link: '/operating-system/' },
      { text: '计算机网络', icon: 'wangluo', link: '/network/' },
      { text: '编译原理', icon: 'bianyi', link: '/compiler/' },
      // { text: '设计模式', icon: 'shejimoshi', link: '/sundry/design-pattern/' },
      { text: '数据库', icon: 'SQL', link: '/database/' },
      { text: '数据结构与算法', icon: 'suanfa', link: '/ds-algorithm/' },
    ],
  },
  {
    text: '编程语言',
    icon: 'kaifayuyan',
    children: [
      { text: 'C', icon: 'c', link: '/c/' },
      { text: 'Java', icon: 'java', link: '/java/' },
      { text: 'JavaScript', icon: 'javascript', link: '/js/' },
      { text: 'TypeScript', icon: 'typescript', link: '/js/typescript/' },
      { text: 'Python', icon: 'python', link: '/python/' },
      { text: 'Rust', icon: 'rust', link: '/rust/' },
    ],
  },
  {
    text: 'Web',
    icon: 'liulanqi',
    children: [
      { text: 'HTML/CSS', icon: 'html', link: '/html-css/' },
      { text: 'WebAPI', icon: 'wangluo', link: '/webapi/' },
    ],
  },
  {
    text: '框架',
    icon: 'framework',
    prefix: '/framework',
    children: [
      { text: 'Vue', icon: 'vue', link: '/vue/' },
      { text: 'React', icon: 'react', link: '/react/' },
      { text: 'Express', icon: 'express', link: '/express/' },
      { text: 'Koa', icon: 'express', link: '/koa/' },
      { text: 'ReactNative', icon: 'react', link: '/reactnative/' },
      { text: 'Electron', icon: 'electron', link: '/electron/' },
      { text: 'Tauri', icon: 'electron', link: '/tauri/' },
    ],
  },
  {
    text: '基础学科',
    prefix: '/subject',
    icon: 'kemu',
    children: [
      { text: '英语', icon: 'yingyu', link: '/english/' },
      { text: '数学', icon: 'math', link: '/math/' },
      { text: '物理', icon: 'physics', link: '/physics/' },
      { text: '化学', icon: 'chemistry', link: '/chemistry/' },
      { text: '生物', icon: 'biology', link: '/biology/' },
      { text: '历史', icon: 'history', link: '/history/' },
      { text: '逻辑学', icon: 'logic', link: '/logic/' },
      {
        text: '经济和金融',
        icon: 'economics-finance',
        link: '/economics-finance/',
      },
    ],
  },
  {
    text: '杂七杂八',
    icon: 'baibaoxiang',
    link: '/sundry/',
  },
]);
