import type { MetadataRoute } from "next";
import { absUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: { path: string; priority: number }[] = [
    { path: "/", priority: 1 },
    { path: "/upload", priority: 0.9 },
    { path: "/pricing", priority: 0.7 },
    { path: "/privacy", priority: 0.3 },
  ];
  return routes.map((r) => ({
    url: absUrl(r.path),
    changeFrequency: "weekly",
    priority: r.priority,
  }));
}
