import { sidebar } from "vuepress-theme-hope";

const computer: string[] = [
  "",
  "composition",
  "operating-system",
  "compile",
  "network",
];

const c: string[] = [
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

const java: string[] = [
  "",
  "syntax",
  "class",
  "string",
  "ds",
  "interface",
  "generics",
  "error",
  "standard",
  "multithreading"
];

const javascript: string[] = [
  "",
  "syntax",
  "function",
  "object",
  "string",
  "data-structure",
  "destructuring-assignment",
  "prototype",
  "class",
  "error",
  "promise-async-await",
  "proxy-reflect",
  "module",
  "event-loop",
  "standard",
  "quality",
  "typescript",
];

const python: string[] = [
  "",
  "syntax",
  "ds",
  "function",
  "class",
  "module",
  "comprehensions",
  "exception",
  "standard",
  "spider",
];

const ds_algorithm: string[] = [
  "",
  "array",
  "linkedlist",
  "stack",
  "queue",
  "string",
  "tree",
  "graph",
  "other",
  "recursion",
  "find",
  "sort",
  "random",
  "think",
];

const database: string[] = ["", "sql-syntax", "mysql", "mongodb", "redis"];

const webapi: string[] = [
  "",
  "browser",
  "dom",
  "event",
  "network",
  "storage",
  "drag",
  "binary",
  "canvas",
  "worker",
  "webrtc",
  "wasm",
];

const html_css: string[] = [
  "",
  "elements",
  "box-model",
  "selectors",
  "css",
  "layout",
  "value",
  "reset-css-style",
  "responsive-design",
  "better-code",
  "trick",
];

const subject: string[] = [
  "",
  "english",
  "nce",
  "math",
  "physics",
  "chemistry",
  "biology",
  "history",
  "geography",
  "logic",
  "economics-finance",
];

const sundry: string[] = [
  "",
  "tools",
  "problems",
  "skill",
  "git",
  "adb",
  "http",
  "latex",
  "learntolearn",
  "node",
  "awesome-npm",
  "server",
  "frontend",
  "regex",
  "interview",
  "openssl",
  "game-sport",
  "windows",
  "linux",
  "cicd",
  "security",
  "software-design",
];

const framework:string[] = [
  "vue",
  "react",
  "express",
  "koa",
  "react-native",
];

export const zh = sidebar({
  "/about": [""],
  "/computer/": computer,
  "/c/": c,
  "/java/": java,
  "/js/": javascript,
  "/python/": python,
  "/ds-algorithm/": ds_algorithm,
  "/database/": database,
  "/html-css/": html_css,
  "/webapi/": webapi,
  "/framework/": framework,
  "/subject/": subject,
  "/sundry/": sundry,
});
