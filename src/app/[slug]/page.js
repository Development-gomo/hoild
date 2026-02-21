// src/app/[slug]/page.js

import PageBuilder from "@/components/PageBuilder";
import { fetchPageData, fetchMediaById } from "@/lib/api/wp";
import { buildMetadataFromYoast } from "@/lib/seo";
import { notFound } from "next/navigation";

async function resolveMediaIds(data) {
  if (typeof data !== "object" || data === null) return data;

  if (Array.isArray(data)) {
    return Promise.all(data.map((item) => resolveMediaIds(item)));
  }

  const resolved = { ...data };

  const mediaFields = [
    "usp_icon",
    "usp_main_image",
    "bg_image",
    "background_image",
    "foreground_image",
    "image",
    "icon",
    "thumbnail",
    "avatar",
    "logo",
    "client_logo",
    "feature_icon",
    "featured_image",
    "brand_logo",
    "service_icon",
    "hero_image",
  ];

  for (const [key, value] of Object.entries(resolved)) {
    if (typeof value === "number" && mediaFields.includes(key)) {
      const media = await fetchMediaById(value);
      resolved[key] = media?.source_url || "";
    } else if (typeof value === "object" && value !== null) {
      resolved[key] = await resolveMediaIds(value);
    }
  }

  return resolved;
}

export default async function DynamicPage({ params }) {
  // ✅ IMPORTANT: params is async in App Router (Next 15+)
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  if (!slug) {
    notFound();
  }

  // Fetch page by slug
  const data = await fetchPageData(slug);

  if (!data || !data.length) {
    notFound();
  }

  const acf = data[0].acf || {};
  const builder = acf.page_builder || [];

  // Resolve all known media IDs to URLs
  const resolvedBuilder = await Promise.all(
    builder.map((section) => resolveMediaIds(section))
  );

  return (
    <main className="min-h-screen bg-zinc-50 font-sans">
      <PageBuilder sections={resolvedBuilder} />
    </main>
  );
}

/**
 * ✅ SEO — Yoast → Next.js metadata
 * This runs on the server and injects <head> tags
 */
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  if (!slug) return {};

  const data = await fetchPageData(slug);
  if (!data || !data.length) return {};

  return buildMetadataFromYoast(data[0]);
}
