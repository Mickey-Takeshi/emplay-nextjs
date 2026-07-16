import Link from 'next/link'
import './Footer.css'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-grid">
          {/* ブランド情報 */}
          <div className="footer-brand-col">
            <Link href="/" className="footer-logo">
              <svg className="footer-logo-icon" viewBox="0 0 48 48" fill="currentColor" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round">
                <polygon points="11.7,13.4 25.833,24 11.7,34.6" />
                <polygon points="22.7,13.4 36.833,24 22.7,34.6" />
              </svg>
              <span className="footer-logo-text">EMPLAY</span>
            </Link>
            <p className="footer-company-name">株式会社EMPLAY</p>
            <address className="footer-address">
              東京都渋谷区神宮前6丁目23番4号<br />
              桑野ビル2階
            </address>
            <p className="footer-company-meta">代表取締役 三木 剛／2023年12月設立</p>
          </div>

          {/* サイトマップ */}
          <div className="footer-nav-col">
            <div className="footer-nav-group">
              <h3 className="footer-nav-heading">Service</h3>
              <ul className="footer-nav-list">
                <li><Link href="/service">サービス一覧</Link></li>
                <li><Link href="/service/hp">HP制作サービス</Link></li>
                <li><Link href="/service/creative">クリエイティブ制作</Link></li>
                <li><Link href="/service/ads">Web広告運用</Link></li>
                <li><Link href="/service/crm">CRM導入支援</Link></li>
                <li><a href="https://academy.emplay.jp/" target="_blank" rel="noopener noreferrer" aria-label="AI ACADEMY（新しいタブで開く）">AI ACADEMY ↗</a></li>
              </ul>
            </div>
            <div className="footer-nav-group">
              <h3 className="footer-nav-heading">Company</h3>
              <ul className="footer-nav-list">
                <li><Link href="/company">会社概要</Link></li>
                <li><Link href="/news">ニュース</Link></li>
                <li><Link href="/blog">ブログ</Link></li>
                <li><Link href="/careers">採用情報</Link></li>
                <li><Link href="/privacy">プライバシーポリシー</Link></li>
                <li><Link href="/site-map">サイトマップ</Link></li>
              </ul>
            </div>
          </div>

          {/* お問い合わせCTA */}
          <div className="footer-cta-col">
            <p className="footer-cta-text">
              Web・AI活用の課題整理から、<br />
              無料でご相談いただけます。
            </p>
            <Link href="/contact" className="footer-cta-btn">
              無料相談を申し込む
            </Link>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">
            &copy;{currentYear} EMPLAY Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
