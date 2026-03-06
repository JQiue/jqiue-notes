完全可以！SeaORM 提供了 `DeriveActiveEnum` 宏，可以轻松实现这个需求。下面是完整的实现方案：

## 完整实现

### 1. 迁移文件（存储为字符串）

```rust
use sea_orm_migration::{prelude::*, schema::*};

// 定义枚举的 Rust 类型
#[derive(Iden, Clone, Debug, PartialEq, EnumIter, DeriveRelation)]
pub enum CommentsStatus {
    Table,
    Pending,
    Approved,
    Deleted,
}

#[derive(Iden)]
enum Comments {
    Table,
    Id,
    UserId,
    SiteId,
    RootId,
    ParentId,
    PagePath,
    Content,
    Status,  // 使用字符串存储
    Nick,
    Link,
    Email,
    Device,
    Location,
    IsSticky,
    UpVote,
    DownVote,
    CreatedAt,
    UpdatedAt,
    DeletedAt,
}

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .create_table(
                Table::create()
                    .table(Comments::Table)
                    .if_not_exists()
                    .col(pk_auto(Comments::Id))
                    .col(integer(Comments::UserId).null())
                    .col(integer(Comments::SeaId))
                    .col(integer(Comments::RootId).null())
                    .col(integer(Comments::ParentId).null())
                    .col(string(Comments::PagePath))
                    .col(text(Comments::Content))
                    // 字符串类型，兼容所有数据库
                    .col(string(Comments::Status).default("pending"))
                    .col(string(Comments::Nick))
                    .col(string(Comments::Link))
                    .col(string(Comments::Email))
                    .col(string(Comments::Device))
                    .col(string(Comments::Location))
                    .col(boolean(Comments::IsSticky).default(false))
                    .col(integer(Comments::UpVote).default(0))
                    .col(integer(Comments::DownVote).default(0))
                    .col(date_time(Comments::CreatedAt))
                    .col(date_time(Comments::UpdatedAt))
                    .col(date_time(Comments::DeletedAt).null())
                    .to_owned(),
            )
            .await
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .drop_table(Table::drop().table(Comments::Table).to_owned())
            .await
    }
}
```

### 2. 实体模型（使用 DeriveActiveEnum）

```rust
use sea_orm::{entity::prelude::*, sea_strum::IntoEnumIterator};
use strum_macros::{Display, EnumString};

// 使用 DeriveActiveEnum 自动生成 ActiveEnum 实现
#[derive(
    DeriveActiveEnum, 
    Clone, 
    Debug, 
    PartialEq, 
    Eq, 
    EnumString, 
    Display
)]
#[sea_orm(rs_type = "String", enum_name = "comments_status")]
pub enum CommentsStatus {
    #[sea_orm(string_value = "pending")]
    Pending,
  
    #[sea_orm(string_value = "approved")]
    Approved,
  
    #[sea_orm(string_value = "deleted")]
    Deleted,
}

// 实体模型
#[derive(Clone, Debug, PartialEq, DeriveEntityModel)]
#[sea_orm(table_name = "comments")]
pub struct Model {
    #[sea_orm(primary_key)]
    pub id: i32,
  
    #[sea_orm(column_name = "user_id")]
    pub user_id: Option<i32>,
  
    #[sea_orm(column_name = "site_id")]
    pub site_id: i32,
  
    #[sea_orm(column_name = "root_id")]
    pub root_id: Option<i32>,
  
    #[sea_orm(column_name = "parent_id")]
    pub parent_id: Option<i32>,
  
    #[sea_orm(column_name = "page_path")]
    pub page_path: String,
  
    pub content: String,
  
    // 这里使用 ActiveEnum 类型
    pub status: CommentsStatus,
  
    pub nick: String,
  
    pub link: String,
  
    pub email: String,
  
    pub device: String,
  
    pub location: String,
  
    #[sea_orm(column_name = "is_sticky")]
    pub is_sticky: bool,
  
    #[sea_orm(column_name = "up_vote")]
    pub up_vote: i32,
  
    #[sea_orm(column_name = "down_vote")]
    pub down_vote: i32,
  
    #[sea_orm(column_name = "created_at")]
    pub created_at: DateTimeUtc,
  
    #[sea_orm(column_name = "updated_at")]
    pub updated_at: DateTimeUtc,
  
    #[sea_orm(column_name = "deleted_at")]
    pub deleted_at: Option<DateTimeUtc>,
}

#[derive(Copy, Clone, Debug, EnumIter, DeriveRelation)]
pub enum Relation {}

impl ActiveModelBehavior for ActiveModel {}
```

