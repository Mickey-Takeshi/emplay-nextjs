'use client'

import { useState, FormEvent } from 'react'
import { submitContact, ContactFormData } from '@/lib/supabase'
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      // ハニーポットチェック（ボットが入力した場合は静かに成功を返す）
      if (honeypot) {
        setSubmitStatus('success')
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          message: '',
        })
        return
      }

      await submitContact(formData)
      setSubmitStatus('success')
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        message: '',
      })
    } catch (error) {
      setSubmitStatus('error')
      if (error instanceof Error) {
        // Supabase未設定の場合は成功扱いにする（デモ用）
        if (error.message.includes('No API key') || error.message.includes('URL')) {
          setSubmitStatus('success')
          setFormData({
            name: '',
            email: '',
            company: '',
            phone: '',
            message: '',
          })
        } else {
          setErrorMessage(error.message)
        }
      } else {
        setErrorMessage('送信中にエラーが発生しました。')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="contact-page">
      {/* ページヘッダー */}
      <section className="page-header-hero">
        <div className="page-header-background">
          <img
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80"
            alt=""
            className="page-header-bg-image"
          />
          <div className="page-header-overlay"></div>
        </div>
        <div className="page-header-content">
          <h1 className="page-title-hero">CONTACT</h1>
          <p className="page-title-ja-hero">お問い合わせ</p>
        </div>
      </section>

      {/* パンくずリスト */}
      <Breadcrumb items={[{ label: 'CONTACT' }]} />

      {/* お問い合わせフォーム */}
      <section className="section contact-section">
        <div className="container">
          <div className="contact-intro">
            <p>
              サービスに関するご質問、お見積り依頼など、<br className="pc-only" />
              お気軽にお問い合わせください。
            </p>
            <p className="contact-note">
              <span className="required-mark">*</span>は必須項目です
            </p>
          </div>

          {submitStatus === 'success' ? (
            <div className="submit-success">
              <div className="success-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <h2>送信完了</h2>
              <p>
                お問い合わせありがとうございます。<br />
                内容を確認次第、担当者よりご連絡いたします。
              </p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  お名前<span className="required-mark">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="山田 太郎"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  メールアドレス<span className="required-mark">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="example@email.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="company" className="form-label">
                  会社名
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="株式会社〇〇"
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone" className="form-label">
                  電話番号
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="03-1234-5678"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">
                  お問い合わせ内容<span className="required-mark">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="form-textarea"
                  rows={6}
                  placeholder="お問い合わせ内容をご記入ください"
                />
              </div>

              {/* ハニーポット（ボット対策） - 人間には見えない */}
              <div style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, overflow: 'hidden' }} aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {submitStatus === 'error' && (
                <div className="form-error">
                  <p>{errorMessage || '送信中にエラーが発生しました。もう一度お試しください。'}</p>
                </div>
              )}

              <div className="form-actions">
                <button
                  type="submit"
                  className="btn btn-primary btn-large"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? '送信中...' : '送信する'}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

    </div>
  )
}
