alter table emplay_hp.contacts
  add column if not exists acquisition_source text,
  add column if not exists inquiry_topic text,
  add column if not exists landing_variant text;

comment on column emplay_hp.contacts.acquisition_source is
  'Validated acquisition channel such as chatgpt-ads. Separate from source, which identifies the submitting site.';

comment on column emplay_hp.contacts.inquiry_topic is
  'Validated inquiry topic selected by the landing and contact flow.';

comment on column emplay_hp.contacts.landing_variant is
  'Validated landing-page message variant used before the inquiry.';
