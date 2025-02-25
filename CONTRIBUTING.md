# Contributing Guide

## 開発環境

このプロジェクトはVercelへのデプロイを前提としています。以下の点に注意して開発を行ってください。

### 必要な環境変数

```bash
DATABASE_URL=           # Neonデータベース接続URL
TWILIO_ACCOUNT_SID=    # Twilioアカウント情報
TWILIO_AUTH_TOKEN=     # Twilioトークン
TWILIO_PHONE_NUMBER=   # Twilio電話番号
NEXTAUTH_SECRET=       # NextAuth.js用のシークレット
NEXTAUTH_URL=          # デプロイ後のURL
```

### 型チェック

- TypeScriptの`strict`モードを使用
- `any`型の使用は避け、明示的な型定義を行う
- エラー処理では適切な型アサーションを使用

### API実装

- エッジランタイムの制約を考慮
- 環境変数のバリデーションを実装
- エラーハンドリングを適切に実装

### デプロイ前チェックリスト

1. 全ての環境変数が設定されているか
2. TypeScriptの型エラーがないか
3. ESLintのエラーがないか
4. ビルドが正常に完了するか

## トラブルシューティング

### よくあるデプロイエラー

1. 型エラー
   - 明示的な型定義を追加
   - 必要に応じて型アサーションを使用

2. 環境変数エラー
   - Vercelダッシュボードで環境変数を確認
   - ローカルの`.env`ファイルと比較

3. ビルドエラー
   - `next build`でローカルビルドを確認
   - エラーログを確認して個別に対応
