function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = []
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{_ as r}from"./app-ATmYwE-8.js";var a={provider:"Waline",dark:'html[data-theme="dark"]',serverURL:"https://waline.jinqiu.wang"};const n=async()=>{try{const{pageviewCount:e}=await r(()=>import("./app-ATmYwE-8.js").then(t=>t.P),__vite__mapDeps([]));return e({serverURL:a.serverURL})}catch{console.error("@waline/client is not installed!")}};export{n as updatePageview};
