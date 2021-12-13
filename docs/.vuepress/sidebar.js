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
  'rest-spread',
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
  'class',
  'module',
  'comprehensions',
  'exception',
  'special-function-usage',
  'standard',
  'spider',
];

const ds_algorithm = [
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

const backend = [
  ''
]

const desktop = [
  ''
]
const mobile = [
  ''
]

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
    'css-preprocessor',
    'csslint',
  ]
}];

const vue = [
  '',
  'component',
  'vuex',
  'vue-router',
]

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
  "/wasm/": wasm,
  "/vue/": vue,
  "/nodejs/": nodejs,
  "/backend/": backend,
  "/desktop/": desktop,
  "/mobile/": mobile,
  "/subject/": subject,
  "/sundry/": sundry,
  "/about/": ['']
};