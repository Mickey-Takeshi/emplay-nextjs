# ブログコンテンツ監査（2026-07-09）

## 2026-07-15 Search Console再監査

Search Consoleのページインデックスエクスポート4件をURL単位で再確認した。

| 理由 | 件数 | 現行状態と対応 |
|---|---:|---|
| 検出・インデックス未登録 | 102 | 全URLがHTTP 200。該当ブログ98記事は3,200字以上かつ本文内リンクあり。HTMLサイトマップを追加し、全記事へのクロール経路を短縮 |
| クロール済み・インデックス未登録 | 46 | 現行記事31件、サービス・カテゴリ3件、恒久転送11件、旧ビルドのフォント404が1件。カテゴリ本文と構造化データを強化し、重複記事を統合 |
| 見つかりませんでした（404） | 6 | 旧カテゴリ1件はすでに転送済み。旧記事5件へ内容が最も近い現行記事への恒久転送を追加 |
| 重複・正規ページ未選択 | 1 | `www`トップは現在apexへHTTP 308で恒久転送済み |

検索意図が重複していたGA4記事3本、DX記事2本、Shopify記事2本は、既存の正規候補へ統合した。統合元URLはHTTP 308で転送し、本文内リンク、ブログ一覧、カテゴリ一覧、XMLサイトマップから除外する。

ブログ記事には公開日と更新日を明示し、Article構造化データへ言語、カテゴリ、サイトとの関係を追加した。カテゴリページはカテゴリ名をH1とし、概要だけでなく実務トピックの解説とItemList構造化データを掲載する。

## 監査目的

Search Consoleでクロール対象外として確認されたURLを中心に、記事本文が見出し・表・箇条書きの列挙に偏り、読者の判断を助ける解説文が不足していないかを確認した。

## 評価基準

- Markdown記号を除く本文量
- 平文が本文全体に占める割合
- 平文1段落あたりの平均文字数
- 見出し数と箇条書き・表行数のバランス
- 「なぜ重要か」「どう選ぶか」「どう進めるか」「どう評価するか」の説明有無
- 公開年を含むタイトルなど、時間経過で陳腐化する表現

文字数のみでは品質を判断していない。表や箇条書きが多く総文字数が多い記事でも、項目間をつなぐ説明や判断基準が不足している場合はリライト対象とした。

## 全体結果

- 本番DBの記事数: 188
- 重点確認対象のブログ記事URL: 38
- 現行DBに存在する記事: 32
- 現行DBに存在しない旧URL: 6
- 第1バッチのリライト対象: 12

## クロール対象外URLの再診断

Search Consoleの除外理由ラベルは、確認環境がGoogleアカウントへ未ログインのため直接取得できなかった。公開URLをステータス、robots、canonical、sitemap、本文量で再診断した。

### 判明した技術要因

- 現行記事、カテゴリ、研修ページはHTTP 200、`index, follow`、sitemap掲載
- 記事詳細・カテゴリ・研修ページに自己参照canonicalが未設定
- 旧記事・旧カテゴリURLは以前404だったが、現在は内容が近い現行URLへHTTP 308で恒久転送
- `_next/static/media/...woff2`は過去ビルドで生成されたフォント資産のURLで、現在は404。検索対象コンテンツではないため対応不要

自己参照canonicalを記事詳細、ブログ一覧、カテゴリ、研修ページへ追加した。Open GraphのURLも正規URLに統一した。

### 判明したコンテンツ要因

- 表・箇条書き中心で、選定理由や実務判断の説明が不足する記事が複数存在
- `2025年最新`など、更新されていない年号タイトルが残存
- 事業再構築補助金を新規申請可能な現行制度として説明するなど、制度状況と本文が不一致
- リライト後も`updated_at`とsitemapの`lastModified`が更新されていなかった

制度記事3本を公式情報に基づいて全面改稿し、追加5記事へ判断基準の解説を加えた。リライト対象の`updated_at`を更新し、sitemapは`updated_at`を優先するよう修正した。

### 現行DBに存在しないURL

- `ga4-guide-2025`
- `bi-tool-introduction-guide`
- `image-generation-ai-guide`
- `bi-tool-guide`
- `remote-work-guide`
- `ab-test-practical-guide`

これらは本文リライトではなく、内容が最も近い現行記事への恒久リダイレクト（HTTP 308）を設定した。

| 旧URL | 転送先 |
|---|---|
| `ga4-guide-2025` | `ga4-guide` |
| `bi-tool-introduction-guide` | `bi-tools-guide` |
| `image-generation-ai-guide` | `image-generation-ai-business-guide` |
| `bi-tool-guide` | `bi-tools-guide` |
| `remote-work-guide` | `remote-work-implementation-guide` |
| `ab-test-practical-guide` | `lp-ab-test-guide` |

## 第1バッチ対象

