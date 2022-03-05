import { defineSidebarConfig } from "vuepress-theme-hope";

const computer = [
  '',
  'composition',
  'instruction',
  'compile',
  'network',
  'tcp-ip',
  'http',
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
  'learnpath',
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
  "/design-pattern/": design_pattern,
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
