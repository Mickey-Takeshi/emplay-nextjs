# Supabase Edge Functions

本番プロジェクト: `aipdojhchzqdykbucznr`（emplay_hpスキーマ）

## send-contact-email
お問い合わせフォームの受け口。DB保存(emplay_hp.contacts)→自動判定(lead/review/sales)→Gmail SMTP通知。
判定ロジックの経緯は docs/progress-log-2026-07.md Phase C を参照。

呼び出し元は2サイト: emplay.jp本体と academy.emplay.jp（EMPLAY AI ACADEMY、リポジトリ emplay-ai-academy）。
ペイロードの `source` フィールド（'hp'省略可 / 'academy'）で識別し、DBの `contacts.source` 列・件名の【AI ACADEMY】タグに反映する（2026-08-07追加）。
CORS許可オリジンに academy.emplay.jp を含む。

デプロイ:
```bash
SUPABASE_ACCESS_TOKEN=<token> npx supabase functions deploy send-contact-email \
  --project-ref aipdojhchzqdykbucznr --no-verify-jwt
```
※ 旧リポジトリ(EMPLAY_HP、アーカイブ済み)から2026-07-24に移設。以後はこちらが正。
