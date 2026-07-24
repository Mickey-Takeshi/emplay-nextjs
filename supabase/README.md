# Supabase Edge Functions

本番プロジェクト: `aipdojhchzqdykbucznr`（emplay_hpスキーマ）

## send-contact-email
お問い合わせフォームの受け口。DB保存(emplay_hp.contacts)→自動判定(lead/review/sales)→Gmail SMTP通知。
判定ロジックの経緯は docs/progress-log-2026-07.md Phase C を参照。

デプロイ:
```bash
SUPABASE_ACCESS_TOKEN=<token> npx supabase functions deploy send-contact-email \
  --project-ref aipdojhchzqdykbucznr --no-verify-jwt
```
※ 旧リポジトリ(EMPLAY_HP、アーカイブ済み)から2026-07-24に移設。以後はこちらが正。
