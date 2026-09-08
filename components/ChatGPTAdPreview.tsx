import './ChatGPTAdPreview.css'

type ChatGPTAdPreviewProps = {
  showHeading?: boolean
}

export default function ChatGPTAdPreview({ showHeading = true }: ChatGPTAdPreviewProps) {
  return (
    <figure className="chatgpt-ad-preview" aria-label="ChatGPTの回答下に表示される広告のイメージ">
      {showHeading && (
        <div className="chatgpt-ad-preview__intro">
          <p className="chatgpt-ad-preview__label">DISPLAY EXAMPLE</p>
          <h3>ChatGPT広告の表示イメージ</h3>
          <p>回答本文とは別の広告枠として、広告主名・広告表記・見出し・説明文・画像などが表示されます。</p>
        </div>
      )}

      <div className="chatgpt-ad-preview__layout">
        <div className="chatgpt-ad-preview__screen">
          <div className="chatgpt-ad-preview__screen-bar" aria-hidden="true">
            <span></span><span></span><span></span>
          </div>
          <div className="chatgpt-ad-preview__conversation">
            <p className="chatgpt-ad-preview__question">新しいWeb広告の選択肢を比較したい</p>
            <div className="chatgpt-ad-preview__answer">
              <span className="chatgpt-ad-preview__answer-mark" aria-hidden="true">A</span>
              <p>目的や対象顧客、予算、計測環境を整理し、既存の検索広告やSNS広告と比較して検討しましょう。</p>
            </div>

            <div className="chatgpt-ad-preview__ad">
              <div className="chatgpt-ad-preview__ad-meta">
                <span className="chatgpt-ad-preview__favicon" aria-hidden="true">E</span>
                <span className="chatgpt-ad-preview__advertiser">EMPLAY（表示例）</span>
                <span className="chatgpt-ad-preview__sponsored">広告</span>
                <span className="chatgpt-ad-preview__menu" aria-hidden="true">•••</span>
              </div>
              <div className="chatgpt-ad-preview__ad-body">
                <div className="chatgpt-ad-preview__copy">
                  <strong>ChatGPT広告を、設計から改善まで</strong>
                  <span>掲載可否の確認、配信設計、計測、継続改善を一貫して支援します。</span>
                  <span className="chatgpt-ad-preview__url">emplay.jp/service/ads</span>
                </div>
                <img
                  src="/images/renewal/service-ads-square.webp"
                  alt=""
                  loading="lazy"
                  decoding="async"
                  width="1050"
                  height="1050"
                />
              </div>
            </div>
          </div>
        </div>

        <ol className="chatgpt-ad-preview__points">
          <li><span>01</span><div><strong>回答とは別枠</strong><p>広告はChatGPTの回答本文と分離して表示されます。</p></div></li>
          <li><span>02</span><div><strong>広告であることを明示</strong><p>広告主名と広告表記が付き、通常の回答と区別できます。</p></div></li>
          <li><span>03</span><div><strong>訴求と画像を掲載</strong><p>見出し、説明文、画像から商品の価値を伝えます。</p></div></li>
          <li><span>04</span><div><strong>LPへ誘導</strong><p>広告をクリックすると、設定したランディングページへ移動します。</p></div></li>
        </ol>
      </div>

      <figcaption>
        2026年9月8日時点の
        <a href="https://help.openai.com/en/articles/20001207-ads-in-chatgpt-the-basics" target="_blank" rel="noopener noreferrer">OpenAI公式仕様</a>
        をもとにEMPLAYが作成したイメージです。実際の表示位置やデザインは変更される場合があります。
      </figcaption>
    </figure>
  )
}
