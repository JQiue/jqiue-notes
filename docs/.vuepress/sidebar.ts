import { defineSidebarConfig } from "vuepress-theme-hope";

const computer: string[] = [
  "",
  "composition",
  "operating-system",
  "compile",
  "network",
];

const c: string[] = [
  "",
  "syntax",
  "function",
  "array",
  "pointer",
  "struct-union",
  "preprocessing",
  "storage",
  "malloc",
  "standard",
  "input-memory-buffer",
];

const java: string[] = [
  "",
  "syntax",
  "string",
  "method",
  "class",
  "interface",
  "collection",
  "exception",
  "standard",
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
  "canvas",
  "worker",
  "WebRTC",
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
];

const subject: string[] = [
  "",
  "primary-english",
  "advanced-english",
  "primary-math",
  "advanced-math",
  "physics",
  "logic",
  "nce",
];

const sundry: string[] = [
  "",
  "tools",
  "problems",
  "trick",
  "three-filtering-principles",
  "zhihu",
  "office",
  "git",
  "adb",
  "http",
  "latex",
  "emmet",
  "learntolearn",
  "nodejs",
  "server",
  "frontend-tools",
  "regex",
  "interview",
  "jquery",
  "typescript",
  "openssl",
  "sport",
  "windows",
  "linux",
  "cicd",
  "security",
  "bootstrap",
  "css-trick",
  "software-design",
  "cloud-computing",
  "teamwork",
  "software-system-design",
];

const vue: string[] = ["", "component", "vuex", "router", "transition"];

const react: string[] = [""];

const express_koa: string[] = ["", "koa"];

const spring: string[] = [""];

export default defineSidebarConfig({
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
  "/vue/": vue,
  "/react/": react,
  "/express-koa/": express_koa,
  "/spring/": spring,
  "/subject/": subject,
  "/sundry/": sundry,
});
