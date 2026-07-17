# GA4 / GTMイベント計測仕様（2026年7月）

最終更新: 2026-07-17  
対象サイト: `https://emplay.jp`  
GTMコンテナ: `GTM-TG7GTN4B`

## 1. 現在の状態

- サイトへのGTMコンテナ設置: 完了
- dataLayerイベント実装: 完了
- 公開GTMコンテナのタグ: **0件**（2026-07-17実測、`tags: []`）
- GA4へのイベント送信: 未開始

GTM管理画面でGA4測定IDを設定し、タグを公開するまでは、サイトがpushしているイベントはGA4に保存されない。

## 2. dataLayerイベント

| dataLayerイベント | 発火条件 | パラメータ |
|---|---|---|
| `form_view` | 問い合わせフォーム表示 | `form` |
| `form_start` | 最初の入力 | `form` |
| `form_submit` | Supabaseへの保存成功 | `form` |
| `form_error` | 送信失敗 | `form` |
| `form_abandon` | 入力内容を残したままページ離脱 | `form`, `reason` |
| `cta_click` | 記事末・モバイル追従CTAクリック | `cta_location`, `cta_type`, `article_category`, `service` |
| `article_share` | 記事シェアボタンのクリック | `network`, `slug` |

## 3. GTM設定手順

1. 「Googleタグ」を作成し、GA4測定ID（`G-XXXXXXXXXX`）を設定する。トリガーはAll Pages。
2. dataLayer変数を作成する: `form`, `reason`, `cta_location`, `cta_type`, `article_category`, `service`, `network`, `slug`。
3. 各dataLayerイベント名と同名のカスタムイベントトリガーを作成する。
4. GA4イベントタグを以下の対応で作成する。

| GTMトリガー | GA4イベント名 | GA4パラメータ |
|---|---|---|
| `form_view` | `lead_form_view` | `form_name={{DLV - form}}` |
| `form_start` | `lead_form_start` | `form_name={{DLV - form}}` |
| `form_submit` | `generate_lead` | `form_name={{DLV - form}}` |
| `form_error` | `lead_form_error` | `form_name`, `reason` |
| `form_abandon` | `lead_form_abandon` | `form_name`, `reason` |
| `cta_click` | `cta_click` | `cta_location`, `cta_type`, `article_category`, `service` |
| `article_share` | `share` | `method={{DLV - network}}`, `content_id={{DLV - slug}}` |

5. GTMプレビューモードで各イベントの発火を確認する。
6. コンテナを公開する。
7. GA4のDebugViewとリアルタイムで受信を確認する。
8. GA4管理画面で`generate_lead`をキーイベントに設定する。

## 4. 重複計測の防止

GA4の拡張計測機能で「フォーム操作」が有効な場合、`form_start`・`form_submit`相当の自動イベントと重複する可能性がある。本仕様ではGA4側のイベント名を`lead_form_*`と`generate_lead`に分けるため、フォームファネルは本仕様のイベントだけをレポートに使用する。

## 5. 検収条件

- ページ表示1回につき`lead_form_view`が1回
- 最初の入力時だけ`lead_form_start`が1回
- 正常送信時に`generate_lead`が1回
- 送信失敗時に`lead_form_error`が1回
- 未送信離脱時に`lead_form_abandon`が最大1回
- CTAクリックに`cta_location`と`cta_type`が付与される
- 個人情報（氏名、メール、電話、問い合わせ本文）をdataLayer・GA4へ送信しない
