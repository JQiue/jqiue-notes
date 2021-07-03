module.exports = {
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
        'ajax',
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