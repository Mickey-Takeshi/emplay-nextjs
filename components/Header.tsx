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

  useEffect(() => {
    if (!isMenuOpen) return

    const previousOverflow = document.body.style.overflow
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMenuOpen(false)
    }

    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isMenuOpen])

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
          <svg className="logo-icon" viewBox="0 0 48 48" fill="currentColor" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round">
            <polygon points="11.7,13.4 25.833,24 11.7,34.6" />
            <polygon points="22.7,13.4 36.833,24 22.7,34.6" />
          </svg>
          <span className="logo-text">EMPLAY</span>
        </Link>

        <button
          className={`menu-toggle ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label={isMenuOpen ? 'メニューを閉じる' : 'メニューを開く'}
          aria-expanded={isMenuOpen}
          aria-controls="global-navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav id="global-navigation" className={`nav ${isMenuOpen ? 'open' : ''}`} aria-label="メインナビゲーション">
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
                    aria-current={pathname === item.path || (item.path !== '/' && pathname.startsWith(item.path)) ? 'page' : undefined}
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
