import { sidebar } from 'vuepress-theme-hope';

export const zh = sidebar({
  '/': ['about'],
  '/composition/': 'structure',
  '/operating-system/': ['', 'windows', 'linux'],
  '/compiler/': 'structure',
  '/network/': 'structure',
  '/ds-algorithm/': 'structure',
  '/database/': ['', 'sql', 'nosql'],
  '/ai/': 'structure',
  '/c/': 'structure',
  '/java/': 'structure',
  '/js/': [
    '',
    'syntax',
    'function',
    'object',
    'data-structure',
    'destructuring-assignment',
    'prototype',
    'class',
    'error',
    'promise-async-await',
    'proxy-reflect',
    'module',
    'event-loop',
    'standard',
  ],
  '/python/': [
    '',
    'syntax',
    'ds',
    'function',
    'class',
    'module',
    'comprehensions',
    'error',
    'multitasking',
    'standard',
    'practice',
  ],
  '/rust/': 'structure',
  '/html-css/': [
    '',
    'elements',
    'selectors',
    'box-model',
    'css',
    'layout',
    'value',
    'responsive-design',
    'libraries',
    'practice',
  ],
  '/webapi/': [
    '',
    'browser',
    'dom',
    'event',
    'network',
    'storage',
    'drag',
    'binary',
    'canvas',
    'worker',
    'webrtc',
    'wasm',
    'browser_extends',
  ],
  '/framework/': [
    'vue',
    'react',
    'express',
    'koa',
    'reactnative',
    'electron',
    'tauri',
  ],
  '/subject/': [
    'english',
    'nce',
    'math',
    'physics',
    'chemistry',
    'biology',
    'history',
    'logic',
    'economics-finance',
    'interdisciplinarity',
  ],
  '/sundry/': 'structure',
});
