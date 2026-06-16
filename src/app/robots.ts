import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Crawling is allowed broadly so search engines can read each page's own
// robots meta (noindex,follow on thin pages) and follow internal links. Query
// facets are disallowed to avoid crawl waste. Retrieval AI crawlers that cite
// sources are welcomed; we do not block them. Per the house SEO rule we do not
// publish an llms.txt (Google does not use it as of 2026).
export default function robots(): MetadataRoute.Robots {
  const retrievalAgents = [
    "OAI-SearchBot",
    "ChatGPT-User",
    "PerplexityBot",
    "Perplexity-User",
    "ClaudeBot",
    "Claude-User",
    "Google-Extended",
  ];

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/*?"] },
      ...retrievalAgents.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
