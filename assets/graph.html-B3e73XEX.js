import{_ as t}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as o,a as r,o as p}from"./app-DVDv7FET.js";const a={};function i(c,e){return p(),o("div",null,e[0]||(e[0]=[r("<p>图是网络结构的抽象模型，学习图是重要的，因为任何二元关系都可以用图来表示。任何社交网络，例如 Facebook、Twitter 和 Google+，都可以用图来表示，还可以使用图来表示道路、航班以及通信</p><p>图是一组由边连接的节点（或顶点）组成的，由一条边连接在一起的节点是相邻节点</p><p>一个节点的度是其相邻节点的数量</p><p>路径是节点之间的一个连续序列，当经过一些路径时不包含重复的节点，这个路径即为简单路径。如果第一个顶点和最后一个顶点重合，这样的路径称为回路或环，环当然也是一个简单路径。如果图中不存在环，则该图是无环的。如果每两个顶点都存在路径，则该图是连通的</p><p>图也被分为有向图和无向图，对于有向图来说，边会有一个方向，而无向图没有。如果图每两个顶点都在双向上存在路径，则该图是强连通的</p><p>图还可以是未加权或加权的</p><p>从数据结构的角度来说，有很多种方式用来表示图，没有绝对正确的表示法，这取决于待解决的问题和图的类型</p><p>图最常见的实现是邻接矩阵，每个节点都和一个整数相关联，该整数作为数组的索引，因此可以用一个二维数组来表示顶点之间的连接。如果索引为 i 的节点和索引为 j 的节点相邻，则<code>array[i][j] === 1</code>，否则<code>array[i][j] === 0</code></p><p>如果不是强连通的图使用邻接矩阵来表示，则矩阵中间会有很多 0，这浪费了大量的存储空间用来表示根本不存在的边</p>",9)]))}const l=t(a,[["render",i],["__file","graph.html.vue"]]),s=JSON.parse(`{"path":"/ds-algorithm/graph.html","title":"图","lang":"zh-CN","frontmatter":{"title":"图","category":"数据结构与算法","article":false,"order":7,"description":"图是网络结构的抽象模型，学习图是重要的，因为任何二元关系都可以用图来表示。任何社交网络，例如 Facebook、Twitter 和 Google+，都可以用图来表示，还可以使用图来表示道路、航班以及通信 图是一组由边连接的节点（或顶点）组成的，由一条边连接在一起的节点是相邻节点 一个节点的度是其相邻节点的数量 路径是节点之间的一个连续序列，当经过一些路...","head":[["meta",{"property":"og:url","content":"https://jinqiu.wang/ds-algorithm/graph.html"}],["meta",{"property":"og:site_name","content":"JQiue's notes"}],["meta",{"property":"og:title","content":"图"}],["meta",{"property":"og:description","content":"图是网络结构的抽象模型，学习图是重要的，因为任何二元关系都可以用图来表示。任何社交网络，例如 Facebook、Twitter 和 Google+，都可以用图来表示，还可以使用图来表示道路、航班以及通信 图是一组由边连接的节点（或顶点）组成的，由一条边连接在一起的节点是相邻节点 一个节点的度是其相邻节点的数量 路径是节点之间的一个连续序列，当经过一些路..."}],["meta",{"property":"og:type","content":"website"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-12-25T05:39:22.000Z"}],["meta",{"property":"article:modified_time","content":"2024-12-25T05:39:22.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"WebPage\\",\\"name\\":\\"图\\",\\"description\\":\\"图是网络结构的抽象模型，学习图是重要的，因为任何二元关系都可以用图来表示。任何社交网络，例如 Facebook、Twitter 和 Google+，都可以用图来表示，还可以使用图来表示道路、航班以及通信 图是一组由边连接的节点（或顶点）组成的，由一条边连接在一起的节点是相邻节点 一个节点的度是其相邻节点的数量 路径是节点之间的一个连续序列，当经过一些路...\\"}"]]},"headers":[],"git":{"createdTime":1735105162000,"updatedTime":1735105162000,"contributors":[{"name":"JQiue","username":"JQiue","email":"861947542@qq.com","commits":1,"url":"https://github.com/JQiue"}]},"readingTime":{"minutes":1.67,"words":500},"filePathRelative":"ds-algorithm/graph.md","localizedDate":"2024年12月25日","excerpt":"<p>图是网络结构的抽象模型，学习图是重要的，因为任何二元关系都可以用图来表示。任何社交网络，例如 Facebook、Twitter 和 Google+，都可以用图来表示，还可以使用图来表示道路、航班以及通信</p>\\n<p>图是一组由边连接的节点（或顶点）组成的，由一条边连接在一起的节点是相邻节点</p>\\n<p>一个节点的度是其相邻节点的数量</p>\\n<p>路径是节点之间的一个连续序列，当经过一些路径时不包含重复的节点，这个路径即为简单路径。如果第一个顶点和最后一个顶点重合，这样的路径称为回路或环，环当然也是一个简单路径。如果图中不存在环，则该图是无环的。如果每两个顶点都存在路径，则该图是连通的</p>","autoDesc":true}`);export{l as comp,s as data};