import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  db: { schema: 'emplay_hp' }
})

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
  updated_at: string
}

export type BlogPostSummary = Omit<BlogPost, 'content'>

export interface PaginatedBlogPosts {
  posts: BlogPostSummary[]
  totalCount: number
  totalPages: number
}

const BLOG_LIST_COLUMNS = 'id,title,slug,excerpt,thumbnail,category,published_at,created_at,updated_at'

// ニュース記事の型
export interface NewsArticle {
  id: number
  title: string
  content: string
  slug: string
  published_at: string
  created_at: string
}

export type NewsArticleSummary = Omit<NewsArticle, 'content'>

const NEWS_LIST_COLUMNS = 'id,title,slug,published_at,created_at'

// 一覧・サイトマップ用に本文を除外して取得
export async function getBlogPostSummaries(limit?: number): Promise<BlogPostSummary[]> {
  let query = supabase
    .from('blog_posts')
    .select(BLOG_LIST_COLUMNS)
    .order('published_at', { ascending: false })

  if (limit) query = query.limit(limit)

  const { data, error } = await query

  if (error) {
    console.error('Error fetching blog post summaries:', error)
    return []
  }

  return data as BlogPostSummary[]
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

// ブログ一覧用に本文を除外し、必要なページだけを取得
export async function getPaginatedBlogPosts(page: number, pageSize: number): Promise<PaginatedBlogPosts> {
  const safePage = Math.max(1, Math.floor(page))
  const safePageSize = Math.max(1, Math.floor(pageSize))
  const from = (safePage - 1) * safePageSize
  const to = from + safePageSize - 1

  const { data, error, count } = await supabase
    .from('blog_posts')
    .select(BLOG_LIST_COLUMNS, { count: 'exact' })
    .order('published_at', { ascending: false })
    .range(from, to)

  if (error) {
    console.error('Error fetching paginated blog posts:', error)
    return { posts: [], totalCount: 0, totalPages: 0 }
  }

  const totalCount = count ?? 0
  return {
    posts: data as BlogPostSummary[],
    totalCount,
    totalPages: Math.ceil(totalCount / safePageSize),
  }
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

// カテゴリ一覧用に本文を除外し、必要なページだけを取得
export async function getPaginatedBlogPostsByCategory(
  category: string,
  page: number,
  pageSize: number
): Promise<PaginatedBlogPosts> {
  const safePage = Math.max(1, Math.floor(page))
  const safePageSize = Math.max(1, Math.floor(pageSize))
  const from = (safePage - 1) * safePageSize
  const to = from + safePageSize - 1

  const { data, error, count } = await supabase
    .from('blog_posts')
    .select(BLOG_LIST_COLUMNS, { count: 'exact' })
    .eq('category', category)
    .order('published_at', { ascending: false })
    .range(from, to)

  if (error) {
    console.error('Error fetching paginated blog posts by category:', error)
    return { posts: [], totalCount: 0, totalPages: 0 }
  }

  const totalCount = count ?? 0
  return {
    posts: data as BlogPostSummary[],
    totalCount,
    totalPages: Math.ceil(totalCount / safePageSize),
  }
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
export async function getRelatedPosts(currentSlug: string, category: string, limit: number = 4): Promise<BlogPostSummary[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select(BLOG_LIST_COLUMNS)
    .eq('category', category)
    .neq('slug', currentSlug)
    .order('published_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching related posts:', error)
    return []
  }

  return data as BlogPostSummary[]
}

// ニュース一覧用に本文を除外して取得
export async function getNewsSummaries(limit?: number): Promise<NewsArticleSummary[]> {
  let query = supabase
    .from('news')
    .select(NEWS_LIST_COLUMNS)
    .order('published_at', { ascending: false })

  if (limit) query = query.limit(limit)

  const { data, error } = await query

  if (error) {
    console.error('Error fetching news summaries:', error)
    return []
  }

  return data as NewsArticleSummary[]
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
