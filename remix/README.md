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

## URL 一覧

### 認証関連

- `/login` ログインページ
- `/signup` 新規ユーザー登録ページ
- `/logout` ログアウト処理
- `/forgot-password` パスワードリセットページ

### Todo 管理

- `/` ダッシュボード

### ユーザー設定

- `/profile` ユーザープロフィール

## ER 図

```mermaid
erDiagram
    USER ||--o{ TODO : creates
    USER {
        uuid id PK
        string cognito_id UK
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

## 認証フロー

```mermaid
sequenceDiagram
    participant Client as ブラウザ
    participant Server as Remixサーバー
    participant Cognito as Amazon Cognito
    participant DB as データベース

    Client->>Server: ページリクエスト
    Server->>Server: セッションクッキーからアクセストークンを取得
    alt アクセストークンが存在
        Server->>Cognito: アクセストークン検証
        alt トークンが有効
            Cognito->>Server: 検証成功 + ユーザー情報
            Server->>DB: ユーザー情報取得 or 更新
            DB->>Server: ユーザー情報
            Server->>Client: ページ内容 + ユーザー情報
        else トークンが無効または期限切れ
            Cognito->>Server: 検証失敗
            alt リフレッシュトークンが有効
                Server->>Cognito: トークンリフレッシュ要求
                Cognito->>Server: 新しいアクセストークン
                Server->>Server: セッション更新
                Server->>DB: ユーザー情報取得 or 更新
                DB->>Server: ユーザー情報
                Server->>Client: ページ内容 + ユーザー情報
            else リフレッシュトークンも無効
                Server->>Client: ログインページにリダイレクト
            end
        end
    else アクセストークンが存在しない
        Server->>Client: ログインページにリダイレクト
    end
```
