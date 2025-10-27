---
title: Prisma
category: 知识分享
article: false
---

Prisma 是一款非常流行的开源 ORM 工具，它可以让开发者以更简单，安全和高效的方式与数据库进行交互。Prisma 提供了一种声明式的方式来定义数据模型，可以自动生成数据库迁移脚本。Prisma 客户端是一个类型安全的数据库访问层，可以用来查询、插入、更新和删除数据。Prisma 支持多种数据库，包括 PostgreSQL、MySQL、SQLite、SQL Server 和 MongoDB

## 新的项目

### 定义数据源

```prisma
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
```

```plain
DATABASE_URL="file:./dev.db"
```

### 数据迁移

```prisma
model Post {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  title     String   @db.VarChar(255)
  content   String?
  published Boolean  @default(false)
  author    User     @relation(fields: [authorId], references: [id])
  authorId  Int
}

model Profile {
  id     Int     @id @default(autoincrement())
  bio    String?
  user   User    @relation(fields: [userId], references: [id])
  userId Int     @unique
}

model User {
  id      Int      @id @default(autoincrement())
  email   String   @unique
  name    String?
  posts   Post[]
  profile Profile?
}
```

执行 cli 命令，它会做两件事：

1. 从 scheme 创建新的 SQL 迁移文件
2. 为数据库运行 SQL 迁移文件

```sh
npx prisma migrate dev --name init
```

### 生成客户端

## 已有项目

### 连接数据库

```prisma
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
```

```plain
DATABASE_URL="file:./dev.db"
```

### 生成数据模型

`npx prisma db pull`

此命令读取在数据库中定义的环境变量并连接到数据库。一旦建立连接，它就会内省数据库（即读取数据库模式）。然后，它将数据库架构从 SQL 转换为 Prisma 架构中的数据模型

## 操作数据库

## Prisma Studio

Prisma Studio 是数据库中数据的可视化编辑器。 在终端中运行`npx prisma studio`
