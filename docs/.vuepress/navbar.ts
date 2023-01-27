import { navbar } from 'vuepress-theme-hope';

export const zh = navbar([
  { text: '首页', icon: 'zhuye', link: '/' },
  {
    text: '技能',
    icon: 'jishuzhan',
    children: [
      { text: '计算机原理', icon: 'yuanli', link: '/computer/' },
      { text: '数据结构与算法', icon: 'suanfa', link: '/ds-algorithm/' },
      // { text: '设计模式', icon: 'shejimoshi', link: '/sundry/design-pattern/' },
      { text: '数据库', icon: 'SQL', link: '/database/' },
      // { text: 'Linux', icon: 'linux', link: '/sundry/linux' },
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
      { text: 'ReactNative', icon: 'react', link: '/react-native/' },
      { text: 'Electron', icon: 'electron', link: '/electron/' },
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
      { text: '地理', icon: 'geography', link: '/geography/' },
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
    prefix: '/sundry',
    icon: 'baibaoxiang',
    children: [
      { text: '资源和工具', link: '/tools/' },
      { text: '问题汇总', link: '/problems/' },
      { text: '其他技能', link: '/skill/' },
      { text: 'Git 指南', link: '/git/' },
      { text: 'Android 调试桥（adb）的用法', link: '/adb/' },
      { text: '通向万维网的协议 - HTTP', link: '/http/' },
      { text: '使用 LaTeX 写作', link: '/latex/' },
      { text: '学习学习', link: '/learntolearn/' },
      { text: 'Node.js', link: '/node/' },
      { text: '很棒的 NPM 第三方包', link: '/awesome-npm/' },
      { text: '服务端软件', link: '/server/' },
      { text: '关于 Web 前端的一切', link: '/frontend/' },
      { text: '正则表达式', link: '/regex/' },
      { text: '面试经历', link: '/interview/' },
      { text: '使用 openssl 生成证书', link: '/openssl/' },
      { text: '游戏的基础：运动', link: '/game-sport/' },
      { text: 'windows', link: '/windows/' },
      { text: 'Linux', link: '/linux/' },
      { text: 'CI/CD', link: '/cicd/' },
      { text: '开发中的一些安全防范', link: '/security/' },
      { text: '软件设计', link: '/software-design/' },
      { text: 'UI 设计', link: '/ui/' },
      { text: '网络抓包', link: '/packet-capture/' },
    ],
  },
]);
