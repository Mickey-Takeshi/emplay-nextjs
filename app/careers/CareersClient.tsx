'use client'

import { useState } from 'react'
import Link from 'next/link'
import { submitJobApplication, JobApplicationData } from '@/lib/supabase'
import Breadcrumb from '@/components/Breadcrumb'
import './Careers.css'

export default function CareersClient() {
  const [formData, setFormData] = useState<JobApplicationData>({
    name: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      await submitJobApplication(formData)
      setSubmitStatus('success')
      setFormData({
        name: '',
        email: '',
        phone: '',
        position: '',
        experience: '',
        message: '',
      })
    } catch (error) {
      console.error('応募送信エラー:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="careers-page">
      {/* ページヘッダー */}
      <header className="page-header-hero" aria-label="ページヘッダー">
        <div className="page-header-background" aria-hidden="true">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80"
            alt=""
            className="page-header-bg-image"
            loading="eager"
          />
          <div className="page-header-overlay"></div>
        </div>
        <div className="page-header-content">
          <h1 className="page-title-hero">CAREERS</h1>
          <p className="page-title-ja-hero">採用情報</p>
        </div>
      </header>

      {/* パンくずリスト */}
      <Breadcrumb items={[{ label: 'CAREERS' }]} />

      {/* メッセージセクション */}
      <section className="section careers-message-section">
        <div className="container">
          <h2 className="section-title-center">JOIN OUR TEAM</h2>
          <p className="section-subtitle-center">一緒に「わくわく」を創りませんか？</p>

          <div className="careers-message-content">
            <p>
              EMPLAYは、「社会にもっとわくわくを創り続ける」をミッションに掲げ、
              DX推進やウェブマーケティング、コンテンツ制作を通じて企業の成長を支援しています。
            </p>
            <p>
              私たちは常に新しい挑戦を恐れず、クライアントと共に成長できる仲間を求めています。
              経験やスキルよりも、「わくわく」する気持ちを大切にできる方、ぜひご応募ください。
            </p>
          </div>
        </div>
      </section>

      {/* 募集職種セクション */}
      <section className="section careers-positions-section">
        <div className="container">
          <h2 className="section-title-center">POSITIONS</h2>
          <p className="section-subtitle-center">募集職種</p>

          <div className="positions-grid">
            <article className="position-card">
              <h3 className="position-title">ウェブマーケター</h3>
              <p className="position-type">正社員 / 業務委託</p>
              <p className="position-description">
                リスティング広告、SNS広告の運用、SEO対策など、
                デジタルマーケティング全般をお任せします。
              </p>
              <ul className="position-requirements">
                <li>広告運用経験1年以上</li>
                <li>データ分析が好きな方</li>
                <li>クライアントとのコミュニケーションが得意な方</li>
              </ul>
            </article>

            <article className="position-card">
              <h3 className="position-title">コンテンツディレクター</h3>
              <p className="position-type">正社員 / 業務委託</p>
              <p className="position-description">
                記事コンテンツの企画・制作、ライターのディレクション、
                品質管理をお任せします。
              </p>
              <ul className="position-requirements">
                <li>編集・ライティング経験2年以上</li>
                <li>SEOの基礎知識がある方</li>
                <li>チームマネジメント経験がある方歓迎</li>
              </ul>
            </article>

            <article className="position-card">
              <h3 className="position-title">ウェブエンジニア</h3>
              <p className="position-type">業務委託</p>
              <p className="position-description">
                Webサイト・Webアプリケーションの設計・開発、
                既存システムの保守・改善をお任せします。
              </p>
              <ul className="position-requirements">
                <li>フロントエンド開発経験2年以上</li>
                <li>React, TypeScript経験者歓迎</li>
                <li>バックエンド経験がある方歓迎</li>
              </ul>
            </article>

            <article className="position-card">
              <h3 className="position-title">オープンポジション</h3>
              <p className="position-type">正社員 / 業務委託 / インターン</p>
              <p className="position-description">
                上記以外にも、あなたのスキルや経験を活かせるポジションを
                一緒に探しましょう。
              </p>
              <ul className="position-requirements">
                <li>新しいことに挑戦したい方</li>
                <li>自分のアイデアを形にしたい方</li>
                <li>スタートアップで働きたい方</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      {/* 応募フォームセクション */}
      <section className="section careers-form-section" id="apply">
        <div className="container">
          <h2 className="section-title-center">APPLY</h2>
          <p className="section-subtitle-center">エントリーフォーム</p>

          {submitStatus === 'success' ? (
            <div className="form-success">
              <div className="form-success-icon">✓</div>
              <h3>ご応募ありがとうございます</h3>
              <p>内容を確認の上、担当者よりご連絡いたします。</p>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setSubmitStatus('idle')}
              >
                新しい応募をする
              </button>
            </div>
          ) : (
            <form className="careers-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  お名前 <span className="required">*</span>
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
                  メールアドレス <span className="required">*</span>
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
                  placeholder="090-1234-5678"
                />
              </div>

              <div className="form-group">
                <label htmlFor="position" className="form-label">
                  希望職種 <span className="required">*</span>
                </label>
                <select
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  required
                  className="form-select"
                >
                  <option value="">選択してください</option>
                  <option value="ウェブマーケター">ウェブマーケター</option>
                  <option value="コンテンツディレクター">コンテンツディレクター</option>
                  <option value="ウェブエンジニア">ウェブエンジニア</option>
                  <option value="オープンポジション">オープンポジション</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="experience" className="form-label">
                  経験年数
                </label>
                <select
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="">選択してください</option>
                  <option value="未経験">未経験</option>
                  <option value="1年未満">1年未満</option>
                  <option value="1〜3年">1〜3年</option>
                  <option value="3〜5年">3〜5年</option>
                  <option value="5年以上">5年以上</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">
                  自己PR・志望動機 <span className="required">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="form-textarea"
                  rows={6}
                  placeholder="あなたの強みや、EMPLAYで実現したいことをお聞かせください。"
                />
              </div>

              {submitStatus === 'error' && (
                <div className="form-error">
                  送信に失敗しました。時間をおいて再度お試しください。
                </div>
              )}

              <div className="form-submit">
                <button
                  type="submit"
                  className="btn btn-primary btn-large"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? '送信中...' : '応募する'}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* コンタクトセクション */}
      <section className="contact-section-page" aria-label="お問い合わせ">
        <div className="container">
          <Link href="/contact" className="contact-box" aria-label="お問い合わせページへ移動">
            <div className="contact-box-content">
              <h2 className="contact-box-title">CONTACT</h2>
              <p className="contact-box-text">その他のお問い合わせはこちらから</p>
            </div>
            <span className="contact-box-arrow" aria-hidden="true">&gt;</span>
          </Link>
        </div>
      </section>
    </main>
  )
}
