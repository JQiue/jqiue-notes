---
title: 使用 MeiliSearch 构建轻量级搜素引擎
---

MeiliSearch 是 Rust 编写的轻量级搜素引擎，快而高效

## 安装&&启动

::: code-tabs

@tab Arch

```sh
pacman -S meilisearch
systemctl enable meilisearch.service
systemctl start meilisearch.service
```

:::

或者前往<https://github.com/meilisearch/docs-searchbar.js/releases>下载构建好的包

配置 Master-Key，启动 MeiliSearch 时如果没有设置，则会自动生成一个 Master-Key，将它设置到环境变量中，不要公开：

```sh
export MEILI_MASTER_KEY="Master Key"
```

## 刮削

以抓 vuepress 为例，这是抓取配置：

```json
{
  "index_uid": "jinqiu-wang",
  "start_urls": ["https://jinqiu.wang/"],
  "sitemap_urls": ["https://jinqiu.wang/sitemap.xml"],
  "selectors": {
    "lvl0": {
      "selector": ".sidebar-heading.active",
      "global": true,
      "default_value": "文档"
    },
    "lvl1": {
      "selector":".vp-page-title h1",
      "global": true,
      "default_value": "文章"
    },
    "lvl2": ".theme-hope-content h2",
    "lvl3": ".theme-hope-content h3",
    "text": ".theme-hope-content p, .theme-hope-content li"
  }
}
```

然后使用官方提供的爬虫 docker 抓取文档

```sh
docker run -t --rm \
  --network=host \
  -e MEILISEARCH_HOST_URL='http://localhost:7700' \
  -e MEILISEARCH_API_KEY='root' \
  -v /root/crawl/meilisearch.json:/docs-scraper/config.json \
  getmeili/docs-scraper:latest pipenv run ./docs_scraper config.json
```

## 访问

访问索引必须使用密钥，但不要使用 Master-Key，通过下面的路由创建一个只允许搜索的访问 Key

```sh
curl \
  -X POST 'http://localhost:7700/keys' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer MASTER_KEY' \
  --data-binary '{
    "description": "Search jinqiu-wang records key",
    "actions": ["search"],
    "indexes": ["jinqiu-wang"],
    "expiresAt": "2025-01-01T00:00:00Z"
  }'
```

其中指定`indexes`数组，允许这个 key 能够访问哪些索引，不出意外的话就返回以下数据

```json
{
  "name":null,
  "description":"Search jinqiu-wang records key",
  "key":"adaf72e2a6d6f428ec465bc786ec41de868bbd5f1997e89ba2299e9566c88213",
  "uid":"b84d1be5-caa5-4752-b078-8f40be39051d",
  "actions":["search"],
  "indexes":["jinqiu-wang"],
  "expiresAt":"2025-01-01T00:00:00Z",
  "createdAt":"2024-01-27T06:50:33.668329328Z",
  "updatedAt":"2024-01-27T06:50:33.668329328Z"
}
```

此时可以通过该 key 来访问

## 参考资料

+ <https://www.meilisearch.com/docs>
