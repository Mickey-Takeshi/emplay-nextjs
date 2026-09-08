# ChatGPT広告サービス追加方針・公開記録

> 対象: `emplay.jp` のサービス一覧、Web広告運用代行ページ、ブログ
>
> 作成日: 2026-09-08
>
> 起点となる依頼: ChatGPT広告の運用サービスを提供していることをサービス欄で明示し、検索流入を受ける解説記事を作成する
>
> 公式情報の確認日: 2026-09-08

## 1. 採用方針

ChatGPT広告を独立した第6サービスにはせず、既存の「Web広告運用代行」に含まれる新しい広告媒体として追加する。

理由は次の3点。

1. 提供価値が、媒体選定、配信設計、クリエイティブ制作、計測、改善という既存の広告運用サービスと共通している
2. `/service/ads` とは別に似たサービスページを作ると、内容が薄くなり、「ChatGPT広告運用代行」と「Web広告運用代行」の関係が利用者に伝わりにくい
3. ChatGPT Ads Managerは現在もベータ版で、対応国、入札方式、広告ポリシーなどが変わりやすい。既存ページ内の専用セクションなら、仕様変更に合わせて更新しやすい

検索流入の受け皿は、サービスページではなく新規記事 `/blog/chatgpt-ads-guide` が担う。記事から `/service/ads#chatgpt-ads` へ内部リンクし、情報収集から相談までをつなぐ。

## 2. 公式情報として確認できた前提

2026年9月8日時点で、OpenAI公式情報から次を確認した。

- 日本に所在し、請求を受ける法人はAds Managerのセルフサービスを利用できる
- 広告はChatGPTの回答とは分離され、広告であることが明示される
- 主な表示対象はFreeおよびGoプランで、Plus、Pro、Business、Enterprise、Eduと18歳未満と判定されたアカウントには表示されない
- 広告は回答の下に表示されることがあり、広告主名、ファビコン、タイトル、説明、ランディングページ、画像で構成される
- キャンペーン目的はCPM、CPC、コンバージョン最適化型CPCから選べる
- 日本の最低日予算は2,500円と案内されている
- 広告グループでは「コンテキストヒント」を設定する。ただし完全一致キーワードでも配信保証でもない
- コンバージョン計測にはOpenAI Pixel、Conversions API、または両方を利用できる
- 広告、画像、ランディングページのすべてがOpenAIの広告ポリシーと審査対象になる

参照先:

