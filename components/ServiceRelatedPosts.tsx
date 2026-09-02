import Link from 'next/link'
import './ServiceRelatedPosts.css'

export type RelatedPost = {
  slug: string
  anchor: string
  relation: string
}

export type RelatedCategory = {
  path: string
  label: string
}

interface Props {
  heading?: string
  lead?: string
  posts: RelatedPost[]
  categories?: RelatedCategory[]
}

// サービスページから、その判断を助けるブログ記事へ送る。
// ブログ→サービスの一方通行になっていて、トピック上の関係が外から見えなかったため(issue #5)。
export default function ServiceRelatedPosts({
  heading = '検討の前に読んでおきたい記事',
  lead,
  posts,
  categories = [],
}: Props) {
  return (
    <section className="service-related" aria-labelledby="service-related-heading">
      <div className="container">
        <p className="service-related-label">Related Articles</p>
        <h2 id="service-related-heading" className="service-related-heading">
          {heading}
        </h2>
        {lead && <p className="service-related-lead">{lead}</p>}

        <ul className="service-related-list">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="service-related-item">
                <span className="service-related-title">{post.anchor}</span>
                <span className="service-related-relation">{post.relation}</span>
                <span className="service-related-arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>

        {categories.length > 0 && (
          <p className="service-related-categories">
            {categories.map((category) => (
              <Link key={category.path} href={category.path}>
                {category.label}
              </Link>
            ))}
          </p>
        )}
      </div>
    </section>
  )
}
