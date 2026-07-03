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
              <svg className="footer-logo-icon" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="8,5 19,12 8,19" />
                <polygon points="3,5 8,8 8,16 3,19" />
              </svg>
              <span className="footer-logo-text">EMPLAY</span>
            </Link>
            <p className="footer-company-name">株式会社EMPLAY</p>
            <address className="footer-address">
              東京都渋谷区神宮前6丁目23番4号 2階
            </address>
          </div>

          {/* サイトマップ */}
          <div className="footer-nav-col">
            <div className="footer-nav-group">
              <h3 className="footer-nav-heading">Service</h3>
              <ul className="footer-nav-list">
                <li><Link href="/service">サービス一覧</Link></li>
                <li><Link href="/service/hp">HP制作</Link></li>
                <li><Link href="/service/ads">広告運用</Link></li>
                <li><Link href="/service/crm">CRM導入</Link></li>
                <li><a href="https://academy.emplay.jp/" target="_blank" rel="noopener noreferrer">AI ACADEMY</a></li>
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
              </ul>
            </div>
          </div>

          {/* お問い合わせCTA */}
          <div className="footer-cta-col">
            <p className="footer-cta-text">
              サービスに関するご相談、<br />
              お見積もりはお気軽にどうぞ。
            </p>
            <Link href="/contact" className="footer-cta-btn">
              お問い合わせ
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
