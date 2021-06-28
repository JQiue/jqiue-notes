module.exports = [
  { text: '首页', icon: 'zhuye', link: '/' },
  {
    text: '技能',
    icon: 'jishuzhan',
    items: [
      { text: '计算机基础', icon: 'jisuanji', link: '/computer-basic/' },
      { text: '数据结构与算法', icon: 'suanfa', link: '/ds-algorithm/' },
      { text: '编程语言', icon: 'kaifayuyan', link: '/language/' },
      { text: '数据库', icon: 'SQL', link: '/database/' }
    ]
  },
  {
    text: '应用开发',
    icon: 'youtian',
    prefix: '/application/',
    items: [
      { text: 'Web', icon: 'liulanqi', link: 'web/' },
      { text: '后端', icon: 'shujuchuli', link: 'backend/' },
      { text: '桌面端', icon: 'zuixing-86', link: 'desktop/' }
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
    items: [
      { text: 'Git', icon: 'git', link: '/sundry/git' },
      { text: '资源和工具', icon: 'gongju', link: '/sundry/tools' },
      { text: '问题汇总', icon: 'zhongzhengji', link: '/sundry/problems' },
      { text: '知识分享', icon: 'jiqiao', link: '/sundry/share/1' }
    ]
  }
];