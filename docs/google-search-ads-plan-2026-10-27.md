# Google検索広告 設定書

対象: 株式会社EMPLAY（https://emplay.jp/）  
作成日: 2026年10月27日  
状態: 入稿準備済み。専用アカウント作成後に停止状態で設定し、配信開始は別途指示を受けて行う。

## 1. アカウント

- 推奨アカウント名: `株式会社EMPLAY｜コーポレート広告`
- 管理元MCC: `株式会社EMPLAY MCC`（118-922-1884）
- 通貨: JPY
- タイムゾーン: Asia/Tokyo
- 既存の177-332-4799と999-861-9991は、解約済みかつ他案件が混在するため使用しない。

## 2. キャンペーン

| 項目 | 設定 |
| --- | --- |
| キャンペーン名 | EMPLAY｜HP制作・保守｜検索｜2026-10 |
| 種別 | 検索 |
| 目標 | 見込み顧客の獲得 |
| 地域 | 日本 |
| 言語 | 日本語 |
| ネットワーク | Google検索のみ。検索パートナーとディスプレイは初期OFF |
| 入札 | コンバージョン数の最大化。目標CPAは初期設定しない |
| 平均日額予算 | 2,500円 |
| 広告スケジュール | 月〜金 09:00〜18:00（Asia/Tokyo） |
| 初期検証 | 14日。学習期間中は予算・入札・CV定義を頻繁に変えない |
| 状態 | 停止 |

平均日額予算は厳密な日次上限ではない。Google公式では、多くのキャンペーンで1日の請求上限は平均日額の2倍、月間上限は平均日額の30.4倍とされる。広告スケジュールを平日に限定しても月間ペースは30.4倍を基準とするため、開始前に予算レポートと終了日を確認する。

## 3. コンバージョン

- GA4プロパティ: `G-5YQRWCQSC1`
- GTMコンテナ: `GTM-TG7GTN4B`
- インポート対象: GA4キーイベント `generate_lead`
- 発火条件: 問い合わせ内容がDBへ正常保存された `form_submit`
- 最適化: Primary
- カウント: 1回
- ルックバック期間: アカウント標準値を採用し、開始前に画面で確認
- Enhanced Conversions: 初期OFF。個人情報の送信設計と同意管理を別途確認してから検討

## 4. 広告グループとリンク先

### WordPress保守・管理外注

リンク先: `https://emplay.jp/service/hp/wordpress-renewal?intent=maintenance&source=google-ads`

- `[wordpress 保守 会社]`
- `"wordpress 保守 会社"`
- `[wordpress 管理 外注]`
- `"wordpress 管理 外注"`
- `[ホームページ 保守 外注]`
- `"ホームページ 保守 外注"`
- `[cms 保守 契約]`
- `"wordpress バックアップ 保守"`

### 管理不明・更新放置

リンク先: `https://emplay.jp/service/hp/wordpress-renewal?intent=maintenance&source=google-ads`

- `"制作会社 連絡取れない ホームページ"`
- `"wordpress 管理者 わからない"`
- `"wordpress 更新 放置"`
- `"wordpress 更新 できない"`
- `"ホームページ 管理者 不明"`
- `"wordpress php 古い"`

### セキュリティ起点の刷新

リンク先: `https://emplay.jp/service/hp/wordpress-renewal?intent=security&source=google-ads`

- `[wordpress リニューアル]`
- `"wordpress リニューアル セキュリティ"`
- `"wordpress から 移行"`
- `"wordpress 改修 再構築"`
- `"ホームページ セキュリティ 見直し"`
- `"古い ホームページ 作り直し"`

初期は完全一致・フレーズ一致だけを使い、部分一致は検索語句とCV実績がたまってから別テストにする。

## 5. 除外キーワード

アカウントではなく本キャンペーンに適用する。

- 無料
- 自分で
- やり方
- ログイン
- テーマ 無料
- プラグイン ダウンロード
- 求人
- 転職
- 講座
- 資格
- 個人ブログ
- 即日復旧
- 24時間
- マルウェア駆除
- 脆弱性診断 無料
- SOC
- ペネトレーションテスト

「プラグイン」単体は、古いプラグインの更新相談を除外するため設定しない。緊急対応系は既存保守契約の範囲で提供するため、新規獲得広告では除外する。

## 6. レスポンシブ検索広告

### 見出し候補（30文字以内）

- WordPress保守を外部に相談
- 更新できないサイトを見直し
- 管理会社が不明でも相談可能
- 改修・再構築を比較して提案
- 企業サイトの管理体制を整理
- バックアップと更新を見直す
- 古いWordPressを安全に移行
- ホームページ保守を一本化
- 制作会社変更の引き継ぎ支援
- セキュリティ不安をサイト刷新へ
- EMPLAYのHP制作・保守
- 初回相談無料

### 説明文候補（90文字以内）

- WordPress・PHP・管理権限・バックアップを確認し、保守・改修・再構築を整理します。
- 制作会社や管理者が分からない状態でも、ドメイン・サーバーの確認項目から一緒に整理します。
- 更新・監視・バックアップ・緊急対応の範囲を明確化し、企業サイトの継続運用を支援します。
- 古いサイトを直して使うか作り直すか、費用・期間・運用負担を比較してご提案します。

「完全防御」「必ず安全」「24時間対応」など、提供条件を超える表現は使わない。

## 7. アセット

| サイトリンク | 最終URL |
| --- | --- |
| WordPress見直し | `https://emplay.jp/service/hp/wordpress-renewal?intent=maintenance&source=google-ads` |
| HPリニューアル | `https://emplay.jp/service/hp/wordpress-renewal?intent=security&source=google-ads` |
| 保守費用の記事 | `https://emplay.jp/blog/website-maintenance-cost-guide?topic=wordpress-renewal&intent=maintenance&source=google-ads` |
| お問い合わせ | `https://emplay.jp/contact?topic=wordpress-renewal&intent=maintenance&source=google-ads` |

- コールアウト: 初回相談無料、通常1営業日以内に返信、改修・再構築を比較、保守運用まで対応
- 電話番号アセット: 初期は設定しない。受電体制と計測方法を確定してから追加する。

## 8. 公開前チェック

1. 専用アカウント名、通貨、タイムゾーン、請求先を確認する。
2. GA4とGoogle広告をリンクし、`generate_lead`をPrimaryとしてインポートする。
3. 3広告グループの最終URLと4サイトリンクで `source=google-ads` が問い合わせまで保持されることを確認する。
4. 地域、言語、検索ネットワーク、日程、平均日額、広告スケジュールを読み戻す。
5. キャンペーン、広告グループ、広告がすべて停止中であることを確認する。
6. 配信開始は利用者の明示指示後に行い、開始直後に状態と予算を再確認する。

## 公式資料

- [Google広告: 平均日額予算](https://support.google.com/google-ads/answer/6385083)
- [Google広告: 広告スケジュール](https://support.google.com/google-ads/answer/2404244)
- [Google広告: GA4イベントからコンバージョンを作成](https://support.google.com/google-ads/answer/2375435)
