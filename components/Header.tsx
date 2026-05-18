'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import './Header.css'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems: { path: string; label: string; external?: boolean }[] = [
    { path: '/service', label: 'SERVICE' },
    { path: '/company', label: 'COMPANY' },
    { path: '/blog', label: 'BLOG' },
    { path: '/news', label: 'NEWS' },
  ]

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const isHome = pathname === '/'

  return (
    <header className={`header ${isScrolled || !isHome ? 'header-scrolled' : 'header-transparent'} ${isMenuOpen ? 'header-menu-open' : ''}`}>
      <div className="header-inner">
        <Link href="/" className="logo" onClick={closeMenu}>
          <svg className="logo-icon" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="8,5 19,12 8,19" />
            <polygon points="3,5 8,8 8,16 3,19" />
          </svg>
          <span className="logo-text">EMPLAY</span>
        </Link>

        <button
          className={`menu-toggle ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="メニューを開く"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
          <ul className="nav-list">
            {navItems.map((item) => (
              <li key={item.path} className="nav-item">
                {item.external ? (
                  <a
                    href={item.path}
                    className="nav-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMenu}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    href={item.path}
                    className={`nav-link ${pathname === item.path || (item.path !== '/' && pathname.startsWith(item.path)) ? 'active' : ''}`}
                    onClick={closeMenu}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
            <li className="nav-item nav-item-cta">
              <Link
                href="/contact"
                className="nav-cta-btn"
                onClick={closeMenu}
              >
                お問い合わせ
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
