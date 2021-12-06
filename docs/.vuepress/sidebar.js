const theory = [
  '',
  {
    title: '计算机组成原理',
    prefix: 'organization/',
    collapsable: false,
    children: [
      'basic',
      'instruction',
    ]
  },
  // {
  //   title: '操作系统原理',
  //   prefix: '/computer-basic/os/',
  //   collapsable: false,
  //   children: [
  //     'basic',
  //   ]
  // },
  {
    title: '编译原理',
    prefix: 'compile/',
    collapsable: false,
    children: [
      'basic',
      'grammars-automata',
    ]
  },
  {
    title: '计算机网络原理',
    prefix: 'network/',
    collapsable: false,
    children: [
      'basic',
      'http',
      'tcp-ip',
    ]
  }
];

const c = [{
  title: 'C',
  collapsable: false,
  children: [
    '',
    'syntax',
    'array-string',
    'pointer',
    'struct-union',
    'preprocessing',
    'memory-allocation',
    'storage-classes',
    'file',
    'input-memory-buffer',
  ]
}];

const java = [{
  title: 'Java',
  collapsable: false,
  children: [
    '',
    'syntax',
    'string',
    'method',
    'class',
    'interface',
    'collection',
    'exception',
  ]
}];

const javascript = [{
  title: 'JavaScript',
  collapsable: false,
  children: [
    '',
    'syntax',
    'function',
    'object',
    'string',
    'array',
    'map-set',
    'destructuring-assignment',
    'rest-spread',
    'prototype',
    'class',
    'try-catch',
    'promise-async-await',
    'proxy-reflect',
    'module',
    'event-loop',
    'stdlib',
    'code-quality',
  ]
}];

const python = [{
  title: 'Python',
  collapsable: false,
  children: [
    '',
    'syntax',
    'ds',
    'class',
    'module',
    'comprehensions',
    'exception',
    'special-function-usage',
    'stdlib',
    'spider',
  ]
}];

const ds_algorithm = [
  {
    title: '数据结构与算法',
    collapsable: false,
    children: [
      '',
      'list',
      'stack',
      'queue',
      'array-string',
      'tree',
      'graph',
      'other',
      'find',
      'sort',
      'random',
      'core',
    ]
  }
];

const database = [
  '',
  {
    title: 'SQL',
    prefix: '/database/sql/',
    collapsable: false,
    children: [
      'sql-syntax',
      'mysql',
    ]
  },
  {
    title: 'NoSQL',
    prefix: '/database/nosql/',
    collapsable: false,
    children: [
      'mongodb',
      'redis',
    ]
  }
];

const os = [
  '',
  {
    title: 'Windows',
    prefix: 'windows/',
    collapsable: false,
    children: [
      '',
      'shell',
    ]
  },
  {
    title: 'Linux',
    prefix: 'linux/',
    collapsable: false,
    children: [
      '',
      'vim',
      'shell',
    ]
  },
];

const backend = [{
  title: '后端',
  collapsable: false,
  children: ['']
}]
const desktop = [{
  title: '桌面',
  collapsable: false,
  children: ['']
}];

const mobile = [{
  title: '移动',
  collapsable: false,
  children: ['']
}];

const nodejs = [{
  title: 'Node.js',
  collapsable: false,
  children: [
    '',
    'global',
    'api',
    'package-npm',
  ]
}];

const webapi = [{
  title: 'WebAPI',
  collapsable: false,
  children: [
    '',
    'bom',
    'dom',
    'event',
    'network',
    'storage',
    'drag',
  ]
}];

const canvas = [{
  title: 'Canvas',
  collapsable: false,
  children: ['']
}];

const htmlcss = [{
  title: 'HTML-CSS',
  collapsable: false,
  children: [
    '',
    'elements',
    'box-model',
    'selectors',
    'css',
    'layout',
    'value',
    'reset-css-style',
    'responsive-design',
    'better-code',
  ]
}];

const subject = [
  '',
  {
    title: "英语",
    prefix: "english/",
    collapsable: false,
    children: [
      'basic',
      'part-of-speech',
      'sentence',
      'tense-voice',
      'accumulation',
      'nce1',
      'nce2',
    ]
  },
  {
    title: "数学",
    prefix: "math/",
    collapsable: false,
    children: [
      'basic',
      'elementary',
      'higher',
    ]
  }
];

const sundry = [{
  title: '杂七杂八',
  collapsable: false,
  children: [
    'git',
    'tools',
    'problems',
    'three-filtering-principles',
    'trick',
    'zhihu',
    'excel',
    'internet-work',
    'adb',
    'design-pattern',
    'markdown',
    'latex',
    'tomcat',
    'emmet',
    'master',
    'all-master',
    'mock',
    'nginx',
    'webpack',
    'regex',
    'interview',
    'jquery',
    'eslint',
    'babel',
    'typescript',
    'programlang',
  ]
}];

const vue = [{
  title: 'Vue',
  collapsable: false,
  children: [
    '',
    'component',
    'vuex',
    'vue-router',
  ]
}]

module.exports = {
  "/theory/": theory,
  "/c/": c,
  "/java/": java,
  "/js/": javascript,
  "/python/": python,
  "/ds-algorithm/": ds_algorithm,
  "/database/": database,
  "/os/": os,
  "/html-css/": htmlcss,
  "/canvas/": canvas,
  "/webapi/": webapi,
  "/vue/": vue,
  "/nodejs/": nodejs,
  "/backend/": backend,
  "/desktop/": desktop,
  "/mobile/": mobile,
  "/subject/": subject,
  "/sundry/": sundry,
  "/about/": ['']
};