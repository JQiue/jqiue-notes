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

或者前往<https://github.com/meilisearch/meilisearch/releases>下载构建好的包

配置 Master Key，启动 MeiliSearch 时如果没有设置，则会自动生成一个 Master Key，将它设置到环境变量中，不要公开：

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
  -e MEILISEARCH_API_KEY=$MEILI_MASTER_KEY \
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

## 启动配置

### 数据库路径

Database path
Environment variable: `MEILI_DB_PATH`
CLI option: `--db-path`
Default value: `"data.ms/"`
Expected value: a filepath

Designates the location where database files will be created and retrieved.

### 地址和端口

Environment variable: `MEILI_HTTP_ADDR`
CLI option: `--http-addr`
Default value: `"localhost:7700"`
Expected value: an HTTP address and port

Sets the HTTP address and port Meilisearch will use.

### Master key

Environment variable: `MEILI_MASTER_KEY`
CLI option: `--master-key`
Default value: None
Expected value: a UTF-8 string of at least 16 bytes

### 最大索引内存

Environment variable: `MEILI_MAX_INDEXING_MEMORY`
CLI option: `--max-indexing-memory`
Default value: 2/3 of the available RAM
Expected value: an integer (`104857600`) or a human readable size (`'100Mb'`)

Sets the maximum amount of RAM Meilisearch can use when indexing. By default, Meilisearch uses no more than two thirds of available memory.

The value must either be given in bytes or explicitly state a base unit: `107374182400`, `'107.7Gb'`, or `'107374 Mb'`.

It is possible that Meilisearch goes over the exact RAM limit during indexing. In most contexts and machines, this should be a negligible amount with little to no impact on stability and performance.

### 最大索引线程

Environment variable: `MEILI_MAX_INDEXING_THREADS`
CLI option: `--max-indexing-threads`
Default value: half of the available threads
Expected value: an integer

Sets the maximum number of threads Meilisearch can use during indexing. By default, the indexer avoids using more than half of a machine's total processing units. This ensures Meilisearch is always ready to perform searches, even while you are updating an index.

If --max-indexing-threads is higher than the real number of cores available in the machine, Meilisearch uses the maximum number of available cores.

In single-core machines, Meilisearch has no choice but to use the only core available for indexing. This may lead to a degraded search experience during indexing.

## 参考资料

+ <https://www.meilisearch.com/docs>
