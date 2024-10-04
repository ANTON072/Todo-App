# Todo App

## デプロイに必要なツール

- SAM CLI - [Install the SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html)
- Node.js - [Install Node.js 20](https://nodejs.org/en/)
- Docker - [Install Docker community edition](https://hub.docker.com/search/?type=edition&offering=community)

## アプリケーションをはじめてビルドする

```shell
sam build
sam deploy --guided --profile [YOUR PROFILE NAME]
```

## Lambda 関数のログを fetch, tail, filter する

```shell
sam logs -n RemixFunction --stack-name [ビルド時に命名した名前] --tail
```

👉 [SAM CLI Documentation](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-logging.html)

## アプリケーションの削除

```shell
aws cloudformation delete-stack --stack-name [ビルド時に命名した名前]
```

---

👉 参考ドキュメント [serverless-nextjs-demo](https://github.com/awslabs/aws-lambda-web-adapter/tree/8916f2ddf62ce4eb6c19d49e793a85184373afcd/examples/nextjs)
