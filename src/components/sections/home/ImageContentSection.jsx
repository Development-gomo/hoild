"use client";

import Image from "next/image";

export default function ImageContentSection({ data, index }) {
  if (!data) return null;

  const {
    foreground_image,
    background_image,
    image_position,
    content_section_title,
    short_description,
    icon_with_text,
  } = data || {};

  const fg = foreground_image?.source_url || foreground_image || "";
  const bg = background_image?.source_url || background_image || "";

  const isImageOnRight = image_position === 'right';

  return (
    <section className="w-full py-12">
      <div className="web-width px-6">
        <div className={`w-full flex flex-col md:flex-row gap-8 md:items-center ${isImageOnRight ? 'md:flex-row-reverse' : ''}`}>

          {/* Image Column */}
          <div className="w-full md:w-1/2">
            <div className="relative">
              {bg && (
                <div
                  className="absolute inset-0 rounded-xl overflow-hidden"
                  style={{
                    backgroundImage: `url(${bg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
              )}

              {fg && (
                <div className="relative z-10 p-6">
                  <Image
                    src={fg}
                    alt={content_section_title || ''}
                    width={800}
                    height={600}
                    className="w-full rounded-xl object-cover"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Step Counter / Divider - Always keep space, show number only if index > 0 */}
          <div className="hidden md:flex w-full md:w-auto justify-center items-center">
            <div className="flex flex-col items-center gap-4">
              {typeof index === 'number' && index > 0 ? (
                <div className="w-16 h-16 rounded-full border-2 border-red-500 flex items-center justify-center">
                  <span className="text-2xl font-bold text-red-500">{index}</span>
                </div>
              ) : (
                <div className="w-16 h-16" />
              )}
            </div>
          </div>

          {/* Content Column */}
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            {content_section_title && (
              <h3 className="text-2xl md:text-3xl font-semibold mb-4">{content_section_title}</h3>
            )}

            {short_description && (
              <div
                className="text-zinc-600 mb-6"
                dangerouslySetInnerHTML={{ __html: short_description }}
              />
            )}

            {icon_with_text && icon_with_text.length > 0 && (
              <ul className="space-y-4">
                {icon_with_text.map((item, idx) => {
                  const iconUrl = item?.feature_icon?.source_url || item?.feature_icon || '';
                  const text = item?.feature_text || '';

                  return (
                    <li key={idx} className="flex items-start gap-4">
                      {iconUrl ? (
                        <Image src={iconUrl} alt={text} width={36} height={36} className="w-9 h-9 object-contain flex-shrink-0" />
                      ) : (
                        <div className="w-9 h-9 bg-gray-200 rounded flex-shrink-0" />
                      )}
                      <p className="text-base text-zinc-600">{text}</p>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
