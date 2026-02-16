// src/components/sections/inner/InnerHeroSection.jsx
"use client";

import Image from "next/image";
import Link from "next/link";

/**
 * Inner Hero Section (ACF layout: inner_hero_section)
 * Fields used from your ACF JSON:
 * - background_type: none | light | dark | brand | custom
 * - background_color (only if custom)
 * - heading (required)
 * - subheading
 * - hero_image (image array)
 * - cta (link)
 */

function getBgClass(backgroundType) {
  switch (backgroundType) {
    case "light":
      return "bg-gray-50 text-black";
    case "dark":
      return "bg-black text-white";
    case "brand":
      return "bg-[#000821] text-white";
    case "custom":
    case "none":
    default:
      return "";
  }
}

export default function InnerHeroSection({ data }) {
  if (!data) return null;

  const {
    background_type,
    background_color,
    heading,
    subheading,
    hero_image,
    cta,
  } = data;

  const bgType = background_type || "dark";

  // ACF image return format "array" can vary.
  // Support common keys: url OR source_url
  const heroImgUrl = hero_image?.url || hero_image?.source_url || "";
  const heroImgAlt = hero_image?.alt || heading || "Service hero";

  // ACF link field commonly returns: { url, title, target }
  const ctaUrl = cta?.url || "";
  const ctaTitle = cta?.title || "";
  const ctaTarget = cta?.target || "_self";

  return (
    <section
      className={`w-full relative flex flex-col md:flex-row items-center justify-between min-h-[70vh] py-12 md:py-16 ${getBgClass(
        bgType
      )}`}
      style={
        bgType === "custom" && background_color
          ? { backgroundColor: background_color }
          : undefined
      }
    >
      {/* Background image option (if hero image exists AND user wants image-like hero)
          We do NOT force overlay; we keep it similar to your HomeHero approach.
          If you want always solid background, remove this block.
      */}
      {heroImgUrl ? (
        <div className="absolute inset-0">
          <Image
            src={heroImgUrl}
            alt={heroImgAlt}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
      ) : null}

      {/* Content container */}
      <div className="web-width px-6 py-10 relative z-10 flex w-full flex-col md:flex-row md:gap-[10%]">
        {/* Left side */}
        <div className="w-full">
          {heading && <h1 className="text-4xl text-center font-bold">{heading}</h1>}

          {subheading && (
            <p className="mt-3 max-w-xl text-lg md:text-lg mb-10 opacity-95">
              {subheading}
            </p>
          )}

          {ctaUrl && (
            <Link
              href={ctaUrl}
              target={ctaTarget}
              className="inline-flex bg-white px-6 py-3 text-black btn-blue"
            >
              {ctaTitle || "Learn more"}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
