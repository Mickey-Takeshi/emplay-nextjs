import { createClient } from '@supabase/supabase-js'

const MIN_CONTENT_LENGTH = 3000
const REQUIRED_INTERNAL_LINKS = 3

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are required')
}

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  db: { schema: 'emplay_hp' },
})

const { data: posts, error } = await supabase
  .from('blog_posts')
  .select('id,title,slug,category,content,published_at,updated_at')
  .order('id')

if (error) throw error

const slugs = new Set(posts.map((post) => post.slug))
const duplicateValues = (field) => {
  const groups = new Map()
  for (const post of posts) {
    const value = post[field]
    groups.set(value, [...(groups.get(value) ?? []), post.slug])
  }
  return [...groups.entries()]
    .filter(([, matchingSlugs]) => matchingSlugs.length > 1)
    .map(([value, matchingSlugs]) => ({ value, slugs: matchingSlugs }))
}

const extractBlogLinks = (content) => {
  const markdownLinks = [...content.matchAll(/\]\(\/?blog\/([a-z0-9-]+)(?:[?#][^)]*)?\)/g)]
    .map((match) => match[1])
  const htmlLinks = [...content.matchAll(/href=["']\/?blog\/([a-z0-9-]+)(?:[?#][^"']*)?["']/g)]
    .map((match) => match[1])
  return [...new Set([...markdownLinks, ...htmlLinks])]
}

const articleAudits = posts.map((post) => {
  const links = extractBlogLinks(post.content)
  return {
    slug: post.slug,
    contentLength: post.content.trim().length,
    internalLinks: links.length,
    brokenLinks: links.filter((slug) => !slugs.has(slug)),
  }
})

const categoryCounts = posts.reduce((counts, post) => {
  counts[post.category] = (counts[post.category] ?? 0) + 1
  return counts
}, {})

const report = {
  generatedAt: new Date().toISOString(),
  articles: posts.length,
  categories: categoryCounts,
  duplicateSlugs: duplicateValues('slug'),
  duplicateTitles: duplicateValues('title'),
  thinArticles: articleAudits
    .filter((article) => article.contentLength < MIN_CONTENT_LENGTH)
    .map(({ slug, contentLength }) => ({ slug, contentLength })),
  lowLinkArticles: articleAudits
    .filter((article) => article.internalLinks < REQUIRED_INTERNAL_LINKS)
    .map(({ slug, internalLinks }) => ({ slug, internalLinks })),
  brokenLinks: articleAudits
    .filter((article) => article.brokenLinks.length > 0)
    .map(({ slug, brokenLinks }) => ({ slug, brokenLinks })),
  contentLengthRange: {
    min: Math.min(...articleAudits.map((article) => article.contentLength)),
    max: Math.max(...articleAudits.map((article) => article.contentLength)),
  },
  internalLinkRange: {
    min: Math.min(...articleAudits.map((article) => article.internalLinks)),
    max: Math.max(...articleAudits.map((article) => article.internalLinks)),
  },
}

console.log(JSON.stringify(report, null, 2))

const hasCriticalIssues =
  report.duplicateSlugs.length > 0
  || report.duplicateTitles.length > 0
  || report.thinArticles.length > 0
  || report.lowLinkArticles.length > 0
  || report.brokenLinks.length > 0

if (hasCriticalIssues) process.exitCode = 1
