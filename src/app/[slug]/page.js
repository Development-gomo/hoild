// src/app/[slug]/page.js

import PageBuilder from "@/components/PageBuilder";
import { fetchPageData, fetchMediaById } from "@/lib/api/wp";
import { buildMetadataFromYoast } from "@/lib/seo";
import { notFound } from "next/navigation";

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

  // Resolve media IDs → URLs
  const resolvedBuilder = await Promise.all(
    builder.map(async (section) => {
      // Banner background image
      if (section.acf_fc_layout === "banner" && section.bg_image) {
        const media = await fetchMediaById(section.bg_image);
        return {
          ...section,
          bg_image_url: media?.source_url || "",
        };
      }

      // Image + Text section image
      if (section.acf_fc_layout === "image_text" && section.image) {
        const media = await fetchMediaById(section.image);
        return {
          ...section,
          image_url: media?.source_url || "",
        };
      }

      return section;
    })
  );

  return (
    <main className="min-h-screen bg-zinc-50 font-sans">
      <div className="mx-auto max-w-5xl px-6 py-14 flex flex-col gap-10">
        <PageBuilder sections={resolvedBuilder} />
      </div>
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