| slug | 監査時の特徴 | 対応 |
|---|---|---|
| `sns-marketing-guide` | 平文比率19%。媒体情報と施策の列挙が中心 | 目的設計、媒体選定、投稿設計、効果測定の解説を追加 |
| `line-official-account-guide` | 機能説明が中心 | CRMとしての位置づけ、セグメント配信、友だち獲得、事業成果の測定を追加 |
| `landing-page-creation-guide` | 構成要素の列挙が中心 | 読者の意思決定、情報設計、制作要件、改善方法を追加 |
| `cross-border-ec-guide` | 平文比率23%。国・物流・決済情報の列挙が中心 | 市場選定、チャネル、着地原価、小規模検証の判断基準を追加 |
| `shopify-beginner-guide` | 設定手順が中心 | 運用設計、商品情報、配送採算、集客と再購入の説明を追加 |
| `github-copilot-guide` | 機能・コマンド紹介が中心 | 人の責任範囲、コンテキスト、指示設計、チームガバナンスを追加 |
| `paperless-implementation-guide` | 平文比率22%。制度・手順の列挙が中心 | 業務プロセス再設計、法令区分、部門間連携、効果測定を追加 |
| `bi-tools-guide` | 製品・グラフ紹介が中心 | 意思決定、選定条件、指標定義、定着運用の説明を追加 |
| `business-efficiency-tools-guide` | 平文比率21%。20製品のカタログ状態 | 部門別の選定観点、連携、定着、効果測定を追加 |
| `cms-comparison-guide` | 製品比較中心。タイトルに「2025年版」 | 運用体制・TCO・目的別判断を追加し、タイトルの年表記を削除 |
| `smb-web-marketing-strategy-50man` | 施策と予算表が中心 | ボトルネック、採算、評価期間、体制、拡大条件を追加 |
| `cvr-conversion-rate-guide` | 指標・施策の列挙が中心 | 定義統一、平均値の注意、診断、優先順位、分析方法を追加 |

## 第1バッチ更新結果

| slug | 本文量（更新前→更新後） | 平文比率（更新前→更新後） |
|---|---:|---:|
| `sns-marketing-guide` | 4,513→5,331字 | 19%→31% |
| `line-official-account-guide` | 5,847→6,506字 | 50%→55% |
| `landing-page-creation-guide` | 4,452→5,210字 | 43%→51% |
| `cross-border-ec-guide` | 6,196→6,913字 | 23%→31% |
| `shopify-beginner-guide` | 6,998→7,709字 | 48%→53% |
| `github-copilot-guide` | 4,667→5,411字 | 41%→49% |
| `paperless-implementation-guide` | 5,057→5,732字 | 22%→32% |
| `bi-tools-guide` | 5,536→6,229字 | 39%→46% |
| `business-efficiency-tools-guide` | 5,482→6,286字 | 21%→31% |
| `cms-comparison-guide` | 6,479→7,066字 | 33%→38% |
| `smb-web-marketing-strategy-50man` | 9,220→10,032字 | 40%→45% |
| `cvr-conversion-rate-guide` | 8,697→9,664字 | 39%→45% |

## リライト方針

既存の記事構造、表、チェックリスト、内部リンクは維持する。そのうえで主要なH2直下へ解説段落を追加し、情報を探す読者が自社で判断・実行できる内容へ変更する。

今回の更新では、根拠を確認できない新しい統計値や断定的な成果数値は追加しない。制度・料金・製品仕様など変更されやすい情報は、次回のファクトチェック対象として分離する。

## 次回バッチ候補

- `meo-optimization-guide`
- `marketing-automation-guide`
- `personal-data-protection-guide`
- `subsidy-comparison-guide`
- `small-business-subsidy-guide`
- `jigyou-saikouchiku-subsidy-guide`
- `ec-platform-comparison-guide`
- `btob-content-marketing-strategy`
- `ai-tools-complete-guide`
- `dx-strategy-guide`
- `smb-cyber-security-guide`

補助金、個人情報、セキュリティの記事は制度・法令の最新確認を伴うため、一般記事とは分けて更新する。

## 第2バッチ（サイト全体監査から追加）

重点URL以外にも、平文比率が低くカタログ型になっていた13記事を追加で補強した。

- `twitter-x-ads-guide`
- `zoom-business-guide`
- `freee-accounting-guide`
- `instagram-ads-guide`
- `sme-security-basics-guide`
- `youtube-ads-guide`
- `webinar-guide`
- `email-marketing-guide`
- `sme-ai-introduction-guide`
- `ga4-analytics-guide`
- `website-development-cost-guide`
- `ai-tools-complete-guide`
- `marketing-automation-guide`

広告記事には媒体機能の説明だけでなく、目的設計と効果測定の考え方を追加した。業務ツール・AI記事には、導入前の業務整理、組織利用時の管理、検証方法を追加した。ホームページ制作費用の記事はタイトルから古い年表記を削除した。
