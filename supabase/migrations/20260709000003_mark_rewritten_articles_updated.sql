UPDATE emplay_hp.blog_posts
SET updated_at = now()
WHERE slug IN (
  'sns-marketing-guide',
  'line-official-account-guide',
  'landing-page-creation-guide',
  'cross-border-ec-guide',
  'shopify-beginner-guide',
  'github-copilot-guide',
  'paperless-implementation-guide',
  'bi-tools-guide',
  'business-efficiency-tools-guide',
  'cms-comparison-guide',
  'smb-web-marketing-strategy-50man',
  'cvr-conversion-rate-guide',
  'twitter-x-ads-guide',
  'zoom-business-guide',
  'freee-accounting-guide',
  'instagram-ads-guide',
  'sme-security-basics-guide',
  'youtube-ads-guide',
  'webinar-guide',
  'email-marketing-guide',
  'sme-ai-introduction-guide',
  'ga4-analytics-guide',
  'website-development-cost-guide',
  'ai-tools-complete-guide',
  'marketing-automation-guide'
);
