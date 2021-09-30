const computer_basic = [
  '',
  {
    title: '计算机组成原理',
    prefix: '/computer-basic/organization/',
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
    prefix: '/computer-basic/compile/',
    collapsable: false,
    children: [
      'basic',
      'grammars-and-automata',
    ]
  },
  {
    title: '计算机网络原理',
    prefix: '/computer-basic/network/',
    collapsable: false,
    children: [
      'basic',
      'http',
    ]
  }
];

const language = [
  '',
  {
    title: 'C',
    prefix: '/language/c/',
    collapsable: false,
    children: [
      'basic',
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
  },
  {
    title: 'Java',
    prefix: '/language/java/',
    collapsable: false,
    children: [
      'basic',
      'syntax',
      'oop',
      'interface',
    ]
  },
  {
    title: 'JavaScript',
    prefix: '/language/js/',
    collapsable: false,
    children: [
      'basic',
      'syntax',
      'function',
      'object',
      'array',
      'map-set',
      'destructuring-assignment',
      'rest-spread',
      'prototype',
      'class',
      'oop',
      'try-catch',
      'promise-async-await',
      'proxy-reflect',
      'module',
      'event-loop',
      'built-object',
      'regex',
      'code-quality',
    ]
  },
  {
    title: 'Python',
    prefix: '/language/python/',
    collapsable: false,
    children: [
      'basic',
      'syntax',
      'iterator',
      'oop',
      'built-in-function',
      'module',
      'comprehensions',
      'file',
      'exception',
      'special-function-usage',
      'regex',
      'spider',
    ]
  }
];

const ds_algorithm = [
  '',
  {
    title: '数据结构',
    prefix: '/ds-algorithm/ds/',
    collapsable: false,
    children: [
      'basic',
      'list',
      'stack',
      'queue',
      'array-string',
      'tree',
      'graph',
    ]
  }, 
  {
    title: '算法',
    prefix: '/ds-algorithm/algorithm/',
    collapsable: false,
    children: [
      'basic',
      'find',
      'sort',
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

const operating_system = [
  '',
  {
    title: 'Windows',
    prefix: '/operating-system/windows/',
    collapsable: false,
    children: [
      'basic',
      'shell',
    ]
  },
  {
    title: 'Linux',
    prefix: '/operating-system/linux/',
    collapsable: false,
    children: [
      'basic',
      'vim',
      'shell',
    ]
  },
];

const application = {
  web: [
    '',
    {
      title: 'HTML-CSS',
      prefix: 'html-css/',
      collapsable: false,
      children: [
        'basic',
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
    },
    {
      title: 'Canvas',
      prefix: 'canvas/',
      collapsable: false,
      children: ['basic']
    },
    {
      title: 'WebAPI',
      prefix: 'webapi/',
      collapsable: false,
      children: [
        'basic',
        'bom',
        'dom',
        'event',
        'network',
        'storage',
      ]
    },
    {
      title: 'Vue',
      prefix: 'vue/',
      collapsable: false,
      children: [
        'start',
        'directive',
        'compute-listener-filter',
        'component',
        'slot',
        'vuex',
        'vue-router',
        'transition',
        'special-attribute',
        'render',
        'mock',
      ]
    },
    {
      title: 'NodeJS',
      prefix: 'nodejs/',
      collapsable: false,
      children: [
        'basic',
        'api',
        'npm',
        'webpack',
      ]
    },
  ],
  backend: [
    '',
    'interface-design',
    'middleware',
    'persistence',
    'function',
    'deploy',
  ],
  desktop: [
    '',
  ],
  mobile: [
    '',
  ]
};

const subject = [
  '',
  {
    title: "英语",
    prefix: "english/",
    collapsable: false,
    children: [
      'basic',
      'parts-of-speech',
      'sentence',
      'tense-voice',
      'non-predicate-verbs',
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

const sundry = [
  'git',
  'tools',
  'problems',
  {
    title: '知识分享',
    prefix: 'share/',
    collapsable: false,
    children: [
      'three-filtering-principles',
      'trick',
      'cannikin-law',
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
    ]
  }
];

module.exports = {
  "/computer-basic/": computer_basic,
  "/language/": language,
  "/ds-algorithm/": ds_algorithm,
  "/database/": database,
  "/operating-system/": operating_system,
  "/application/web/": application.web,
  "/application/backend/": application.backend,
  "/application/desktop/": application.desktop,
  "/application/mobile/": application.mobile,
  "/subject/": subject,
  "/sundry/": sundry,
  "/about/": ['']
};
