// Blog post slugs. Each slug needs a matching `Posts.<slug>` entry in messages/blog/*.json
export const blogSlugs = [
  "airsoft-game-tactics",
  "airsoft-gear-guide",
  "airsoft-rifles-guide",
  "airsoft-safety-rules",
  "what-is-airsoft",
] as const;

export type BlogSlug = (typeof blogSlugs)[number];

export function isBlogSlug(slug: string): slug is BlogSlug {
  return (blogSlugs as readonly string[]).includes(slug);
}

export type BlogSection = { h2?: string; p?: string[]; list?: string[] };
export type BlogContent = { intro?: string; sections?: BlogSection[] };
