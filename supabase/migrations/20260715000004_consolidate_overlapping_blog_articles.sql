-- Consolidate articles competing for the same search intent.
-- Permanent redirects are defined in next.config.ts.

BEGIN;

UPDATE emplay_hp.blog_posts
SET content = replace(
  replace(
    replace(
      replace(content,
        '/blog/ga4-guide-2025',
        '/blog/ga4-analytics-guide'
      ),
      '/blog/ga4-advanced-guide',
      '/blog/ga4-analytics-guide'
    ),
    '/blog/ga4-guide',
    '/blog/ga4-analytics-guide'
  ),
  '/blog/dx-strategy-guide',
  '/blog/sme-dx-promotion-guide'
)
WHERE content LIKE '%/blog/ga4-guide-2025%'
   OR content LIKE '%/blog/ga4-advanced-guide%'
   OR content LIKE '%/blog/ga4-guide%'
   OR content LIKE '%/blog/dx-strategy-guide%';

UPDATE emplay_hp.blog_posts
SET content = replace(
  content,
  '/blog/shopify-beginner-guide',
  '/blog/shopify-ec-setup-guide'
)
WHERE content LIKE '%/blog/shopify-beginner-guide%';

DELETE FROM emplay_hp.blog_posts
WHERE slug IN (
  'ga4-guide',
  'ga4-advanced-guide',
  'dx-strategy-guide',
  'shopify-beginner-guide'
);

COMMIT;
