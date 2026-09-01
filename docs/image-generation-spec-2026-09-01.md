# 画像生成仕様書（2026-09-01）

対象サイト: `emplay.jp` ／ 出力先: `/Users/takes/emplay-nextjs/public/images/renewal/`
背景: [デザインレビュー §2](design-review-2026-09-01.md) — 現行画像が全て3:2固定で、枠との比率差が最大43%の余白になっている。

---

## 0. 作業の要点

- **モチーフは変えない。** 既存12枚の画づら（構図・登場物）は方針書どおりで問題ない。**縦横比だけを作り直す。**
- 追加生成は **11枚**（新規モチーフ2枚 + 比率違い9枚）。
- 併せて **モバイル派生（幅960px）を全点** 出力する。

---

## 1. 共通の作画ルール（全点に適用）

既存12枚と**同じ絵柄**に揃えること。破ると1枚だけ浮く。

| 項目 | 指定 |
|---|---|
| 画法 | アイソメトリック（等角投影）のフラットイラスト。細い均一線 |
| 背景 | **純白 `#FFFFFF`**（透明不可・グラデーション不可） |
| 主色 | 濃紺 `#08233F` / コバルト `#1358D8` / 明るい青 `#377BE8` |
| 補助色 | シアン `#37BFD0` / 赤 `#DF2F4F`（**赤は差し色として全体の5%以内**） |
| グレー | `#D8DEE6`（罫線・補助面） |
| 人物 | 濃紺・青系の服。**顔の描き込みは最小限**。多様な性別・年齢を含める |
| 禁止 | **文字・数字・ロゴ・UIラベルを一切描かない**（多言語化とブランド保護のため） |
| 禁止 | 写真表現、3Dレンダリング、影の強いドロップシャドウ、紫系グラデーション |
| 余白 | 画面端から5%は要素を置かない（トリミング耐性） |

**共通プロンプト接頭辞**（各プロンプトの先頭に付ける）:

```
Isometric flat vector illustration, thin uniform line work, pure white background,
color palette limited to deep navy #08233F, cobalt blue #1358D8, light blue #377BE8,
cyan #37BFD0, light gray #D8DEE6, with red #DF2F4F used sparingly as an accent under 5%.
Business illustration for a Japanese corporate website. Clean, calm, professional.
No text, no numbers, no letters, no logos, no UI labels anywhere in the image.
People wear navy and blue clothing with minimal facial detail.
Keep all elements within the central 90% of the frame.
```

**共通ネガティブ**:
```
text, letters, numbers, logo, watermark, signature, UI labels, photorealistic, 3D render,
heavy drop shadow, purple gradient, neon, cluttered, busy background, cropped elements
```

---

## 2. 生成が必要な画像

### 2-1. ワイド帯（比率 2.6:1）— 最優先

`/service` のサービス5行で使う。**現状43%が余白**で最も影響が大きい。

出力サイズ: **1560 × 600 px**（モバイル派生 960 × 369 px）

| # | ファイル名 | モチーフ | プロンプト（共通接頭辞に続けて記述） |
|---|---|---|---|
| 1 | `service-hp-wide.webp` | 情報設計と実装 | `A horizontal composition showing website structure being assembled: stacked page layers on the left separating into wireframe blocks, connected by thin lines to a finished responsive site on the right shown on desktop and phone frames.` |
| 2 | `service-creative-wide.webp` | 制作工程 | `A horizontal overhead view of a design workspace: color swatch cards, a tablet with a stylus, banner layout boards, and a camera arranged left to right along a work surface.` |
| 3 | `service-ads-wide.webp` | 流入と最適化 | `A horizontal funnel flowing left to right: many small user icons entering on the left, passing through two filtering rings in the middle, converging into a rising bar chart on the right.` |
| 4 | `service-crm-wide.webp` | 顧客接点 | `A horizontal customer journey path: connected nodes running left to right representing inquiry, email, chat and repeat purchase, orbiting a central customer database cylinder.` |
| 5 | `service-academy-wide.webp` | 実践学習 | `A horizontal training scene: an instructor standing at the left beside a presentation board, and participants seated at long desks with laptops extending to the right.` |

