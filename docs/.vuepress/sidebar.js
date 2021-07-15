const computer_basic = module.exports = [
  '',
  {
    title: '计算机组成',
    prefix: '/computer-basic/organization/',
    collapsable: false,
    children: [
      'basic',
      'instruction',
    ]
  },
  // {
  //   title: '操作系统',
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
      'regular-grammars-and-finite-automata',
    ]
  },
  // {
  //   title: '计算机网络',
  //   prefix: '/computer-basic/network/',
  //   collapsable: false,
  //   children: [
  //     'basic', 
  //   ]
  // }
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
      'javaweb', 
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
      'ds',
      'array', 
      'linklist',
      'stack',
      'queue',
    ]
  }, 
  {
    title: '算法',
    prefix: '/ds-algorithm/algorithm/',
    collapsable: false,
    children: [
      'basic',
      'search',
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
    ]
  }
];

const application = {
  web: [
    '',
    {
      title: 'HTML-CSS',
      prefix: 'html-css/',
      collapsable: false,
      children: [
        'html-basic', 
        'html-element', 
        'css-basic', 
        'box-model', 
        'selectors', 
        'css-syntax', 
        'css-layout', 
        'value', 
        'reset-css-style', 
        'responsive-design', 
        'better-code', 
        'emmet',
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
      'set',
      'sufficient-and-necessary-condition',
      'inequality',
      'function',
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
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
    ]
  }
];

module.exports = {
  "/computer-basic/": computer_basic,
  "/language/": language,
  "/ds-algorithm/": ds_algorithm,
  "/database/": database,
  "/application/web/": application.web,
  "/application/backend/": application.backend,
  "/application/desktop/": application.desktop,
  "/application/mobile/": application.mobile,
  "/subject/": subject,
  "/sundry/": sundry,
  "/about/": ['']
};
