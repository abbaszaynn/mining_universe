/**
 * Topic pills for article cards, derived from the title and slug so every
 * article (including ones published from the ops platform) gets sensible
 * tags without anyone having to maintain them. First match wins within a
 * group; at most two tags per article, topic first, then article type.
 */
const TOPICS: [RegExp, string][] = [
  [/nephrite|jade/i, "Nephrite Jade"],
  [/rare.earth/i, "Rare Earths"],
  [/placer|gold/i, "Gold"],
  [/copper|reko.diq/i, "Copper"],
  [/antimony/i, "Antimony"],
  [/serpentine|minerals.guide|mines.of/i, "Geology"],
];

const TYPES: [RegExp, string][] = [
  [/deal|partnership|stake|saudi|us-critical/i, "Policy & Deals"],
  [/invest/i, "Investment"],
  [/buyer/i, "Buyer Guide"],
  [/guide|how.to|how.investors/i, "Guide"],
  [/mining/i, "Industry"],
];

export function articleTags(article: { id: string; title: string }) {
  const haystack = `${article.id} ${article.title}`;
  const tags: string[] = [];
  const topic = TOPICS.find(([re]) => re.test(haystack));
  if (topic) tags.push(topic[1]);
  // Article types fill the remaining slots, so an article with no mineral
  // topic still gets two pills ("Investment", "Guide").
  for (const [re, label] of TYPES) {
    if (tags.length >= 2) break;
    if (re.test(haystack) && !tags.includes(label)) tags.push(label);
  }
  return tags;
}
