-- Remove subsidy-related public content in line with the editorial policy and
-- normalize internal links that still point at superseded article slugs.
DO $$
DECLARE
  redirect RECORD;
BEGIN
  FOR redirect IN
    SELECT * FROM (VALUES
      ('ab-test-practical-guide', 'lp-ab-test-guide'),
      ('ab-test-guide', 'lp-ab-test-guide'),
      ('ui-ux-design-basics-guide', 'landing-page-design-guide'),
      ('ui-ux-design-guide', 'landing-page-design-guide'),
      ('generative-ai-marketing', 'generative-ai-marketing-guide'),
      ('bi-tool-guide', 'bi-tools-guide'),
      ('bi-tool-introduction-guide', 'bi-tools-guide'),
      ('remote-work-guide', 'remote-work-implementation-guide'),
      ('image-generation-ai-guide', 'image-generation-ai-business-guide'),
      ('ai-introduction-guide-sme', 'sme-ai-introduction-guide'),
      ('website-cost-guide', 'website-development-cost-guide'),
      ('google-ads-guide', 'google-ads-basics-guide'),
      ('smb-marketing-strategy-guide', 'smb-web-marketing-strategy-50man'),
      ('lp-improvement-checklist', 'lp-improvement-checklist-50'),
      ('review-marketing-guide', 'google-review-increase-guide'),
      ('ma-guide', 'marketing-automation-guide'),
      ('btob-content-marketing-guide', 'btob-content-marketing-strategy'),
      ('ma-marketing-automation-guide', 'marketing-automation-guide'),
      ('electronic-bookkeeping-guide', 'paperless-implementation-guide'),
      ('web-advertising-types-comparison', 'web-ads-types-comparison'),
      ('dx-sme-guide', 'sme-dx-promotion-guide'),
      ('security-basics-for-business', 'sme-security-basics-guide'),
      ('security-basics-guide', 'sme-security-basics-guide'),
      ('ec-platform-comparison', 'ec-platform-comparison-guide'),
      ('paperless-office-guide', 'paperless-implementation-guide'),
      ('product-photography-guide', 'ec-sales-improvement-guide'),
      ('seo-basics-guide', 'seo-technical-optimization-guide'),
      ('seo-technical-guide', 'seo-technical-optimization-guide'),
      ('search-console-guide', 'google-search-console-guide'),
      ('blog-management-guide', 'owned-media-startup'),
      ('sora-video-ai-guide', 'video-ai-guide')
    ) AS redirects(old_slug, current_slug)
  LOOP
    UPDATE emplay_hp.blog_posts
    SET content = replace(
      content,
      '/blog/' || redirect.old_slug,
      '/blog/' || redirect.current_slug
    )
    WHERE content LIKE '%/blog/' || redirect.old_slug || '%';
  END LOOP;
END $$;

-- Remove complete Markdown blocks that discuss the excluded topic or link to
-- one of its retired articles. Splitting on blank lines preserves surrounding
-- sections, tables, and related-article groups as independent blocks.
WITH cleaned_content AS (
  SELECT
    post.id,
    string_agg(block.value, E'\n\n' ORDER BY block.position) AS content
  FROM emplay_hp.blog_posts AS post
  CROSS JOIN LATERAL regexp_split_to_table(post.content, E'\n[[:space:]]*\n')
    WITH ORDINALITY AS block(value, position)
  WHERE block.value !~ '(補助金|助成金)'
    AND block.value !~ '/blog/(it-subsidy-guide|monozukuri-subsidy-guide|subsidy-comparison-guide|small-business-subsidy-guide|jigyou-saikouchiku-subsidy-guide|career-up-subsidy-guide|shokibo-jizokuka-subsidy-guide|sme-subsidy-comparison)'
  GROUP BY post.id
)
UPDATE emplay_hp.blog_posts AS post
SET
  content = cleaned_content.content,
  updated_at = now()
FROM cleaned_content
WHERE post.id = cleaned_content.id
  AND post.content IS DISTINCT FROM cleaned_content.content;

DELETE FROM emplay_hp.blog_posts
WHERE slug IN (
  'it-subsidy-guide',
  'monozukuri-subsidy-guide',
  'subsidy-comparison-guide',
  'small-business-subsidy-guide',
  'jigyou-saikouchiku-subsidy-guide',
  'career-up-subsidy-guide'
);

-- Add contextual links to established articles that previously had no crawl
-- path in their body content.
WITH link_map(source_slug, target_a_slug, target_b_slug, target_c_slug) AS (
  VALUES
    ('landing-page-design-guide', 'landing-page-creation-guide', 'cvr-conversion-rate-guide', 'lp-ab-test-guide'),
    ('ec-sales-improvement-guide', 'ec-platform-comparison-guide', 'shopify-ec-setup-guide', 'cart-abandonment-prevention-guide'),
    ('cross-border-ec-guide', 'marketplace-vs-own-ec', 'multilingual-website-development', 'ec-platform-comparison-guide'),
    ('ga4-analytics-guide', 'google-tag-manager-guide', 'web-analytics-basics-guide', 'looker-studio-guide'),
    ('bi-tools-guide', 'looker-studio-guide', 'power-bi-copilot-guide', 'kpi-design-guide'),
    ('kpi-design-guide', 'bi-tools-guide', 'sales-data-analysis-basics', 'ga4-analytics-guide')
),
resolved AS (
  SELECT
    links.source_slug,
    target_a.slug AS target_a_slug,
    target_a.title AS target_a_title,
    target_b.slug AS target_b_slug,
    target_b.title AS target_b_title,
    target_c.slug AS target_c_slug,
    target_c.title AS target_c_title
  FROM link_map AS links
  JOIN emplay_hp.blog_posts AS target_a ON target_a.slug = links.target_a_slug
  JOIN emplay_hp.blog_posts AS target_b ON target_b.slug = links.target_b_slug
  JOIN emplay_hp.blog_posts AS target_c ON target_c.slug = links.target_c_slug
)
UPDATE emplay_hp.blog_posts AS source
SET
  content = rtrim(source.content)
    || E'\n\n## 関連記事'
    || E'\n\n- [' || resolved.target_a_title || '](/blog/' || resolved.target_a_slug || ')'
    || E'\n- [' || resolved.target_b_title || '](/blog/' || resolved.target_b_slug || ')'
    || E'\n- [' || resolved.target_c_title || '](/blog/' || resolved.target_c_slug || ')',
  updated_at = now()
FROM resolved
WHERE source.slug = resolved.source_slug;
