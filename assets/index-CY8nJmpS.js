import{i as a,_ as d,o as s,a as p,j as u,k as f}from"./app-CuY_ZDM5.js";import{_ as i}from"./plugin-vue_export-helper-DlAUqK2U.js";var l={host:"https://search.jinqiu.wang",apiKey:"64294e4e662062d21cdd1a3b7464ccdcf1477f5c9f3f0b8e9b521baf5a39a7ff",indexUid:"jinqiu-wang"},o=l;const h={__name:"DocSearch",setup(c,{expose:r}){r(),a(async()=>{const{__docsearch_meilisearch__:t}=await d(async()=>{const{__docsearch_meilisearch__:n}=await import("./search-BAJafRMK.js");return{__docsearch_meilisearch__:n}},[]),{docsearch:_}=t;_({container:"#docsearch",...o})});const e={onMounted:a,get pluginOptions(){return o}};return Object.defineProperty(e,"__isScriptSetup",{enumerable:!1,value:!0}),e}},m={id:"docsearch"};function x(c,r,e,t,_,n){return s(),p("div",m)}const v=i(h,[["render",x],["__file","DocSearch.vue"]]),S=u({__name:"index",setup(c,{expose:r}){r();const e={DocSearch:v};return Object.defineProperty(e,"__isScriptSetup",{enumerable:!1,value:!0}),e}});function $(c,r,e,t,_,n){return s(),f(t.DocSearch)}const g=i(S,[["render",$],["__file","index.vue"]]);export{g as default};
