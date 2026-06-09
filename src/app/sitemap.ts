import type { MetadataRoute } from "next";

const BASE = "https://pamotorcycletest.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/about", "/exam", "/practice", "/guide"].map((p) => ({
    url: `${BASE}${p}`,
    changeFrequency: "monthly",
    priority: p === "" ? 1 : 0.8,
  }));
}
