const theory = [
  '',
  // {
  //   title: '计算机组成原理',
  //   prefix: 'organization/',
  //   collapsable: false,
  //   children: [
  //     'basic',
  //     'instruction',
  //   ]
  // },
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
      'class',
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
  },
  {
    title: 'Python',
    prefix: '/language/python/',
    collapsable: false,
    children: [
      'basic',
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
      'other',
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
      'basic',
      'shell',
    ]
  },
  {
    title: 'Linux',
    prefix: 'linux/',
    collapsable: false,
    children: [
      'basic',
      'vim',
      'shell',
    ]
  },
];

const application = {
  backend: [
    {
      title: '后端',
      collapsable: false,
      children: [
        '',
        'interface-design',
        'middleware',
        'persistence',
        'function',
        'deploy',
      ]
    }
  ],
  desktop: [
    '',
  ],
  mobile: [
    '',
  ]
};

const nodejs = [
  '',
  'global',
  'api',
  'package-npm',
]

const web = [
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
      'drag',
    ]
  },
];

const framework = [
  '',
  {
    title: 'Vue',
    prefix: 'vue/',
    collapsable: false,
    children: [
      'basic',
      'component',
      'vuex',
      'vue-router',
    ]
  },
]

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

const sundry = [
  {
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
    ]
  }
];

module.exports = {
  "/theory/": theory,
  "/language/": language,
  "/ds-algorithm/": ds_algorithm,
  "/database/": database,
  "/os/": os,
  "/framework/": framework,
  "/nodejs/": nodejs,
  "/web/": web,
  "/application/backend/": application.backend,
  "/application/desktop/": application.desktop,
  "/application/mobile/": application.mobile,
  "/subject/": subject,
  "/sundry/": sundry,
  "/about/": ['']
};
