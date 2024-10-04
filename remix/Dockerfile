# ビルダーステージ
FROM public.ecr.aws/docker/library/node:20.18.0-slim as builder
WORKDIR /app
COPY . .
RUN npm ci && npm run build

# ランナーステージ
FROM public.ecr.aws/docker/library/node:20.18.0-slim as runner
# AWS Lambda Adapterをコンテナにコピー（AWS Lambdaでの実行に必要）
COPY --from=public.ecr.aws/awsguru/aws-lambda-adapter:0.8.3 /lambda-adapter /opt/extensions/lambda-adapter
# 環境変数の設定
ENV PORT=3000 NODE_ENV=production
ENV AWS_LWA_ENABLE_COMPRESSION=true
# 作業ディレクトリの設定
WORKDIR /app
# ビルダーステージで生成したファイルをコピー
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json
COPY --from=builder /app/build ./build
COPY --from=builder /app/run.sh ./run.sh
# 本番環境用の依存関係のみをインストール
RUN npm ci --omit=dev

# コンテナ起動時に実行するコマンド
CMD exec ./run.sh
