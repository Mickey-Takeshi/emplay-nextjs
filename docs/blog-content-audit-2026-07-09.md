# ブログコンテンツ監査（2026-07-09）

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
