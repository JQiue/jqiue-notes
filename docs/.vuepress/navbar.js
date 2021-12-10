module.exports = [
  { text: '首页', icon: 'zhuye', link: '/' },
  {
    text: '技能',
    icon: 'jishuzhan',
    items: [
      { text: '计算机原理', icon: 'yuanli', link: '/theory/' },
      { text: '数据结构与算法', icon: 'suanfa', link: '/ds-algorithm/' },
      { text: '数据库', icon: 'SQL', link: '/database/' },
      { text: '操作系统', icon: 'caozuoxitong', link: '/os/' },
      { text: 'Node.js', icon: 'Nodejs', link: '/nodejs/' },
    ]
  },
  {
    text: '编程语言',
    icon: 'kaifayuyan',
    items: [
      { text: 'C', icon: 'c', link: '/c/' },
      { text: 'Java', icon: 'java', link: '/java/' },
      { text: 'JavaScript', icon: 'javascript', link: '/js/' },
      { text: 'Python', icon: 'python', link: '/python/' }
    ]
  },
  {
    text: '应用开发',
    icon: 'youtian',
    items: [
      { text: '后端', icon: 'shujuchuli', link: '/backend/' },
      { text: '移动', icon: 'shoujiyingyong', link: '/mobile/' },
      { text: '桌面', icon: 'zuixing-86', link: '/desktop/' }
    ]
  },
  {
    text: 'web',
    icon: 'liulanqi',
    items: [
      { text: 'HTML/CSS', icon: 'html', link: '/html-css/'},
      { text: 'WebAPI', icon: 'wangluo', link: '/webapi/'},
      { text: 'Canvas', icon: 'canvas', link: '/canvas/'},
      { text: 'WebAssembly', icon: 'wasm', link: '/wasm/'},
    ]
  },
  {
    text: '框架',
    icon: 'framework',
    items: [
      { text: 'Vue.js', icon: 'vue', link: '/vue/' },
    ]
  },
  {
    text: '学科',
    icon: 'kemu',
    link: '/subject/',
  },
  {
    text: '杂七杂八',
    icon: 'baibaoxiang',
    link: '/sundry/'
  }
];