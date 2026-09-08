DO $$
DECLARE
  target_rows integer;
  source_occurrences integer;
  marker_occurrences integer;
BEGIN
  SELECT
    count(*),
    COALESCE(sum(
      (length(content) - length(replace(content, '広告はChatGPTの回答下に表示されることがあり、通常は次の要素を含みます。', '')))
      / length('広告はChatGPTの回答下に表示されることがあり、通常は次の要素を含みます。')
    ), 0),
    COALESCE(sum(
      (length(content) - length(replace(content, '[[CHATGPT_AD_PREVIEW]]', '')))
      / length('[[CHATGPT_AD_PREVIEW]]')
    ), 0)
  INTO target_rows, source_occurrences, marker_occurrences
  FROM emplay_hp.blog_posts
  WHERE slug = 'chatgpt-ads-guide';

  IF target_rows <> 1 THEN
    RAISE EXCEPTION 'chatgpt-ads-guideが1件ではありません: %件', target_rows;
  END IF;

  IF marker_occurrences = 1 THEN
    RETURN;
  END IF;

  IF marker_occurrences <> 0 OR source_occurrences <> 1 THEN
    RAISE EXCEPTION '表示イメージ追加前の本文が想定外です: 置換元=%件、マーカー=%件', source_occurrences, marker_occurrences;
  END IF;
END $$;

UPDATE emplay_hp.blog_posts
SET
  content = replace(
    content,
    '広告はChatGPTの回答下に表示されることがあり、通常は次の要素を含みます。',
    $preview$広告はChatGPTの回答下に、回答本文とは分離された広告ユニットとして表示されることがあります。まず、画面上でどのように見えるのかをイメージで確認しましょう。

[[CHATGPT_AD_PREVIEW]]

上の図はOpenAIの公式仕様をもとにEMPLAYが作成した表示例で、実際の配信画面をそのまま複製したものではありません。広告の位置やデザインは今後変わる可能性がありますが、広告主名と広告表記が付き、回答とは別の枠として表示される点が重要です。

広告ユニットには通常、次の要素が含まれます。$preview$
  ),
  updated_at = TIMESTAMPTZ '2026-09-08 00:00:00+09'
WHERE slug = 'chatgpt-ads-guide'
  AND strpos(content, '[[CHATGPT_AD_PREVIEW]]') = 0;

DO $$
DECLARE
  marker_occurrences integer;
BEGIN
  SELECT COALESCE(sum(
    (length(content) - length(replace(content, '[[CHATGPT_AD_PREVIEW]]', '')))
    / length('[[CHATGPT_AD_PREVIEW]]')
  ), 0)
  INTO marker_occurrences
  FROM emplay_hp.blog_posts
  WHERE slug = 'chatgpt-ads-guide';

  IF marker_occurrences <> 1 THEN
    RAISE EXCEPTION 'ChatGPT広告の表示イメージ追加後のマーカー数が想定外です: %件', marker_occurrences;
  END IF;
END $$;
