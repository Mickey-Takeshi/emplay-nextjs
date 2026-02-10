import Link from 'next/link'
import './Footer.css'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-content">
          <div className="footer-brand">
            <Link href="/" className="footer-logo">
              <svg className="footer-logo-icon" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="8,5 19,12 8,19" />
                <polygon points="3,5 8,8 8,16 3,19" />
              </svg>
              <span>株式会社EMPLAY</span>
            </Link>
          </div>

          <nav className="footer-nav">
            <ul className="footer-nav-list">
              <li><Link href="/">HOME</Link></li>
              <li><Link href="/company">COMPANY</Link></li>
              <li><Link href="/service">SERVICE</Link></li>
              <li><Link href="/news">NEWS</Link></li>
              <li><Link href="/contact">CONTACT</Link></li>
              <li><Link href="/careers">CAREERS</Link></li>
            </ul>
          </nav>
        </div>

        <div className="footer-bottom">
          <p className="copyright">
            &copy;{currentYear} EMPLAY
          </p>
        </div>
      </div>
    </footer>
  )
}
