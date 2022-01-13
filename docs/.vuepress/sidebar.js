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

const c = [
  '',
  'syntax',
  'function',
  'array-string',
  'pointer',
  'struct-union',
  'preprocessing',
  'storage-classes',
  'standard',
  'input-memory-buffer',
];

const java = [
  '',
  'syntax',
  'string',
  'method',
  'class',
  'interface',
  'collection',
  'exception',
];

const javascript = [
  '',
  'syntax',
  'function',
  'object',
  'string',
  'array',
  'map-set',
  'destructuring-assignment',
  'prototype',
  'class',
  'try-catch',
  'promise-async-await',
  'proxy-reflect',
  'module',
  'event-loop',
  'standard',
  'code-quality',
];

const python = [
  '',
  'syntax',
  'ds',
  'function',
  'class',
  'module',
  'comprehensions',
  'exception',
  'standard',
  'spider',
];

const ds_algorithm = [
  '',
  'array',
  'linkedlist',
  'stack',
  'queue',
  'string',
  'tree',
  'graph',
  'other',
  'recursion',
  'find',
  'sort',
  'random',
  'core',
];

const design_pattern = [
  '',
  'creational',
  'structural',
  'behavioral'
]

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

const linux = [
  '',
  'vim',
  'shell',
];

const nodejs = [
  '',
  'global',
  'api',
  'package-npm',
];

const wasm = [
  '',
]

const webapi = [
  '',
  'bom',
  'dom',
  'event',
  'network',
  'storage',
  'drag',
  'worker',
];

const canvas = [
  ''
];

const htmlcss = [
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
];

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
      'nce3',
    ]
  },
  {
    title: "数学",
    prefix: "math/",
    collapsable: false,
    children: [
      'basic',
      'elementary',
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
    'adb',
    'latex',
    'tomcat',
    'emmet',
    'learntolearn',
    'mock',
    'nginx',
    'webpack',
    'regex',
    'interview',
    'jquery',
    'lint',
    'babel',
    'typescript',
    'programlang',
    'scaffolding',
    'openssl',
    'sport',
    'windows',
  ]
}];

const vue = [
  '',
  'component',
  'vuex',
  'vue-router',
  'transition',
]

const react = [
  '',
]

const express = [
  '',
]

const spring = [
  '',
]

module.exports = {
  "/theory/": theory,
  "/c/": c,
  "/java/": java,
  "/js/": javascript,
  "/python/": python,
  "/ds-algorithm/": ds_algorithm,
  "/design-pattern/":design_pattern,
  "/database/": database,
  "/linux/": linux,
  "/html-css/": htmlcss,
  "/canvas/": canvas,
  "/webapi/": webapi,
  "/wasm/": wasm,
  "/vue/": vue,
  "/react/": react,
  "/express/": express,
  "/spring/": spring,
  "/nodejs/": nodejs,
  "/subject/": subject,
  "/sundry/": sundry,
  "/about/": ['']
};