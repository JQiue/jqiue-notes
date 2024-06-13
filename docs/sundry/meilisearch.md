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

+ 数据库路径 - Environment variable: `MEILI_DB_PATH`，Default value: `"data.ms/"`。Designates the location where database files will be created and retrieved.
+ 地址和端口 - Environment variable: `MEILI_HTTP_ADDR`，Default value: `"localhost:7700"`。Sets the HTTP address and port Meilisearch will use.
+ Master key - Environment variable: `MEILI_MASTER_KEY`，Default value: None。Expected value: a UTF-8 string of at least 16 bytes
+ 最大索引内存 - Environment variable: `MEILI_MAX_INDEXING_MEMORY`，Default value: 2/3 of the available RAM。Expected value: an integer (`104857600`) or a human readable size (`'100Mb'`). Sets the maximum amount of RAM Meilisearch can use when indexing. By default, Meilisearch uses no more than two thirds of available memory. The value must either be given in bytes or explicitly state a base unit: `107374182400`, `'107.7Gb'`, or `'107374 Mb'`. It is possible that Meilisearch goes over the exact RAM limit during indexing. In most contexts and machines, this should be a negligible amount with little to no impact on stability and performance.
+ 最大索引线程 - Environment variable: `MEILI_MAX_INDEXING_THREADS`，Default value: half of the available threads。Expected value: an integer。Sets the maximum number of threads Meilisearch can use during indexing. By default, the indexer avoids using more than half of a machine's total processing units. This ensures Meilisearch is always ready to perform searches, even while you are updating an index.

## 快照

快照是 Meilisearch 数据库的精确副本，默认位于`./data.ms`中。快照中的文档已编入索引并准备就绪，大大提高了导入速度。但是，快照在不同版本的美利搜索之间不兼容。快照也比转储大得多

## 转储

转储不像快照那样是数据库的精确副本。相反，它更接近于一个蓝图，Meilisearch 以后可以使用它从头开始重新创建整个实例。

导入转储需要 Meilisearch 重新索引所有文档，此过程使用与数据库大小成正比的大量时间和内存。与快照相比，导入转储是一种缓慢且低效的操作。

同时，转储不绑定到特定的 Meilisearch 版本，这意味着转储非常适合在升级 Meilisearch 时迁移数据。

```sh
# 创建转储
curl \
  -X POST 'http://localhost:7700/dumps'
```

```sh
# 导入转储
./meilisearch --import-dump /dumps/20200813-042312213.dump
```

## 参考资料

+ <https://www.meilisearch.com/docs>
