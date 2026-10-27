# GA4 / GTMイベント計測仕様（2026年7月）

最終更新: 2026-10-26
対象サイト: `https://emplay.jp`  
GTMコンテナ: `GTM-TG7GTN4B`

## 1. 現在の状態

- サイトへのGTMコンテナ設置: 完了
- dataLayerイベント実装: 完了
- 公開GTMコンテナ: **バージョン2（ライブ）**（2026-10-26 16:22公開）
- Googleタグ: `G-5YQRWCQSC1`
- 公開内容: **8タグ / 7カスタムイベントトリガー / 11カスタムdataLayer変数**
- GA4 DebugView受信: `cta_click`、`lead_form_view`、`lead_form_start`、`lead_form_abandon`を確認済み
- GA4カスタムディメンション: `inquiry_topic`、`landing_variant`、`acquisition_source`をイベントスコープで登録済み
- `generate_lead`のキーイベント指定: 受信前に事前登録済み（デフォルト金額なし / イベントごとに1回）

公開後にGoogle配信中の`gtm.js?id=GTM-TG7GTN4B`を取得し、測定ID、7イベント名、広告流入3属性が含まれることを確認した。Tag Assistantでは`lead_form_view`、`lead_form_start`、`lead_form_abandon`、`cta_click`、`share`の発火と属性値を確認し、このうちフォーム3イベントと`cta_click`はGA4 DebugViewでの受信も確認した。`generate_lead`はGA4へキーイベントとして事前登録済みだが、実問い合わせを発生させず発火は未検証とした。`lead_form_error`も意図的な障害を発生させず、タグ設定と実装経路のみ確認した。

## 2. dataLayerイベント

| dataLayerイベント | 発火条件 | パラメータ |
|---|---|---|
| `form_view` | 問い合わせフォーム表示 | `form`, `inquiry_topic`, `landing_variant`, `acquisition_source` |
| `form_start` | 最初の入力 | `form`, `inquiry_topic`, `landing_variant`, `acquisition_source` |
| `form_submit` | Supabaseへの保存成功 | `form`, `inquiry_topic`, `landing_variant`, `acquisition_source` |
| `form_error` | 送信失敗 | `form`, `inquiry_topic`, `landing_variant`, `acquisition_source` |
| `form_abandon` | 入力内容を残したままページ離脱が確定 | `form`, `reason`（`pagehide` / `route_change`）, `inquiry_topic`, `landing_variant`, `acquisition_source` |
| `cta_click` | 記事末・サービスページ・モバイル追従CTAクリック | `cta_location`, `cta_type`, `article_category`, `service`, `inquiry_topic`, `landing_variant`, `acquisition_source` |
| `article_share` | 記事シェアボタンのクリック | `network`, `slug` |

## 3. GTM公開設定

1. 「Googleタグ」にGA4測定ID（`G-5YQRWCQSC1`）を設定する。トリガーはInitialization - All Pages。
2. dataLayer変数を作成する: `form`, `reason`, `cta_location`, `cta_type`, `article_category`, `service`, `network`, `slug`, `inquiry_topic`, `landing_variant`, `acquisition_source`。
3. 各dataLayerイベント名と同名のカスタムイベントトリガーを作成する。
4. GA4イベントタグを以下の対応で作成する。

| GTMトリガー | GA4イベント名 | GA4パラメータ |
|---|---|---|
| `form_view` | `lead_form_view` | `form_name`, `inquiry_topic`, `landing_variant`, `acquisition_source` |
| `form_start` | `lead_form_start` | `form_name`, `inquiry_topic`, `landing_variant`, `acquisition_source` |
| `form_submit` | `generate_lead` | `form_name`, `inquiry_topic`, `landing_variant`, `acquisition_source` |
| `form_error` | `lead_form_error` | `form_name`, `reason`, `inquiry_topic`, `landing_variant`, `acquisition_source` |
| `form_abandon` | `lead_form_abandon` | `form_name`, `reason`, `inquiry_topic`, `landing_variant`, `acquisition_source` |
| `cta_click` | `cta_click` | `cta_location`, `cta_type`, `article_category`, `service`, `inquiry_topic`, `landing_variant`, `acquisition_source` |
| `article_share` | `share` | `method={{DLV - network}}`, `content_id={{DLV - slug}}` |

5. GTMプレビューモードで5イベントの発火を確認する（完了）。`generate_lead`と`lead_form_error`は設定・実装経路のみ確認する。
6. コンテナを公開する（バージョン2、完了）。
7. GA4 DebugViewでフォーム3イベントと`cta_click`の受信を確認する（完了）。通常レポートへの反映には時間差がある。
8. GA4管理画面で`generate_lead`を「コードを使用して作成」し、キーイベントとして事前登録する（完了）。デフォルト金額は設定せず、カウント方法は「イベントごとに1回」とする。
9. GA4管理画面で`inquiry_topic`、`landing_variant`、`acquisition_source`をイベントスコープのカスタムディメンションとして登録する（完了）。

## 4. 重複計測の防止

GA4の拡張計測機能で「フォーム操作」が有効な場合、`form_start`・`form_submit`相当の自動イベントと重複する可能性がある。本仕様ではGA4側のイベント名を`lead_form_*`と`generate_lead`に分けるため、フォームファネルは本仕様のイベントだけをレポートに使用する。

SPA遷移ではdataLayerの値が次のイベントにも残るため、共通の`trackEvent`は毎回`inquiry_topic`、`landing_variant`、`acquisition_source`を初期化してからイベント値を設定する。この初期化を外すと、通常流入へ以前の広告属性が混入する。

## 5. 検収条件

- ページ表示1回につき`lead_form_view`が1回
- 最初の入力時だけ`lead_form_start`が1回
- 正常送信時に`generate_lead`が1回
- 送信失敗時に`lead_form_error`が1回
- 未送信離脱時に`lead_form_abandon`が最大1回
- CTAクリックに`cta_location`と`cta_type`が付与される
- ChatGPT広告とGoogle広告を`acquisition_source`（`chatgpt-ads` / `google-ads`）で分けて確認できる
- 広告の各訴求を`landing_variant`で分けて確認できる
- パラメータなしの通常流入には`acquisition_source`を付けない
- 個人情報（氏名、メール、電話、問い合わせ本文）をdataLayer・GA4へ送信しない
