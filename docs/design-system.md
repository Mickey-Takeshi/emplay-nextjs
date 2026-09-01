# EMPLAY デザインシステム（実装リファレンス）

最終更新: 2026-09-01 ／ 対象: `emplay.jp`（emplay-nextjs）

デザイン方針の「決定」は [サイト全体デザイン方針](design-renewal/site-wide-design-system-2026-09-01.md) にある。
本書はそれを **コードでどう表現しているか**（トークンの定義と使い方）を示す実装側の正本。

**大原則: トークンに無い値をCSSへ直接書かない。** 必要なら先に `app/globals.css` の `:root` へ追加する。

---

## 1. トークンの置き場所

| 対象 | ファイル |
|---|---|
| 全トークンの定義（唯一の正） | `app/globals.css` の `:root` |
| レスポンシブでの値の切り替え | 同ファイル内の `@media` 内 `:root` |
| ページ・コンポーネント固有のスタイル | 各 `*.css`（トークンを参照するだけ） |

値の分岐（PC / モバイルで余白が変わる等）も**トークン層に集約**する。各CSSは `var(--section-py)` を書くだけでよく、画面幅ごとの数値を知る必要がない。

---

## 2. カラー

### ブランド

| トークン | 値 | 用途 |
|---|---|---|
| `--color-primary` | `#1358D8` | 情報アクセント・リンク・英語ラベル |
| `--color-primary-dark` | `#08233F` | 濃色セクション（ネイビー） |
| `--color-primary-light` | `#377BE8` | フォーカスリング |
| `--color-primary-subtle` | `#F2F6FB` | primaryの薄い面 |
| `--color-cyan` | `#37BFD0` | 補助アクセント（白背景で使う） |
| `--color-cyan-on-dark` | `#79DEEB` | 補助アクセント（濃色背景用に明度を上げた値） |
| `--color-cta` / `--color-cta-hover` | `#DF2F4F` / `#C52243` | **主要CTAのみ**。それ以外に赤を使わない |
| `--color-academy` | `#0B5053` | EMPLAY AI ACADEMY帯の識別色 |
| `--color-success` | `#0A6F68` | 送信完了などの成功状態 |

### テキストと面

| トークン | 値 | 用途 |
|---|---|---|
| `--color-text` | `#0C1729` | 本文・見出し |
| `--color-text-light` | `#5A6677` | 説明文・補足 |
| `--color-text-muted` | `#738093` | さらに弱い補足 |
| `--color-bg` | `#FFFFFF` | 主背景 |
| `--color-bg-gray` | `#F3F6F8` | 薄背景セクション |
| `--color-bg-subtle` | `#F7F9FB` | 画像の下地などごく薄い面 |
| `--color-bg-band` | `#EEF2F5` | 問い合わせバンド |
| `--color-bg-dark` | `#061628` | 最も濃い面（フッター等） |
| `--color-border` | `#D8DEE6` | 罫線 |

### 濃色面の上に乗せる色

濃紺セクションでは白の透明度を都度指定せず、次を使う。

`--color-on-dark` / `--color-on-dark-muted`(70%) / `--color-on-dark-faint`(64%) / `--color-on-dark-border`(20%)

### オーバーレイ

`--overlay-hero`（ヒーローの白ウォッシュ）/ `--overlay-header` / `--overlay-header-scrolled` / `--overlay-caption`（画像上のキャプション帯）/ `--color-border-header`

> `#fff` の直書きのみ許容する（意味が一意で誤用が起きないため）。それ以外の色リテラルは使わない。

---

## 3. タイポグラフィ

### スケール（px固定）

**remを使わずpxで定義している。** ルートの `font-size` に依存させないことで、モバイルで文字が
9px台まで縮む問題を構造的に防ぐ（LLMO診断の指摘 P0-3 への対応）。

| トークン | 値 | 用途 |
|---|---|---|
| `--text-2xs` | 11px | **英語ラベル・eyebrow 専用** |
| `--text-xs` | 12px | 注記・メタ情報（日本語の最小） |
| `--text-sm` | 13px | 補足本文・表のセル |
| `--text-base` | 14px | 本文・リード文 |
| `--text-md` | 15px | やや大きい本文 |
| `--text-lg` | 17px | 小見出し |
| `--text-xl` | 21px | 見出し |
| `--text-2xl` | `clamp(23px, 2.4vw, 29px)` | 中見出し |
| `--text-3xl` | `clamp(27px, 3.1vw, 37px)` | セクション見出し |
| `--text-4xl` | `clamp(33px, 4.2vw, 51px)` | ページ見出し・ヒーロー |

