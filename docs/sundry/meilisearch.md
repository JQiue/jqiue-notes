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

配置 Master-Key：

```sh
export MEILI_MASTER_KEY="root"
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
