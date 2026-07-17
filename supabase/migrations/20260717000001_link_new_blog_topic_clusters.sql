-- Connect the July 2026 article batch within tightly related topic clusters.
-- Each row links to the previous and next article in its cluster, so every
-- article receives two contextual inbound links as well as two outbound links.
WITH link_map(source_slug, target_a_slug, target_b_slug) AS (
  VALUES
    -- AI: tool selection and research
    ('chatgpt-gemini-claude-comparison', 'ai-browser-comparison', 'copilot-vs-chatgpt-business'),
    ('copilot-vs-chatgpt-business', 'chatgpt-gemini-claude-comparison', 'deep-research-how-to-use'),
    ('deep-research-how-to-use', 'copilot-vs-chatgpt-business', 'ai-browser-comparison'),
    ('ai-browser-comparison', 'deep-research-how-to-use', 'chatgpt-gemini-claude-comparison'),

    -- AI: adoption and governance
    ('ai-adoption-failure-patterns', 'local-llm-business-guide', 'generative-ai-certifications'),
    ('generative-ai-certifications', 'ai-adoption-failure-patterns', 'chatgpt-business-plans-pricing'),
    ('chatgpt-business-plans-pricing', 'generative-ai-certifications', 'local-llm-business-guide'),
    ('local-llm-business-guide', 'chatgpt-business-plans-pricing', 'ai-adoption-failure-patterns'),

    -- AI: content production
    ('ai-presentation-tools', 'generative-ai-copyright-issues', 'ai-email-writing'),
    ('ai-email-writing', 'ai-presentation-tools', 'ai-proofreading-tools'),
    ('ai-proofreading-tools', 'ai-email-writing', 'ai-avatar-video-creation'),
    ('ai-avatar-video-creation', 'ai-proofreading-tools', 'nano-banana-gemini-image-guide'),
    ('nano-banana-gemini-image-guide', 'ai-avatar-video-creation', 'generative-ai-copyright-issues'),
    ('generative-ai-copyright-issues', 'nano-banana-gemini-image-guide', 'ai-presentation-tools'),

    -- AI: department and industry use cases
    ('accounting-ai-usecases', 'chatgpt-excel-work-automation', 'sales-generative-ai-usecases'),
    ('sales-generative-ai-usecases', 'accounting-ai-usecases', 'shigyo-generative-ai-usecases'),
    ('shigyo-generative-ai-usecases', 'sales-generative-ai-usecases', 'manufacturing-generative-ai'),
    ('manufacturing-generative-ai', 'shigyo-generative-ai-usecases', 'restaurant-ai-usecases'),
    ('restaurant-ai-usecases', 'manufacturing-generative-ai', 'chatgpt-excel-work-automation'),
    ('chatgpt-excel-work-automation', 'restaurant-ai-usecases', 'accounting-ai-usecases'),

    -- DX and automation
    ('excel-to-system-migration', 'zapier-make-automation', 'gas-google-apps-script-automation'),
    ('gas-google-apps-script-automation', 'excel-to-system-migration', 'nocode-development-basics'),
    ('nocode-development-basics', 'gas-google-apps-script-automation', 'labor-saving-investment'),
    ('labor-saving-investment', 'nocode-development-basics', 'zapier-make-automation'),
    ('zapier-make-automation', 'labor-saving-investment', 'excel-to-system-migration'),

    -- EC: store and channel planning
    ('marketplace-vs-own-ec', 'food-ec-business-startup', 'rakuten-store-opening'),
    ('rakuten-store-opening', 'marketplace-vs-own-ec', 'food-ec-business-startup'),
    ('food-ec-business-startup', 'rakuten-store-opening', 'marketplace-vs-own-ec'),

    -- EC: operations and sales growth
    ('fulfillment-outsourcing-cost', 'instagram-shopping-setup', 'ec-review-collection'),
    ('ec-review-collection', 'fulfillment-outsourcing-cost', 'instagram-shopping-setup'),
    ('instagram-shopping-setup', 'ec-review-collection', 'fulfillment-outsourcing-cost'),

    -- Web: planning, production, and maintenance
    ('ai-website-builders-review', 'rental-server-comparison', 'diy-vs-professional-website'),
    ('diy-vs-professional-website', 'ai-website-builders-review', 'self-managed-website-updates'),
    ('self-managed-website-updates', 'diy-vs-professional-website', 'outdated-website-risks'),
    ('outdated-website-risks', 'self-managed-website-updates', 'service-site-planning'),
    ('service-site-planning', 'outdated-website-risks', 'website-lease-contract-risks'),
    ('website-lease-contract-risks', 'service-site-planning', 'custom-domain-basics'),
    ('custom-domain-basics', 'website-lease-contract-risks', 'rental-server-comparison'),
    ('rental-server-comparison', 'custom-domain-basics', 'ai-website-builders-review'),

    -- Web: industry-specific sites
    ('clinic-website-development', 'multilingual-website-development', 'professional-firm-website'),
    ('professional-firm-website', 'clinic-website-development', 'restaurant-website-development'),
    ('restaurant-website-development', 'professional-firm-website', 'multilingual-website-development'),
    ('multilingual-website-development', 'restaurant-website-development', 'clinic-website-development'),

    -- Security
    ('mfa-multi-factor-authentication', 'wordpress-security-hardening', 'ransomware-protection-sme'),
    ('ransomware-protection-sme', 'mfa-multi-factor-authentication', 'shadow-ai-risks-management'),
    ('shadow-ai-risks-management', 'ransomware-protection-sme', 'wordpress-security-hardening'),
    ('wordpress-security-hardening', 'shadow-ai-risks-management', 'mfa-multi-factor-authentication'),

    -- Analytics: acquisition measurement
    ('cpa-reduction-methods', 'website-traffic-drop-diagnosis', 'rank-tracking-tools'),
    ('rank-tracking-tools', 'cpa-reduction-methods', 'website-traffic-drop-diagnosis'),
    ('website-traffic-drop-diagnosis', 'rank-tracking-tools', 'cpa-reduction-methods'),

    -- Analytics: customer and sales analysis
    ('customer-journey-mapping', 'chatgpt-data-analysis', 'customer-survey-design'),
    ('customer-survey-design', 'customer-journey-mapping', 'nps-net-promoter-score'),
    ('nps-net-promoter-score', 'customer-survey-design', 'sales-data-analysis-basics'),
    ('sales-data-analysis-basics', 'nps-net-promoter-score', 'chatgpt-data-analysis'),
    ('chatgpt-data-analysis', 'sales-data-analysis-basics', 'customer-journey-mapping'),

    -- Business: productivity and continuity
    ('google-workspace-adoption', 'labor-shortage-solutions', 'notion-business-usage'),
    ('notion-business-usage', 'google-workspace-adoption', 'task-management-tools'),
    ('task-management-tools', 'notion-business-usage', 'bcp-planning-sme'),
    ('bcp-planning-sme', 'task-management-tools', 'labor-shortage-solutions'),
    ('labor-shortage-solutions', 'bcp-planning-sme', 'google-workspace-adoption'),

    -- Business: positioning and customer communication
    ('company-brochure-creation', 'inbound-tourism-readiness', 'sales-deck-creation'),
    ('sales-deck-creation', 'company-brochure-creation', 'mission-vision-values-creation'),
    ('mission-vision-values-creation', 'sales-deck-creation', 'price-increase-communication'),
    ('price-increase-communication', 'mission-vision-values-creation', 'inbound-tourism-readiness'),
    ('inbound-tourism-readiness', 'price-increase-communication', 'company-brochure-creation'),

    -- Marketing: paid search and media buying
    ('google-ads-keyword-selection', 'roas-improvement-strategies', 'responsive-search-ads-copywriting'),
    ('responsive-search-ads-copywriting', 'google-ads-keyword-selection', 'google-ads-quality-score-improvement'),
    ('google-ads-quality-score-improvement', 'responsive-search-ads-copywriting', 'google-ads-conversion-setup'),
    ('google-ads-conversion-setup', 'google-ads-quality-score-improvement', 'google-demand-gen-campaign-guide'),
    ('google-demand-gen-campaign-guide', 'google-ads-conversion-setup', 'listing-ads-inhouse-vs-agency'),
    ('listing-ads-inhouse-vs-agency', 'google-demand-gen-campaign-guide', 'web-ads-budget-planning'),
    ('web-ads-budget-planning', 'listing-ads-inhouse-vs-agency', 'roas-improvement-strategies'),
    ('roas-improvement-strategies', 'web-ads-budget-planning', 'google-ads-keyword-selection'),

    -- Marketing: lead generation and sales pipeline
    ('exhibition-booth-lead-followup', 'efo-form-optimization', 'lead-nurturing-basics'),
    ('lead-nurturing-basics', 'exhibition-booth-lead-followup', 'inside-sales-introduction'),
    ('inside-sales-introduction', 'lead-nurturing-basics', 'abm-account-based-marketing'),
    ('abm-account-based-marketing', 'inside-sales-introduction', 'case-study-content-creation'),
    ('case-study-content-creation', 'abm-account-based-marketing', 'efo-form-optimization'),
    ('efo-form-optimization', 'case-study-content-creation', 'exhibition-booth-lead-followup'),

    -- Marketing: organic search and brand authority
    ('branded-search-growth', 'seo-article-outsourcing-cost', 'citation-seo-meo-guide'),
    ('citation-seo-meo-guide', 'branded-search-growth', 'owned-media-startup'),
    ('owned-media-startup', 'citation-seo-meo-guide', 'seo-article-outsourcing-cost'),
    ('seo-article-outsourcing-cost', 'owned-media-startup', 'branded-search-growth'),

    -- Marketing: social, video, UGC, and store acquisition
    ('x-corporate-account-management', 'store-customer-attraction-ideas', 'instagram-reels-not-growing'),
    ('instagram-reels-not-growing', 'x-corporate-account-management', 'instagram-stories-business-use'),
    ('instagram-stories-business-use', 'instagram-reels-not-growing', 'ugc-marketing-guide'),
    ('ugc-marketing-guide', 'instagram-stories-business-use', 'short-video-marketing'),
    ('short-video-marketing', 'ugc-marketing-guide', 'corporate-youtube-channel'),
    ('corporate-youtube-channel', 'short-video-marketing', 'store-customer-attraction-ideas'),
    ('store-customer-attraction-ideas', 'corporate-youtube-channel', 'x-corporate-account-management'),

    -- Recruitment: attracting candidates
    ('no-job-applications-reasons', 'rpo-recruitment-outsourcing', 'hellowork-job-posting-tips'),
    ('hellowork-job-posting-tips', 'no-job-applications-reasons', 'recruiting-persona-design'),
    ('recruiting-persona-design', 'hellowork-job-posting-tips', 'gen-z-recruitment'),
    ('gen-z-recruitment', 'recruiting-persona-design', 'rpo-recruitment-outsourcing'),
    ('rpo-recruitment-outsourcing', 'gen-z-recruitment', 'no-job-applications-reasons'),

    -- Recruitment: selection and retention
    ('casual-interview-guide', 'foreign-worker-recruitment', 'interview-noshow-prevention'),
    ('interview-noshow-prevention', 'casual-interview-guide', 'recruiting-funnel-improvement'),
    ('recruiting-funnel-improvement', 'interview-noshow-prevention', 'alumni-recruitment'),
    ('alumni-recruitment', 'recruiting-funnel-improvement', 'foreign-worker-recruitment'),
    ('foreign-worker-recruitment', 'alumni-recruitment', 'casual-interview-guide')
),
resolved AS (
  SELECT
    links.source_slug,
    target_a.slug AS target_a_slug,
    target_a.title AS target_a_title,
    target_b.slug AS target_b_slug,
    target_b.title AS target_b_title
  FROM link_map AS links
  JOIN emplay_hp.blog_posts AS target_a ON target_a.slug = links.target_a_slug
  JOIN emplay_hp.blog_posts AS target_b ON target_b.slug = links.target_b_slug
)
UPDATE emplay_hp.blog_posts AS source
SET
  content = rtrim(source.content)
    || CASE
      WHEN strpos(source.content, '/blog/' || resolved.target_a_slug) = 0
        THEN E'\n- [' || resolved.target_a_title || '](/blog/' || resolved.target_a_slug || ')'
      ELSE ''
    END
    || CASE
      WHEN strpos(source.content, '/blog/' || resolved.target_b_slug) = 0
        THEN E'\n- [' || resolved.target_b_title || '](/blog/' || resolved.target_b_slug || ')'
      ELSE ''
    END,
  updated_at = now()
FROM resolved
WHERE source.slug = resolved.source_slug;
