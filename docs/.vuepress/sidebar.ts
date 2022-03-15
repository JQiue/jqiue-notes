import { defineSidebarConfig } from "vuepress-theme-hope";

const computer = [
  '',
  'composition',
  'operating-system',
  'compile',
  'network',
];

const c = [
  '',
  'syntax',
  'function',
  'array',
  'pointer',
  'struct-union',
  'preprocessing',
  'storage',
  'malloc',
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
  'standard',
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
  'quality',
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
  'think',
];

const database = [
  '',
  'sql-syntax',
  'mysql',
  'mongodb',
  'redis',
];

const wasm = [
  '',
]

const webapi = [
  '',
  'browser',
  'dom',
  'event',
  'network',
  'storage',
  'drag',
  'worker',
  'WebRTC',
];

const canvas = [
  ''
];

const html_css = [
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

const math_english = [
  '',
  'primary-english',
  'primary-math',
  'advanced-english',
  'advanced-math',
  'nce',
];

const sundry = [
  '',
  'git',
  'tools',
  'problems',
  'three-filtering-principles',
  'trick',
  'zhihu',
  'excel',
  'adb',
  'http',
  'latex',
  'tomcat',
  'emmet',
  'learntolearn',
  'nodejs',
  'mock',
  'nginx',
  'webpack',
  'regex',
  'interview',
  'jquery',
  'lint',
  'babel',
  'typescript',
  'scaffolding',
  'openssl',
  'sport',
  'windows',
  'linux',
  'cicd',
  'security',
  'bootstrap',
  'design-pattern',
  'css-trick',
];

const vue = [
  '',
  'component',
  'vuex',
  'router',
  'transition',
];

const react = [
  '',
];

const express = [
  '',
];

const spring = [
  '',
];

export default defineSidebarConfig({
  '/about': [''],
  "/computer/": computer,
  "/c/": c,
  "/java/": java,
  "/js/": javascript,
  "/python/": python,
  "/ds-algorithm/": ds_algorithm,
  "/database/": database,
  "/html-css/": html_css,
  "/canvas/": canvas,
  "/webapi/": webapi,
  "/wasm/": wasm,
  "/vue/": vue,
  "/react/": react,
  "/express/": express,
  "/spring/": spring,
  "/math-english/": math_english,
  "/sundry/": sundry,
});
