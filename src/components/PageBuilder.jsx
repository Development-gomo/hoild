
import dynamic from "next/dynamic";

// Home sections
const HomeHero = dynamic(() => import("./sections/home/HomeHero"));
const ImageContentSection = dynamic(() => import("./sections/home/ImageContentSection"));
const HomeUsp = dynamic(() => import("./sections/home/HomeUsp")); // Importing HomeUsp
const SpeacialHeading = dynamic(() => import("./sections/home/SpeacialHeading")); // Importing SpeacialHeading

export default function PageBuilder({ sections }) {
  if (!sections || !sections.length) return null;

  // Identify groups of consecutive image_content_section blocks with their indices
  const groups = [];
  let currentGroup = [];
  let currentGroupIndices = [];

  sections.forEach((block, sectionIndex) => {
    if (block.acf_fc_layout === 'image_content_section') {
      currentGroup.push(block);
      currentGroupIndices.push(sectionIndex);
    } else {
      if (currentGroup.length > 0) {
        groups.push({
          blocks: currentGroup,
          indices: currentGroupIndices
        });
        currentGroup = [];
        currentGroupIndices = [];
      }
    }
  });
  if (currentGroup.length > 0) {
    groups.push({
      blocks: currentGroup,
      indices: currentGroupIndices
    });
  }

  // Create a map using section indices to track which blocks should have numbers
  const indexMap = {};
  groups.forEach((group) => {
    if (group.blocks.length > 1) {
      // Only number groups with 2 or more consecutive blocks
      group.indices.forEach((sectionIndex, idx) => {
        indexMap[sectionIndex] = idx + 1;
      });
    }
  });

  return (
    <>
      {sections.map((block, index) => {
        switch (block.acf_fc_layout) {
          case "banner":
            return <HomeHero key={index} data={block} />;

          case "image_content_section":
            const blockIndex = indexMap[index] || 0;
            return <ImageContentSection key={index} data={block} index={blockIndex} />;

          case "usp_section":
            return <HomeUsp key={index} data={block} />;

          case "speacial_heading": 
            return <SpeacialHeading key={index} data={block} />; 

          default:
            return null;
        }
      })}
    </>
  );
}
