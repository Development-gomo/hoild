'use client';

import Image from "next/image";

export default function HomeUsp({ data }) {
  if (!data) return null;

  const uspImage = data?.usp_main_image || '';
  const usps = data?.usps || [];

  return (
    <section id="main-usp" className="w-full py-12 bg-drk">
      {/* Content container */}
      <div className="web-width px-6 py-10 flex flex-col items-center">
        {/* Main USP Image */}
        {uspImage && (
          <Image
            src={uspImage}
            alt="USP Main Image"
            width={975}
            height={485}
            className="gif-img"
          />
        )}

        {/* USP Repeater (Three USPs in a Row) */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-[145px] mt-12">
          {usps.map((usp, index) => {
            const uspIconUrl = usp?.usp_icon || '';
            const usp_title = usp?.usp_title || '';
            const usp_subtext = usp?.usp_subtext || '';

            return (
              <div key={index} className="flex flex-col">
                {/* Icon and Title in one line */}
                <div className="flex items-center gap-4 mb-4">
                  {/* USP Icon */}
                  {uspIconUrl ? (
                    <Image
                      src={uspIconUrl}
                      alt={usp_title || 'USP Icon'}
                      width={28}
                      height={28}
                      className="flex-shrink-0"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-gray-200 flex items-center justify-center flex-shrink-0">
                      <span>No Icon</span>
                    </div>
                  )}

                  {/* USP Title */}
                  {usp_title && (
                    <p className="text-white fs24 fw500">{usp_title}</p>
                  )}
                </div>

                {/* USP Subtext */}
                {usp_subtext && (
                  <p className="text-white">{usp_subtext}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
