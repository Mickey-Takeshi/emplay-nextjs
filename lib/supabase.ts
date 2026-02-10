import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// ブログ記事の型
export interface BlogPost {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  thumbnail: string
  category: string
  published_at: string
  created_at: string
}

// ニュース記事の型
export interface NewsArticle {
  id: number
  title: string
  content: string
  slug: string
  published_at: string
  created_at: string
}

// ブログ一覧を取得
export async function getBlogPosts(limit?: number): Promise<BlogPost[]> {
  let query = supabase
    .from('blog_posts')
    .select('*')
    .order('published_at', { ascending: false })

  if (limit) {
    query = query.limit(limit)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }

  return data as BlogPost[]
}

// 単一のブログ記事を取得
export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) {
    console.error('Error fetching blog post:', error)
    return null
  }

  return data as BlogPost
}

// すべてのブログスラッグを取得（SSG用）
export async function getAllBlogSlugs(): Promise<string[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('slug')

  if (error) {
    console.error('Error fetching blog slugs:', error)
    return []
  }

  return data.map(post => post.slug)
}

// カテゴリ別ブログ一覧を取得
export async function getBlogPostsByCategory(category: string, limit?: number): Promise<BlogPost[]> {
  let query = supabase
    .from('blog_posts')
    .select('*')
    .eq('category', category)
    .order('published_at', { ascending: false })

  if (limit) {
    query = query.limit(limit)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching blog posts by category:', error)
    return []
  }

  return data as BlogPost[]
}

// ブログカテゴリ一覧を取得
export async function getBlogCategories(): Promise<string[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('category')

  if (error) {
    console.error('Error fetching blog categories:', error)
    return []
  }

  const categories = [...new Set(data.map(item => item.category))]
  return categories
}

// 関連記事を取得
export async function getRelatedPosts(currentSlug: string, category: string, limit: number = 4): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('category', category)
    .neq('slug', currentSlug)
    .order('published_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching related posts:', error)
    return []
  }

  return data as BlogPost[]
}

// ニュース一覧を取得
export async function getNews(limit?: number): Promise<NewsArticle[]> {
  let query = supabase
    .from('news')
    .select('*')
    .order('published_at', { ascending: false })

  if (limit) {
    query = query.limit(limit)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching news:', error)
    return []
  }

  return data as NewsArticle[]
}

// 単一のニュース記事を取得
export async function getNewsArticle(slug: string): Promise<NewsArticle | null> {
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) {
    console.error('Error fetching news article:', error)
    return null
  }

  return data as NewsArticle
}

// すべてのニューススラッグを取得（SSG用）
export async function getAllNewsSlugs(): Promise<string[]> {
  const { data, error } = await supabase
    .from('news')
    .select('slug')

  if (error) {
    console.error('Error fetching news slugs:', error)
    return []
  }

  return data.map(article => article.slug)
}

// お問い合わせフォームのデータ型
export interface ContactFormData {
  name: string
  email: string
  company?: string
  phone?: string
  message: string
}

// お問い合わせを送信（Edge Function経由）
export async function submitContact(data: ContactFormData) {
  const { data: responseData, error } = await supabase.functions.invoke('send-contact-email', {
    body: data
  })

  if (error) {
    throw new Error(error.message)
  }

  if (!responseData?.success) {
    throw new Error(responseData?.error || 'Failed to submit contact')
  }

  return { success: true }
}

// 採用応募フォームのデータ型
export interface JobApplicationData {
  name: string
  email: string
  phone?: string
  position: string
  experience?: string
  message: string
}

// 採用応募を送信する関数
export async function submitJobApplication(data: JobApplicationData) {
  const { error } = await supabase
    .from('job_applications')
    .insert([{
      ...data,
      created_at: new Date().toISOString()
    }])

  if (error) {
    throw new Error(error.message)
  }

  return { success: true }
}