**ルール**
1. **11px（`--text-2xs`）は英語ラベルにのみ使う。** 日本語は最小でも `--text-xs`（12px）。
2. 見出し（2xl以上）は `clamp()` で画面幅に追従するため、**`@media` での上書きは不要**。
3. 行間・字間もトークンを使う: `--leading-tight/heading/body/relaxed`、`--tracking-label`（英語ラベル）/`--tracking-wide`。

### フォントファミリー

`--font-ja`（Noto Sans JP系・既定）/ `--font-en`（Inter・英語ラベルとロゴ）

---

## 4. 余白とレイアウト

| トークン | PC | ≤1024px | ≤768px | 用途 |
|---|---|---|---|---|
| `--section-py` | 92px | 78px | 66px | セクションの上下余白 |
| `--spacing-xl` | 80px | 60px | 48px(≤540px) | 大きな塊の間隔 |
| `--spacing-lg` | 48px | — | 32px(≤540px) | |
| `--spacing-md` / `--spacing-sm` / `--spacing-xs` | 24 / 16 / 8px | | | 固定 |

| トークン | 値 | 用途 |
|---|---|---|
| `--container-width` | 1180px | 本文幅 |
| `--container-wide` | 1320px | ビジュアルを含む領域 |
| `--container-header` | 1280px | ヘッダー内側 |
| `--header-height` | 72px（≤768pxで60px） | 固定ヘッダーの高さ |

---

## 5. 角丸・影・モーション

- 角丸: `--radius-xs` 4px（入力欄）/ `--radius-sm` 5px（ボタン）/ `--radius-md` 8px（カード）/ `--radius-full`
  方針どおり**大きな角丸は使わない**。
- 影: `--shadow-sm` / `--shadow-md` / `--shadow-header`
- モーション: `--transition` 0.3s / `--transition-fast` 0.2s
  （`prefers-reduced-motion: reduce` で全アニメーションを無効化済み）

---

## 6. アクセシビリティ

- `--tap-min: 44px` — タップ領域の最小サイズ。ボタン・ナビ・CTAはこれを下回らない
- フォーカスは `:focus-visible` で `--color-primary-light` の2pxアウトラインを表示
- 日本語テキストの最小サイズは12px（§3のルール1）

---

## 7. ブレークポイント

正とする値は **540px / 768px / 1024px**。`--section-py` 等のトークンもこの3点で切り替える。

> **既知の負債**: 現状のCSSには 700 / 720 / 840 / 900 / 960 px の指定も残っている（リニューアル系は700px、
> 共通部は768pxで切り替わる）。表示は破綻しないが、700〜768pxの範囲でページごとに挙動が変わる。
> 次の整理対象。

---

## 8. 変更履歴

### 2026-09-01 デザインシステムの整理
- `:root` を用途別に再編し、**タイプスケール・セクション余白・コンテナ幅・角丸・タップ領域**のトークンを新設
- リニューアル系7ファイル（Home / Header / Footer / Service / ServiceDetail / Company / ServiceHp）の
  ハードコード値をトークンへ移行。**色リテラルは `#fff` を除きゼロ**
- 重複・未使用トークンを整理（`--color-bg-warm`＝`--color-bg-gray`、`--radius-lg`＝`--radius-md`、
  `--color-accent-light`・`--shadow-lg` は未使用のため削除。`--color-accent` は `--color-success` への
  非推奨エイリアスとして残置）
- 近似色を統合（`#8de7ef`→`--color-cyan-on-dark`、`#f7f9fb`/`#f8fafb`/`#f5f8fb`/`#f8fafc`→`--color-bg-subtle`、
  `#071526`→`--color-bg-dark`）
- モバイルの `html { font-size: 15px }` を撤去。タイプスケールをpx固定にしたため不要になり、
  **モバイル最小文字サイズが 9.3px → 11px**（日本語は12px以上）に改善
- 日本語が11pxで表示されていた箇所（料金表・プラン説明・機能リスト等 約90件）を12〜13pxへ引き上げ

### 未対応（次の整理対象）
1. ブレークポイントの統一（§7）
2. タップ領域44px未満の解消（トップ20件・ブログ35件。`--tap-min` は定義済み）
3. ブログ系CSS（`Blog.css` / `BlogDetail.css` 等・約1,500行）のトークン移行。
   現在もrem指定と独自グレーが残る
4. リニューアル系CSSはミニファイ状態のため可読性が低い。整形は差分が大きくなるため別作業とする
