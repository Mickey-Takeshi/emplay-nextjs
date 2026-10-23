# ChatGPT広告 入稿仕様: ホームページ制作集客

作成日: 2026-10-24
対象: 株式会社EMPLAY
状態: 制作済み・入稿前（予算、地域、LP、アカウントの確定待ち）

## 1. 目的と評価指標

- 事業目的: ホームページ制作・リニューアルの相談獲得
- 初回キャンペーン目的: Clicks
- 最終コンバージョン: 問い合わせフォームの送信完了
- OpenAI標準イベント: `lead_created`（`type: customer_action`）
- 主指標: 有効問い合わせ数、問い合わせ獲得単価
- 診断指標: 広告クリック数、クリック率、クリック単価、LP到達、フォーム開始、フォーム完了率

OpenAI PixelまたはConversions APIで`lead_created`が継続して受信できることを確認した後、Conversions目的は別キャンペーンで比較する。計測前にConversionsへ切り替えない。

有効問い合わせの仮定義:

- 問い合わせフォームの送信に成功している
- ホームページの新規制作、刷新、WordPress・CMSの更新、保守、移行の相談に該当する
- 営業提案、採用、テスト、スパム、無関係な問い合わせではない
- 同一企業または同一メールアドレスから30日以内に届いた同一案件は1件として数える

集計単位は有効問い合わせ1件、問い合わせ獲得単価は期間内広告費÷有効問い合わせ数とする。判定は問い合わせ受信記録で行い、広告経由の判別に`service`とUTM値を保存する。定義と保存項目は配信前に人が確定する。

## 2. 初回設定案

| 項目 | 推奨値 | 状態 |
|---|---|---|
| Campaign name | `JP | HP制作 | Renewal & WordPress | Clicks | 2026-10` | 仮決め |
| Objective | Clicks | 仮決め |
| Bidding strategy | Maximize clicks | 仮決め |
| Billing event | Click | 仮決め |
| Status | PAUSED | 確定 |
| Country | Japan | 承認待ち |
| Duration | 30 days | 承認待ち |
| Budget type | Campaign-total | 承認待ち |
| Campaign-total budget | JPY 150,000 | 承認待ち |
| Reference daily average | JPY 5,000 | 設定値ではなく参考値 |
| Landing page | `/service/hp/renewal` | 承認待ち |

日本円の最低日予算は2026-10-24時点で2,500円。Ads Managerでは日予算とキャンペーン総額のどちらか一方を選ぶ。今回は30日間の費用上限を厳密にするため総額15万円を推奨する。日予算を選ぶ場合、日単位の消化額は設定額の2倍まで変動し、7日間では設定日予算の7倍以内となる。

Clicks目的はキャンペーンの入札種別と課金イベントをClickにそろえ、各広告グループでは`maximize_clicks`を使う。根拠のない上限CPCは設定しない。対象アカウントの作成前検証でこの組み合わせが拒否された場合は、固定入札へ推測で切り替えず停止する。

現行ベータの広告ポリシーは、主に生活用品、地域サービス、旅行・体験、デジタル製品、教育などの消費者向け分野を対応カテゴリとして挙げている。企業向けホームページ制作が必ず対象になるとは明記されていないため、対象アカウントでカテゴリ適格性を確認し、対象外または審査不承認の場合は入稿を停止する。

## 3. オーディエンス

### A. ホームページリニューアル検討

古いデザイン、スマートフォン対応、問い合わせ不足、更新しづらさを理由に、企業サイトの刷新を比較検討している中小企業の経営者・Web担当者。

Context hints:

1. 会社のホームページが古く、デザインやスマートフォン表示を見直したい中小企業
2. ホームページをリニューアルして問い合わせにつながる情報設計へ改善したい担当者
3. 制作会社を比較し、SEOとAI検索対策を含むサイト刷新を検討している企業
4. 既存サイトの検索順位やURLを維持しながら移行したい企業
5. 自社で更新しやすく、公開後も改善できる企業サイトを作りたい担当者

### B. WordPress運用・保守不安

WordPress、PHP、テーマ、プラグインの更新状況やバックアップ、緊急時の連絡先が曖昧で、改修または移行を検討している企業の経営者・Web担当者。

Context hints:

1. WordPressやPHP、テーマ、プラグインの更新状況が分からず運用に不安がある企業
2. 古いWordPressサイトの保守体制とバックアップを見直したい担当者
3. 脆弱性情報が出るたび対応先が分からず、サイト刷新も含めて相談したい企業
4. 更新が止まったテーマやプラグインを整理し、保守しやすいサイトへ移行したい企業
5. 制作会社との保守契約や緊急時の対応範囲を明確にしたい企業

Context hintsは完全一致キーワードではなく、広告を関連づけたい自然な会話文脈として使用する。

## 4. 広告文

OpenAIの推奨範囲（タイトル16〜24文字、本文32〜48文字）に収め、最大文字数（タイトル50、本文100）も超えない。

### Ad group A: ホームページリニューアル検討

| ID | タイトル | 文字数 | 本文 | 文字数 | 画像 |
|---|---|---:|---|---:|---|
| renewal-a | 古いホームページを今の集客設計へ | 16 | 現状サイトを診断し、情報設計・デザイン・SEO・AI検索対策まで一貫して見直します。 | 42 | `hp-renewal.jpg` |
| renewal-b | 問い合わせにつながるHPリニューアル | 18 | 古い構成や更新しづらさを整理。公開後のコンテンツ制作と改善まで伴走します。 | 37 | `hp-renewal.jpg` |
| renewal-c | 検索とAIに見つかる企業サイトへ | 16 | 既存URLと検索評価を守る移行設計で、企業サイトの刷新を支援します。 | 34 | `hp-renewal.jpg` |