### 2-2. 縦長パネル（比率 1.15:1）

分割レイアウトの左半分で使う。現状24%が余白。

出力サイズ: **1200 × 1040 px**（モバイル派生 960 × 832 px）

| # | ファイル名 | モチーフ | プロンプト |
|---|---|---|---|
| 6 | `process-tall.webp` | 課題整理→設計→制作→運用 | `A vertically oriented four-stage process: four connected isometric platforms stacked diagonally from lower left to upper right, showing discovery, design, build and improvement, linked by thin dotted lines.` |
| 7 | `ecosystem-tall.webp` | 5領域をつなぐ事業基盤 | `A vertically oriented business platform: a central hub plate with five smaller connected plates arranged around and above it, representing website, advertising, creative, CRM and AI training, joined by thin lines.` |

### 2-3. 近正方形カード（比率 1.05:1）

トップのモザイクカード3枚。現状24〜32%が余白。

出力サイズ: **1100 × 1050 px**（モバイル派生 960 × 916 px）

| # | ファイル名 | モチーフ | プロンプト |
|---|---|---|---|
| 8 | `service-ads-square.webp` | 流入と最適化 | `A compact square composition of an advertising optimization system: a funnel above a small bar chart, with user icons entering from the upper left.` |
| 9 | `service-crm-square.webp` | 顧客接点 | `A compact square composition of a customer database: a central cylinder with four connected touchpoint nodes arranged around it.` |
| 10 | `service-academy-square.webp` | 実践学習 | `A compact square composition of a workshop: participants seated around a circular table with laptops, and a presentation board behind them.` |

### 2-4. ヒーロー横長（比率 2:1）

トップのヒーロー。現在は3:2を `cover` で切っており上下が23%失われている。

出力サイズ: **2400 × 1200 px**（モバイル派生 1200 × 600 px）

| # | ファイル名 | モチーフ | プロンプト |
|---|---|---|---|
| 11 | `home-hero-wide.webp` | 事業を支える基盤の全景 | `A wide panoramic isometric landscape of a small business being supported: a central office platform connected by thin lines to a website panel, an advertising chart, a customer database and a training room, arranged across the width. Leave the left 40% visually calm so overlaid text stays readable.` |

> **重要**: 11番は左40%にテキストが重なる。**主要な描画物を右60%に寄せ、左側は薄い罫線程度に留めること。**

---

## 3. 納品要件

| 項目 | 指定 |
|---|---|
| 形式 | **WebP**（品質80〜85） |
| 命名 | 上表のファイル名どおり。モバイル派生は `<名前>-sm.webp` |
| 出力先 | `/Users/takes/emplay-nextjs/public/images/renewal/` |
| 1枚あたり | **200KB以下**（超える場合は品質を落とす） |
| 派生 | 全点にモバイル用（幅960px、ヒーローのみ1200px）を作る |
| 既存12枚 | **削除しない**（3:2の枠で使い続ける箇所があるため） |

---

## 4. 生成後にコード側で行う対応

画像を置いただけでは反映されない。以下をセットで行う。

1. `app/service/ServiceClient.tsx` の5行の画像を `*-wide.webp` に差し替え
2. `app/HomeClient.tsx` のモザイクカードを `*-square.webp` に差し替え、ヒーローを `home-hero-wide.webp` へ
3. 分割レイアウト（process / ecosystem）を `*-tall.webp` へ差し替え
4. `<img>` に `srcset` を追加してモバイル派生を出し分ける
   例: `srcset="/images/renewal/service-hp-wide-sm.webp 960w, /images/renewal/service-hp-wide.webp 1560w" sizes="(max-width: 768px) 100vw, 560px"`
5. 差し替え後、各枠の余白率が10%未満になったことを実測で確認する

---

## 5. 今回作らないもの（判断の記録）

- `company.webp` / `careers.webp` / `contact.webp` / `news.webp`（1774×887＝2:1、`cover` 配置）は
  **枠と比率が合っており余白の問題がない**ため作り直さない
- `service-creative.webp`（枠1.43 / 余白5%）と `process.webp`（トップ・枠1.44 / 余白4%）も現状のままでよい
