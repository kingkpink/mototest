import type { MetadataRoute } from "next";

const BASE = "https://pamotorcycletest.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/about", "/exam", "/practice", "/guide"].map((p) => ({
    url: `${BASE}${p}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: p === "" ? 1 : 0.8,
  }));
}
