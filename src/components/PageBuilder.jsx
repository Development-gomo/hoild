import dynamic from "next/dynamic";

// Home sections
const HomeHero = dynamic(() => import("./sections/home/HomeHero"));
const HomeImageText = dynamic(() => import("./sections/home/HomeImageText"));
const HomeUsp = dynamic(() => import("./sections/home/HomeUsp")); // Importing HomeUsp

export default function PageBuilder({ sections }) {
  if (!sections || !sections.length) return null;

  return (
    <>
      {sections.map((block, index) => {
        switch (block.acf_fc_layout) {
          case "banner":
            return <HomeHero key={index} data={block} />;

          case "image_text":
            return <HomeImageText key={index} data={block} />;

          case "usp_section": // New case for HomeUsp
            return <HomeUsp key={index} data={block} />;

          default:
            return null;
        }
      })}
    </>
  );
}