### Ad group B: WordPress運用・保守不安

| ID | タイトル | 文字数 | 本文 | 文字数 | 画像 |
|---|---|---:|---|---:|---|
| security-a | WordPressの運用不安を整理 | 17 | PHP・テーマ・プラグイン・バックアップの現状を確認し、必要な改修と移行方法を整理します。 | 45 | `wordpress-maintenance.jpg` |
| security-b | 古いCMSを更新しやすいサイトへ | 16 | 古いWordPressを使い続けるリスクを診断。更新しやすい構成への刷新を支援します。 | 43 | `wordpress-maintenance.jpg` |
| security-c | サイトの保守と刷新をまとめて相談 | 16 | 脆弱性対応だけで終わらず、運用担当と保守範囲が明確な企業サイトへ見直します。 | 38 | `wordpress-maintenance.jpg` |

禁止する表現:

- 「完全に安全」「絶対に防げる」などの保証
- 「今すぐ危険」「すでに攻撃されている」など、根拠なく不安をあおる表現
- ChatGPTの回答内でEMPLAYが推奨されると誤認させる表現
- 特定の質問で必ず表示されるとする表現

## 5. クリエイティブ

| ファイル | 用途 | 仕様 |
|---|---|---|
| `public/images/ads/chatgpt-hp-renewal-20261024/hp-renewal.jpg` | Ad group A | 1200 x 1200px、JPEG、282,128 bytes |
| `public/images/ads/chatgpt-hp-renewal-20261024/wordpress-maintenance.jpg` | Ad group B | 1200 x 1200px、JPEG、287,517 bytes |

共通仕様は白背景、アイソメトリックなフラットベクター、ネイビー・ブルー・シアン主体、赤はアクセントのみ。画像内に文字、数字、ロゴ、ChatGPTのUI模倣を置かない。

## 6. 遷移先とUTM

専用LPを採用する場合:

```text
https://emplay.jp/service/hp/renewal?utm_source=chatgpt&utm_medium=paid&utm_campaign=hp_renewal_202610&utm_content={ad_id}
```

`{ad_id}`は表のIDを入れる。OpenAI PixelはOpenAIが付与する`oppref`を自動取得するため、広告URLへ手動追加しない。Conversions APIも使う場合は、受け取った値を下流へ引き継ぐ。広告文、画像、遷移先の主張を一致させる。

## 7. 計測要件

1. Ads Managerで既存データソースとOpenAI Pixelの有無を確認する。
2. 未作成の場合は、新しいデータソースを作る前に名称、作成先、費用、削除方法を提示して承認を取る。
3. `lead_created`のコンバージョンイベント設定を確認し、対象ソースとの関連づけ、状態、帰属期間を記録する。
4. フォーム送信成功時に次を発火する。

```js
oaiq("measure", "lead_created", { type: "customer_action" });
```

5. Cookie同意、プライバシーポリシー、`oppref`保持、重複計測を確認する。
6. Ads ManagerのRecent Eventsで受信を実測し、テスト問い合わせとイベント時刻を照合する。
7. 配信開始後は、Ads Managerで帰属した`lead_created`と、`service`・UTM値を保存した問い合わせ受信記録を同じ期間で照合する。イベント受信と広告への帰属を同一視しない。

## 8. 入稿と公開のゲート

1. ChatGPT Ads Managerプラグインを接続する。
2. 対象アカウント名、通貨、タイムゾーン、認証、請求、既存キャンペーン、コンバージョン設定を読み取る。
3. ホームページ制作サービスのカテゴリ適格性を確認する。
4. 予算、地域、期間、LP方針を人が確定する。
5. LPと計測を実装し、`service`・UTM値の保存、デスクトップ・モバイル表示、フォーム、Pixelイベントを実測する。
6. キャンペーン、広告グループ、広告をPAUSEDで作成する。
7. Ads Managerから全設定値とプレビューを読み戻し、仕様書と一致することを確認する。
8. 広告審査、リンク、計測が正常であることを確認してから、明示指示に基づき配信を開始する。

リンク切れ、審査不承認、誤った予算、計測不通が一つでもある場合は配信しない。実績値がない段階でCTR、CPC、CVR、CPAの合格値を仮定しない。

## 9. 公式参照先

- [Ads in ChatGPT: The Basics](https://help.openai.com/en/articles/20001207-ads-in-chatgpt-the-basics)
- [Create campaigns](https://help.openai.com/en/articles/20001210-create-campaig)
- [Create ad groups and context hints](https://help.openai.com/en/articles/20001211-create-ad-groups-and-context-hints-for-chatgpt-ads)
- [Create ads](https://help.openai.com/en/articles/20001212-create-ads-for-chatgpt)
- [Launch campaigns](https://help.openai.com/en/articles/20001209-launch-campaigns)
- [Conversion measurement](https://help.openai.com/en/articles/20001409-conversion-measurement)
- [Supported events](https://developers.openai.com/ads/supported-events)
- [OpenAI Ad policies](https://openai.com/policies/ad-policies/)
