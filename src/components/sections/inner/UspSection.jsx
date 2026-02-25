"use client";

import Image from "next/image";

export default function UspSection({ data }) {
  if (!data) return null;

  const usps = data?.usps || [];

  return (
    <section id="inner-usp" className="w-full py-12">
      <div className="web-width px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-[145px]">
          {usps.map((usp, index) => {
            const uspIconUrl = usp?.usp_icon || "";
            const usp_title = usp?.usp_title || "";
            const usp_subtext = usp?.usp_subtext || "";

            return (
              <div key={index} className="flex flex-col">
                <div className="flex items-center gap-4 mb-4">
                  {uspIconUrl ? (
                    <Image src={uspIconUrl} alt={usp_title || 'USP Icon'} width={28} height={28} className="flex-shrink-0" />
                  ) : (
                    <div className="w-20 h-20 bg-gray-200 flex items-center justify-center flex-shrink-0">
                      <span>No Icon</span>
                    </div>
                  )}

                  {usp_title && (
                    <p className="text-white fs24 fw500">{usp_title}</p>
                  )}
                </div>

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
