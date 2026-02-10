'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import './Header.css'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { path: '/', label: 'HOME' },
    { path: '/company', label: 'COMPANY' },
    { path: '/service', label: 'SERVICE' },
    { path: '/blog', label: 'BLOG' },
    { path: '/news', label: 'NEWS' },
    { path: '/careers', label: 'CAREERS' },
    { path: '/contact', label: 'CONTACT' },
  ]

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <header className="header">
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
                <Link
                  href={item.path}
                  className={`nav-link ${pathname === item.path ? 'active' : ''}`}
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
