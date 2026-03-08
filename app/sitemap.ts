import type { MetadataRoute } from "next";
import { SITE_URL } from "../lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastMod = new Date("2026-03-01");
  return [
    { url: `${SITE_URL}/`, lastModified: lastMod, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/guide`, lastModified: lastMod, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/faq`, lastModified: lastMod, changeFrequency: "monthly", priority: 0.85 },
    { url: `${SITE_URL}/glossary`, lastModified: lastMod, changeFrequency: "monthly", priority: 0.85 },
    { url: `${SITE_URL}/articles`, lastModified: lastMod, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/articles/how-to-set-delay-time-by-bpm`, lastModified: lastMod, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/articles/reverb-pre-delay-explained`, lastModified: lastMod, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/about`, lastModified: lastMod, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/terms`, lastModified: lastMod, changeFrequency: "yearly", priority: 0.6 },
    { url: `${SITE_URL}/privacy`, lastModified: lastMod, changeFrequency: "yearly", priority: 0.6 },
    { url: `${SITE_URL}/cookie-policy`, lastModified: lastMod, changeFrequency: "yearly", priority: 0.6 },
    { url: `${SITE_URL}/contact`, lastModified: lastMod, changeFrequency: "yearly", priority: 0.5 },
  ];
}
