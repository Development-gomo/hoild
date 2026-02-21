// src/components/InnerPageBuilder.jsx
import dynamic from "next/dynamic";

// Inner page sections (create these files as you build each section)
const InnerHeroSection = dynamic(() => import("./sections/inner/InnerHeroSection"));
const ContentBlock = dynamic(() => import("./sections/inner/ContentBlock"));
const TwoColumnContentSection = dynamic(() => import("./sections/inner/TwoColumnContentSection"));
const ContactSection = dynamic(() => import("./sections/inner/ContactSection"));

export default function InnerPageBuilder({ sections }) {
    if (!sections || !sections.length) return null;

  return (
    <>
      {sections.map((block, index) => {
        switch (block.acf_fc_layout) {
          case "inner_hero_section":
            return <InnerHeroSection key={index} data={block} />;

          case "content_block":
            return <ContentBlock key={index} data={block} />;

          case "two_column_content_section":
            return <TwoColumnContentSection key={index} data={block} />;

          case "contact_section":
            return <ContactSection key={index} data={block} />;

          // Add later when ready
          // case "feature_grid_section":
          //   return <FeatureGridSection key={index} data={block} />;
          // case "stats_section":
          //   return <StatsSection key={index} data={block} />;
          // case "process_section":
          //   return <ProcessSection key={index} data={block} />;
          // case "faq_section":
          //   return <FaqSection key={index} data={block} />;
          // case "cta_section":
          //   return <CtaSection key={index} data={block} />;

          default:
            return null;
        }
      })}
    </>
  );
}
