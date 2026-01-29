'use client';

import Image from "next/image";

export default function HomeUsp({ data }) {
  if (!data) return null;

  const uspImage = data?.usp_main_image || '';
  const usps = data?.usps || [];

  return (
    <section className="w-full flex flex-col items-center py-12">

      {/* Main USP Image */}
      {uspImage && (
        <Image
          src={uspImage}
          alt="USP Main Image"
          width={500}
          height={500}
          className="w-full md:w-1/2 rounded-xl object-cover mb-8"
        />
      )}

      {/* USP Repeater (Three USPs in a Row) */}
      <div className="flex flex-wrap justify-center gap-8">
        {usps.map((usp, index) => {
          const uspIconUrl = usp?.usp_icon || '';
          const usp_title = usp?.usp_title || '';
          const usp_subtext = usp?.usp_subtext || '';

          return (
            <div key={index} className="w-full sm:w-1/3 text-center flex flex-col items-center">
              {/* USP Icon */}
              {uspIconUrl ? (
                <Image
                  src={uspIconUrl}
                  alt={usp_title || 'USP Iconsss'}
                  width={100}
                  height={100}
                  className="w-24 h-24 mb-4 object-contain"
                />
              ) : (
                <div className="w-24 h-24 mb-4 bg-gray-200 flex items-center justify-center">
                  {/* Optional: Placeholder content if icon is missing */}
                  <span>No Icon</span>
                </div>
              )}

              {/* USP Title */}
              {usp_title && (
                <h3 className="text-xl font-semibold text-gray-800">{usp_title}</h3>
              )}

              {/* USP Subtext */}
              {usp_subtext && (
                <p className="text-base text-gray-600 mt-2">{usp_subtext}</p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
