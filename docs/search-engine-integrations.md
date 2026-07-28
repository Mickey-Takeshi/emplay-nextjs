# 検索サービス連携ガイド（Google / Bing / IndexNow / AI検索）

最終更新: 2026-07-28 ／ 対象: emplay.jp

Googleだけでなく、Bing系（ChatGPTのWeb検索の情報源）とIndexNow参加エンジンへの連携をまとめる。

---

## 1. 連携状況

| サービス | 状態 | 備考 |
|---|---|---|
| Google Search Console | ✅ 連携済み | `sc-domain:emplay.jp`。sitemap送信済み（317 URL） |
| **IndexNow**（Bing / Yandex / Seznam / Naver） | ✅ 実装済み | キー公開 + 送信スクリプト。**アカウント不要** |
| Bing Webmaster Tools | ⏳ 要ログイン作業 | 下記2の手順。GSCインポートが最短 |
| ChatGPT / Copilot | ⭕ 間接対応 | Bingインデックス経由。IndexNowで反映が早まる |
| Googleビジネスプロフィール | ❌ 未着手 | 素材・判断待ち（progress-log §4） |

Googleは**IndexNowに非対応**。Google側の反映は従来どおりsitemapとクロールに委ねる。

---

## 2. Bing Webmaster Tools 登録手順（要ログイン・所要5分）

1. https://www.bing.com/webmasters にMicrosoftアカウントでサインイン
2. **「Google Search Consoleからインポート」を選ぶ**（推奨。GSCの認証情報でサイトと既存サイトマップが自動で取り込まれ、所有権確認も不要）
   - 手動で追加する場合は `https://emplay.jp` を入力 → 所有権確認で表示される `msvalidate.01` の値を控える
3. 手動確認を選んだ場合のみ、Vercelの環境変数に設定して再デプロイ（コード変更は不要）
   - `NEXT_PUBLIC_BING_SITE_VERIFICATION` = 取得した値
4. サイトマップに `https://emplay.jp/sitemap.xml` を送信（インポートの場合は自動）

補足: `app/layout.tsx` の `verification` は環境変数が未設定なら何も出力しない。Google用は `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`（GSCはDNS認証済みのため通常不要）。

---

## 3. IndexNow の運用

キー: `aae976c3c9c781eaf38591e2cc8fc0f5` ／ 公開先: `https://emplay.jp/aae976c3c9c781eaf38591e2cc8fc0f5.txt`
（キーファイルは `public/` にあり、削除・改名すると送信が403で失敗する）

```bash
npm run indexnow          # sitemapの全URLを送信（大規模更新時・初回）
npm run indexnow:recent   # 更新の新しい20件のみ送信（通常の記事追加後）
node scripts/submit-indexnow.mjs --url https://emplay.jp/blog/xxx  # 個別
node scripts/submit-indexnow.mjs --dry-run                          # 送信せず確認
```

**運用ルール**: 記事の追加・リライトをデプロイした**後**に `npm run indexnow:recent` を実行する。
sitemapは本番から取得するため、デプロイ前に実行しても新URLは含まれない。

HTTP 200/202 が受理。403はキーファイル未公開、422はURL/ホスト不一致を疑う。

---

## 4. 効果の確認

- Bing Webmaster Tools > 「サイトエクスプローラー」「URL送信」でクロール状況を確認
- Bingでの掲載確認は `site:emplay.jp` を実ブラウザで検索（スクリプトからのスクレイピングはブロックされる）
- ChatGPTに「ホームページ制作 費用 相場」等で質問し、emplay.jpが引用されるかを月1で確認（AIO効果測定）