- [Ads Manager Availability](https://help.openai.com/en/articles/20001245-ads-manager-availability)
- [Ads in ChatGPT](https://help.openai.com/en/articles/20001047)
- [Ads in ChatGPT: The Basics](https://help.openai.com/en/articles/20001207-ads-in-chatgpt-the-basics)
- [Create Campaigns for ChatGPT Ads](https://help.openai.com/en/articles/20001210-create-campaig)
- [Create Ad Groups for ChatGPT Ads](https://help.openai.com/en/articles/20001211-create-ad-groups-for-chatgpt-ads)
- [Create Ads for ChatGPT Ads](https://help.openai.com/en/articles/20001212-create-ads-and-creative-variations)
- [Launch Campaigns](https://help.openai.com/en/articles/20001209)
- [Conversion Measurement](https://help.openai.com/en/articles/20001409-conversion-measurement)
- [Ad policies](https://openai.com/policies/ad-policies/)

## 3. サービス欄への反映範囲

### 3-1. サービス一覧 `/service`

既存のサービス名「Web広告運用代行」は維持し、説明文と補助ラベルでChatGPT広告対応を明示する。

掲載内容:

```text
Web広告運用代行

Google・Meta・LINE・ChatGPTなどの広告に対応。媒体選定から
配信設計、クリエイティブ、計測、継続改善まで必要な範囲をご提案します。

ChatGPT広告対応
```

カードのリンク先は従来どおり `/service/ads` とする。ChatGPT広告だけを探している利用者のために、リンク先ページ内では専用セクションへ移動できる目次リンクを設ける。

### 3-2. 広告運用ページ `/service/ads`

次の4箇所に反映した。

| 箇所 | 変更内容 | 目的 |
|---|---|---|
| title・description | ChatGPT広告対応を追加 | 指名検索と商業検索でサービス内容を明示 |
| ヒーロー本文 | 対応媒体にChatGPTを追加 | ファーストビューで対応を認識させる |
| 取り扱い広告媒体 | ChatGPT広告カードを追加 | Google広告等と同列の運用対象として示す |
| 専用セクション | `id="chatgpt-ads"` を新設 | 記事から意味のあるアンカーへ内部リンクする |

掲載title:

```text
Web広告運用代行｜ChatGPT・Google・Meta広告に対応
```

掲載description:

```text
ChatGPT、Google、Meta、LINEなどのWeb広告運用を支援。商材、目的、予算、計測環境を確認し、必要な運用内容を個別にご提案します。
```

ChatGPT広告カードの掲載文:

```text
ChatGPT広告

会話の文脈や利用者の検討意図に合わせて、ChatGPTの回答下に表示されることがある広告です。
掲載可否の確認から配信設計、広告制作、計測、改善まで、必要な範囲をご相談いただけます。

CPM / CPC / コンバージョン最適化
```

専用セクションでは、次の対応範囲を示した。標準範囲と追加見積りの区分は、既存のWeb広告運用代行の契約条件に合わせて明記している。

| 区分 | 対応候補 | 掲載方針 |
|---|---|---|
| 事前診断 | 広告掲載可否、ポリシー、商材、予算、LPの確認 | 無料相談で確認できる項目として示す |
| 運用の基本範囲 | キャンペーン、広告グループ、コンテキストヒント、入札・予算、レポーティング | 既存のWeb広告運用代行費を基準に個別見積り |
| 初期設定 | Ads Manager、UTM、OpenAI Pixelなど | 環境と実装範囲を確認して個別見積り |
| 追加制作・開発 | 広告画像、LP制作・改善、Conversions API | 標準運用費に含めず、必要な場合のみ別途見積り |

料金は、現行の`/service/ads`に掲載している「初期設定費5万円から」「運用代行費は広告費の20%、最低月額5万円」「バナー・LP制作は別料金」を基準とする。ただし、ChatGPT広告ではアカウント状況や計測方法によって初期作業が変わるため、確定金額は要問い合わせとする。

### 3-3. FAQ

以下の2問を追加した。

```text
Q. ChatGPT広告は日本から出稿できますか？
A. 2026年9月8日時点で、日本に所在し、請求を受ける法人はOpenAI Ads Managerのセルフサービスを利用できます。ただし、アカウント認証と広告審査があり、業種や広告内容によって掲載できない場合があります。

Q. ChatGPT広告だけでも依頼できますか？
A. ChatGPT広告単体の出稿・運用についてもご相談いただけます。商材、予算、ランディングページ、計測環境を確認し、対応可否、支援範囲、費用をご案内します。
```

表示中のFAQと`FaqJsonLd`の内容は必ず一致させる。

## 4. サービスとして約束する範囲

訴求は「新しい広告枠への早期参入」だけに寄せない。成果を左右するのは出稿操作より、会話文脈を想定した広告グループ、広告とランディングページの整合性、コンバージョン計測、継続的な検証であるため、既存の広告運用ノウハウと組み合わせて伝える。

掲載しない表現:

- 「ChatGPTの回答で自社が推奨される」
- 「特定の質問やキーワードで必ず表示される」
- 「先着企業だけが安く獲得できる」
- 「審査に必ず通る」
- 根拠のないCTR、CPC、CVR、CPAの相場

広告はChatGPTの回答と分離され、コンテキストヒントは配信を保証しない。SEO・AIO・LLMOと有料広告も別の施策として説明する。

## 5. SEO記事の設計

| 項目 | 内容 |
|---|---|
| slug | `chatgpt-ads-guide` |
| title / H1 | `ChatGPT広告とは？仕組み・料金・日本での出稿手順を解説` |
| 主軸キーワード | ChatGPT広告 |
| 副キーワード | チャットGPT 広告、ChatGPT広告 料金、ChatGPT広告 出稿、ChatGPT広告 運用代行 |
| 検索意図 | KnowからDo。仕組みを理解し、自社で試すか運用を依頼するか判断したい |
| 想定読者 | 新しい広告媒体を調査している事業責任者、Web広告担当者、EC・SaaS・教育・地域サービスの担当者 |
| 読後の状態 | 出稿条件、料金方式、設定手順、計測方法、向き不向きを理解し、次の準備に着手できる |
| カテゴリ | マーケティング |
| CTA | `/service/ads#chatgpt-ads` |
| 更新責任 | 月1回、OpenAIの提供国、最低予算、目的、広告仕様、ポリシーを確認 |

記事原稿は [chatgpt-ads-guide.md](./drafts/chatgpt-ads-guide.md) に作成した。

## 6. 内部リンク計画

新規記事から次へリンクしている。

- `/service/ads#chatgpt-ads`
- `/blog/web-ads-types-comparison`
- `/blog/web-ads-budget-planning`
- `/blog/ad-legal-compliance-guide`
- `/blog/roas-improvement-strategies`
- `/blog/generative-ai-marketing-guide`

次の既存記事から新規記事へ1本ずつ文脈リンクを追加した。

- `web-ads-types-comparison`: 広告媒体の比較対象として追加
- `web-ads-budget-planning`: テスト予算の新しい配分先として追加
- `generative-ai-marketing-guide`: 「生成AIを使う広告制作」ではなく「生成AIサービス内へ出稿する広告」として違いを説明
- `display-ads-operation-guide`: 会話文脈に合わせた配信面の比較として追加（2026年9月8日に本番データ上の実在を確認済み）

新規記事は公開時点で既存記事からの文脈に沿った内部リンク4本を確保し、孤立を防いでいる。

## 7. 公開実施内容

1. サービス追加方針と訴求文を確定した
2. ChatGPT広告の運用受託体制、料金表示、問い合わせ後の担当フローを確認した
3. 専用のサムネイル画像を制作し、`public/images/blog/chatgpt-ads-guide.webp`へ配置した
4. 記事をSupabaseマイグレーションへ変換した
5. `/service`と`/service/ads`を実装した
6. 既存4記事へ内部リンクを追加した
7. 内容・リンク・構造化データ・モバイル表示をレビューした
8. SupabaseとVercelへ反映した
9. 本番でHTTP 200、canonical、Article、FAQPage、sitemap、内部リンクを実測した

## 8. 公開条件

次の条件で2026年9月8日に公開した。

- ChatGPT広告の運用代行を受注可能な正式サービスとして掲載する
- 料金は既存のWeb広告運用料金を基準とし、ChatGPT広告の確定金額は要問い合わせとする
- アカウント準備、配信設計、運用、レポーティングを基本範囲とする
- OpenAI Pixelは環境を確認して初期設定費を見積もり、Conversions API、広告画像、LP制作・改善は別途見積りとする
- 無料相談では、商材URL、対象顧客、月額広告予算、目標、計測環境を確認して対応可否と概算を案内する

## 9. 公開後の情報更新

提供地域、最低日予算、広告仕様、計測仕様、広告ポリシーは変更頻度が高いため、コンテンツ運用担当が公開後1か月ごとにOpenAI公式情報を再確認する。次回確認期限は2026年10月8日とし、変更があった場合は記事本文・FAQ・サービスページ・更新日を同時に更新する。

定期確認日を待たずに更新する条件:

- Ads Managerの日本向け提供条件が変わった
- JPYの最低日予算または課金方式が変わった
- 広告フォーマット、コンテキストヒント、計測仕様が変わった
- OpenAIの広告ポリシーで対象業種や表現の扱いが変わった
