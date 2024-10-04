# Todo App

- Remix
- Amazon RDS(PostgresSQL) / Prisma ORM
- Amazon Cognito
- shadcn/ui

## 開発開始

```shell
# データベースサーバーの起動
docker compose up -d
# Nodeモジュールのインストール
npm install
# Remixの開発開始
npm run dev
```

## ER 図

```mermaid
erDiagram
    USER ||--o{ TODO : creates
    USER {
        uuid id PK
        string email
        string name
        datetime created_at
        datetime updated_at
    }
    TODO ||--o{ TODO_TAG : has
    TODO {
        uuid id PK
        uuid user_id FK
        string title
        string description
        boolean is_completed
        datetime due_date
        datetime created_at
        datetime updated_at
    }
    TAG ||--o{ TODO_TAG : belongs_to
    TAG {
        uuid id PK
        string name
        string color
        datetime created_at
        datetime updated_at
    }
    TODO_TAG {
        uuid todo_id FK
        uuid tag_id FK
    }
```
