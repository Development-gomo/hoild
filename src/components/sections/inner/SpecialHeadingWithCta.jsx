"use client";

import Link from "next/link";

export default function SpecialHeadingWithCta({ data }) {
  if (!data) return null;

  const main_heading = data?.main_heading || "";
  const text_above_heading = data?.text_above_heading || "";
  const text_below_heading = data?.text_below_heading || "";
  const cta = data?.cta || null;

  return (
    <section className="w-full py-12">
      <div className="web-width px-6">
        <div className="max-w-3xl mx-auto text-center">

          {text_above_heading && (
            <div className="inline-flex items-center justify-center gap-3 mb-4">
              <span className="w-3 h-3 bg-blue-600 block rounded-sm" aria-hidden="true" />
              <p className="sub-heading-above">{text_above_heading}</p>
            </div>
          )}

          {main_heading && (
            <h2 className="special-heading" dangerouslySetInnerHTML={{ __html: main_heading }} />
          )}

          <div className="mt-6 pt-6 border-t border-dashed border-black/20">
            {text_below_heading && (
              <p className="sub-heading-above">{text_below_heading}</p>
            )}

            {cta && cta.url && (
              <div className="mt-6">
                <Link href={cta.url} target={cta.target || "_self"} className="inline-flex items-center gap-2 bg-[#2D5BFF] text-white text-xs md:text-sm px-5 py-3">
                  <span className="inline-block w-1.5 h-1.5 bg-white" />
                  {cta.title || "Learn more"}
                </Link>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
