"use client";

import Image from "next/image";

function getImageUrl(field) {
  if (!field) return null;
  if (typeof field === "string") return field || null;
  if (typeof field === "object") {
    return field?.url || field?.source_url || field?.src || null;
  }
  return null;
}

export default function ThreeColStructure({ data }) {
  if (!data) return null;

  // ACF repeater for this layout is `column_data` (fallbacks included)
  const items = data?.column_data || data?.column_details || data?.three_col_structure || data?.items || [];

  return (
    <section className="w-full py-12">
      <div className="web-width px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[35px]">
          {items.map((item, idx) => {
            const rawImg = item?.column_image || item?.image || null;
            const img = getImageUrl(rawImg);
            const title = item?.title || "";
            const desc = item?.description || "";

            return (
              <div key={idx} className="border p-6 flex flex-col">
                {img ? (
                  <div className="w-full h-40 mb-4 overflow-hidden">
                    <Image src={img} alt={title || ""} width={800} height={400} className="object-cover w-full h-full" />
                  </div>
                ) : null}

                {title && <h3 className="text-lg font-medium mb-2 text-left">{title}</h3>}

                {desc && (
                  <div className="prose max-w-none text-left" dangerouslySetInnerHTML={{ __html: desc }} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
