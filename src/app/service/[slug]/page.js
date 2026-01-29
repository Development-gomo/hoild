import PageBuilder from "@/components/PageBuilder";
import { fetchServiceBySlug, fetchMediaById } from "@/lib/api/wp";
import { buildMetadataFromYoast } from "@/lib/seo";
import { notFound } from "next/navigation";

export default async function ServicePage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  if (!slug) notFound();

  const data = await fetchServiceBySlug(slug);

  if (!data) notFound();

  const acf = data.acf || {};
  const builder = acf.page_builder || [];

  const resolvedBuilder = await Promise.all(
    builder.map(async (section) => {
      if (section.acf_fc_layout === "banner" && section.bg_image) {
        const media = await fetchMediaById(section.bg_image);
        return { ...section, bg_image_url: media?.source_url || "" };
      }

      if (section.acf_fc_layout === "image_text" && section.image) {
        const media = await fetchMediaById(section.image);
        return { ...section, image_url: media?.source_url || "" };
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

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  if (!slug) return {};

  const data = await fetchServiceBySlug(slug);
  if (!data) return {};

  return buildMetadataFromYoast(data);
}
