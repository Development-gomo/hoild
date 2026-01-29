"use client";

import Image from "next/image";
export default function HomeImageText({ data }) {
  // Destructure the data object
  const { image } = data || {};

  // Get the image URL from the resolved media object
  const img = image?.source_url || '';

  const position =
    data?.image_position === 'right'
      ? 'md:flex-row-reverse'
      : 'md:flex-row';

  return (
    <section
      className={`w-full flex flex-col gap-6 md:flex ${position} items-center rounded-2xl p-8 border`}
    >
      {img && (
        <Image
          src={img}
          alt={data?.title || ''}
         width={500}
         height={500}
          className="w-full md:w-1/2 rounded-xl object-cover"
        />
      )}

      <div className="w-full md:w-1/2">
        {data?.title && (
          <h3 className="text-2xl font-semibold">
            {data.title}
          </h3>
        )}

        {data?.text && (
          <div
            className="mt-3 text-zinc-600"
            dangerouslySetInnerHTML={{ __html: data.text }}
          />
        )}
      </div>
    </section>
  );
}
