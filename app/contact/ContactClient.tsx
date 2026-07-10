'use client'

import { useState, useEffect, useRef, FormEvent } from 'react'
import Link from 'next/link'
import { submitContact, ContactFormData } from '@/lib/supabase'
import { trackEvent } from '@/lib/analytics'
import Breadcrumb from '@/components/Breadcrumb'
import './Contact.css'

export default function ContactClient() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
  })
  const [honeypot, setHoneypot] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const startedRef = useRef(false)

  // フォーム表示イベント（ファネル計測の起点）
  useEffect(() => {
    trackEvent('form_view', { form: 'contact' })
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    // 最初の入力時に1回だけ form_start を送る
    if (!startedRef.current) {
      startedRef.current = true
      trackEvent('form_start', { form: 'contact' })
    }
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      if (honeypot) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', company: '', phone: '', message: '' })
        return
      }

      await submitContact(formData)
      setSubmitStatus('success')
      trackEvent('form_submit', { form: 'contact' })
      setFormData({ name: '', email: '', company: '', phone: '', message: '' })
    } catch (error) {
      setSubmitStatus('error')
      trackEvent('form_error', { form: 'contact' })
      console.error('Contact form submission failed:', error)
      setErrorMessage(
        '送信に失敗しました。時間をおいて再度お試しいただくか、解決しない場合はお手数ですがメールにてご連絡ください。'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="contact-page">
      {/* ヒーロー */}
      <section className="contact-hero">
        <div className="contact-hero-bg" aria-hidden="true"></div>
        <div className="contact-hero-content">
          <p className="contact-hero-label">CONTACT</p>
          <h1 className="contact-hero-title">お問い合わせ</h1>
        </div>
      </section>

      <Breadcrumb items={[{ label: 'CONTACT' }]} />

      {/* 2カラムレイアウト */}
      <section className="contact-main">
        <div className="container">
          <div className="contact-grid">
            {/* 左カラム：情報 */}
            <div className="contact-info">
              <h2 className="contact-info-heading">お気軽にご相談ください</h2>
              <p className="contact-info-text">
                サービスに関するご質問、お見積り依頼など、お気軽にお問い合わせください。
              </p>

              <div className="contact-info-items">
                <div className="contact-info-item">
                  <div className="contact-info-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div>
                    <h3>対応時間</h3>
                    <p>平日 10:00 - 18:00</p>
                  </div>
                </div>
                <div className="contact-info-item">
                  <div className="contact-info-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  <div>
                    <h3>返信目安</h3>
                    <p>通常1営業日以内</p>
                  </div>
                </div>
                <div className="contact-info-item">
                  <div className="contact-info-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div>
                    <h3>相談無料</h3>
                    <p>初回相談は無料です</p>
                  </div>
                </div>
              </div>

              {/* お問い合わせ後の流れ */}
              <div className="contact-flow">
                <h3 className="contact-flow-title">お問い合わせ後の流れ</h3>
                <ol className="contact-flow-steps">
                  <li>
                    <span className="contact-flow-num">1</span>
                    <span className="contact-flow-text"><strong>ご返信</strong>／担当者が内容を確認し、1営業日以内にご連絡します</span>
                  </li>
                  <li>
                    <span className="contact-flow-num">2</span>
                    <span className="contact-flow-text"><strong>ヒアリング</strong>／オンライン等で課題・ご要望をお伺いします</span>
                  </li>
                  <li>
                    <span className="contact-flow-num">3</span>
                    <span className="contact-flow-text"><strong>ご提案</strong>／最適なプランとお見積りをご提示します</span>
                  </li>
                </ol>
              </div>
            </div>

            {/* 右カラム：フォーム */}
            <div className="contact-form-wrapper">
              {submitStatus === 'success' ? (
                <div className="submit-success">
                  <div className="success-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                  <h2>送信が完了しました</h2>
                  <p>
                    お問い合わせありがとうございます。<br />
                    内容を確認のうえ、<strong>通常1営業日以内</strong>に担当者よりご連絡いたします。
                  </p>
                  <p className="submit-success-sub">ご返信までの間、こちらもご覧ください。</p>
                  <div className="submit-success-links">
                    <Link href="/service">サービス一覧を見る</Link>
                    <Link href="/blog">お役立ち記事を読む</Link>
                    <Link href="/company">会社概要を見る</Link>
                  </div>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <p className="form-note"><span className="required-mark">*</span> は必須項目です</p>

                  <div className="form-group">
                    <label htmlFor="name" className="form-label">
                      お名前<span className="required-mark">*</span>
                    </label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="form-input" placeholder="山田 太郎" />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email" className="form-label">
                      メールアドレス<span className="required-mark">*</span>
                    </label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="form-input" placeholder="example@email.com" />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="company" className="form-label">会社名</label>
                      <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} className="form-input" placeholder="株式会社〇〇" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone" className="form-label">電話番号</label>
                      <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="form-input" placeholder="03-1234-5678" />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message" className="form-label">
                      お問い合わせ内容<span className="required-mark">*</span>
                    </label>
                    <textarea id="message" name="message" value={formData.message} onChange={handleChange} required className="form-textarea" rows={5} placeholder="お問い合わせ内容をご記入ください" />
                  </div>

                  {/* ハニーポット */}
                  <div style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, overflow: 'hidden' }} aria-hidden="true">
                    <label htmlFor="website">Website</label>
                    <input type="text" id="website" name="website" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} tabIndex={-1} autoComplete="off" />
                  </div>

                  {submitStatus === 'error' && (
                    <div className="form-error">
                      <p>{errorMessage || '送信中にエラーが発生しました。もう一度お試しください。'}</p>
                    </div>
                  )}

                  <div className="form-actions">
                    <p className="form-consent">
                      <Link href="/privacy">プライバシーポリシー</Link>
                      に同意の上、送信してください。
                    </p>
                    <p className="form-actions-note">初回相談は無料・通常1営業日以内に返信／無理な営業はいたしません</p>
                    <button type="submit" className="btn btn-primary btn-large form-submit-btn" disabled={isSubmitting}>
                      {isSubmitting ? '送信中...' : '無料相談を送信する'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
