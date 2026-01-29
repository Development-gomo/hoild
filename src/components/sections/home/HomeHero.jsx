'use client';
export default function HomeHero({ data }) {
  // Destructure the data object
  const { bg_video, bg_image } = data || {};

  // Get the background image URL from the resolved media object
  const bgImageUrl = bg_image?.source_url || ''; // Background image URL
  const bgVideo = bg_video || ''; // Background video URL

  return (
  <section className="w-full relative flex flex-col md:flex-row items-center justify-between h-[95vh]">
  {/* Full-width background section */}
  {bgVideo ? (
    <video
      className="absolute w-full h-full object-cover"
      autoPlay
      loop
      muted
    >
      <source src={bgVideo} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  ) : (
    <div
      className="absolute w-full h-full bg-cover bg-center"
      style={{
        backgroundImage: `url(${bgImageUrl || '#111'})`, // Fallback to a solid color or image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    />
  )}

  {/* Content container */}
  <div className="web-width px-6 py-10 relative z-10 flex w-full flex-col md:flex-row">
    {/* Left side (50%) for Title, Subtitle, and Button */}
    <div className="w-full md:w-1/2 text-white">
      <h2 className="text-4xl font-bold">{data?.heading}</h2>

      {data?.subheading && (
        <p className="mt-3 max-w-xl text-lg opacity-90">
          {data.subheading}
        </p>
      )}

      {data?.button_label && data?.button_url && (
        <a
          href={data.button_url}
          className="inline-flex mt-6 rounded-full bg-white px-6 py-3 text-black font-semibold"
        >
          {data.button_label}
        </a>
      )}
    </div>

    {/* Right side (50%) for content, will remain visible and responsive */}
    <div className="w-full md:w-1/2 pl-6 mt-6 md:mt-0">
      {/* Placeholder text for now */}
      <h2 className="text-3xl text-white opacity-70">Coming Soon</h2>
    </div>
  </div>
</section>
  );
}