### 3. 使用示例

```rust
use crate::entities::comments::{Entity, Model, CommentsStatus};

// 查询待审核的评论
let pending_comments = Entity::find()
    .filter(Column::Status.eq(CommentsStatus::Pending))
    .all(db)
    .await?;

// 使用枚举进行状态更新
let comment = ActiveModel {
    id: Set(1),
    status: Set(CommentsStatus::Approved),
    ..Default::default()
};

// 转换为 JSON 时自动显示为字符串
println!("Status: {}", CommentsStatus::Pending); // pending

// 枚举迭代（用于批量操作）
for status in CommentsStatus::iter() {
    println!("Status: {}", status.to_string());
}
```

## 更复杂的例子（多个枚举）

```rust
// 用户角色枚举
#[derive(
    DeriveActiveEnum, 
    Clone, 
    Debug, 
    PartialEq, 
    Eq, 
    EnumString, 
    Display
)]
#[sea_orm(rs_type = "String", enum_name = "user_role")]
pub enum UserRole {
    #[sea_orm(string_value = "admin")]
    Admin,
  
    #[sea_orm(string_value = "moderator")]
    Moderator,
  
    #[sea_orm(string_value = "user")]
    User,
  
    #[sea_orm(string_value = "guest")]
    Guest,
}

// 设备类型枚举
#[derive(
    DeriveActiveEnum, 
    Clone, 
    Debug, 
    PartialEq, 
    Eq, 
    EnumString, 
    Display
)]
#[sea_orm(rs_type = "String", enum_name = "device_type")]
pub enum DeviceType {
    #[sea_orm(string_value = "desktop")]
    Desktop,
  
    #[sea_orm(string_value = "mobile")]
    Mobile,
  
    #[sea_orm(string_value = "tablet")]
    Tablet,
  
    #[sea_orm(string_value = "bot")]
    Bot,
}

// 在实体中同时使用多个枚举
#[derive(Clone, Debug, PartialEq, DeriveEntityModel)]
#[sea_orm(table_name = "comments")]
pub struct Model {
    // ...
    pub status: CommentsStatus,
    pub role: UserRole,      // 用户角色
    pub device: DeviceType,  // 设备类型
    // ...
}
```

## 注意事项

1. **确保 Cargo.toml 包含依赖**：
```toml
[dependencies]
sea-orm = { version = "0.12", features = ["runtime-async-std-native-tls", "macros"] }
strum = { version = "0.24", features = ["derive", "std"] }
strum_macros = "0.24"
```

2. **默认值的处理**：
```rust
// 可以在迁移中设置默认值
.col(string(Comments::Status).default("pending"))

// 或者在 Rust 中设置
pub status: CommentsStatus = CommentsStatus::Pending;
```

3. **与现有数据库的兼容性**：
```rust
// 如果数据库中已有不同的值映射
#[derive(DeriveActiveEnum, Clone, Debug, PartialEq, Eq, EnumString, Display)]
#[sea_orm(rs_type = "String", enum_name = "comments_status")]
pub enum CommentsStatus {
    #[sea_orm(string_value = "PENDING")]  // 大写
    Pending,
  
    #[sea_orm(string_value = "1")]  // 数字
    Approved,
  
    #[sea_orm(string_value = "deleted")]
    Deleted,
}
```

这样设计完全兼容 PostgreSQL、MySQL、SQLite 等所有数据库，同时享受 Rust 枚举的类型安全和代码提示！