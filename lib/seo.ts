export const SITE_URL = "https://bigya.com.np"
export const SITE_NAME = "Bigya Tuladhar"
const DEFAULT_OG = `${SITE_URL}/og.png`

/* Build a full SEO meta descriptor list for a React Router `meta` export:
 * title, description, canonical link, Open Graph + Twitter cards. */
export function seo({
  title,
  description,
  path = "",
  image = DEFAULT_OG,
  type = "website",
}: {
  title: string
  description: string
  path?: string
  image?: string
  type?: "website" | "article"
}) {
  const url = `${SITE_URL}${path}`
  return [
    { title },
    { name: "description", content: description },
    { tagName: "link", rel: "canonical", href: url },
    { property: "og:type", content: type },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { property: "og:image", content: image },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },
  ]
}
