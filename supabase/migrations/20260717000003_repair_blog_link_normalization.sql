-- Repair three prefix replacements introduced by the previous normalization.
UPDATE emplay_hp.blog_posts
SET content = replace(
  replace(
    replace(content,
      '/blog/lp-improvement-checklist-50-50',
      '/blog/lp-improvement-checklist-50'
    ),
    '/blog/generative-ai-marketing-guide-guide',
    '/blog/generative-ai-marketing-guide'
  ),
  '/blog/ec-platform-comparison-guide-guide',
  '/blog/ec-platform-comparison-guide'
)
WHERE content LIKE '%/blog/lp-improvement-checklist-50-50%'
  OR content LIKE '%/blog/generative-ai-marketing-guide-guide%'
  OR content LIKE '%/blog/ec-platform-comparison-guide-guide%';

-- Restore crawl paths for articles whose only related blocks were removed with
-- the excluded topic content.
WITH link_map(source_slug, target_a_slug, target_b_slug, target_c_slug) AS (
  VALUES
    ('driver-recruitment-guide', 'job-posting-writing-guide', 'recruitment-site-creation-guide', 'rpo-recruitment-outsourcing'),
    ('marketing-automation-guide', 'hubspot-guide', 'lead-nurturing-basics', 'email-marketing-guide'),
    ('sme-dx-promotion-guide', 'nocode-development-basics', 'business-efficiency-tools-guide', 'dx-talent-development-guide'),
    ('business-efficiency-tools-guide', 'notion-business-usage', 'task-management-tools', 'gas-google-apps-script-automation'),
    ('paperless-implementation-guide', 'e-signature-comparison-guide', 'invoice-system-guide', 'online-storage-comparison-guide'),
    ('sme-ai-introduction-guide', 'ai-adoption-failure-patterns', 'ai-implementation-hands-on-support-guide', 'generative-ai-training-guide'),
    ('website-development-cost-guide', 'web-production-company-selection', 'website-maintenance-cost-guide', 'website-renewal-cost-guide'),
    ('freee-accounting-guide', 'accounting-ai-usecases', 'invoice-system-guide', 'paperless-implementation-guide'),
    ('invoice-system-guide', 'freee-accounting-guide', 'e-signature-comparison-guide', 'paperless-implementation-guide'),
    ('ai-agent-implementation-cost-guide', 'ai-agent-comparison-guide', 'ai-agent-requirements-definition', 'ai-implementation-hands-on-support-guide'),
    ('ai-voicebot-phone-reception-cost-guide', 'ai-agent-implementation-cost-guide', 'chatbot-introduction-guide', 'ai-implementation-hands-on-support-guide')
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
