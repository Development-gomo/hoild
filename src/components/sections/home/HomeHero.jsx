"use client";

export default function HomeHero({ data }) {
  const { bg_video, bg_image, logo_gallery } = data || {};

  const bgImageUrl = bg_image?.source_url || "";
  const bgVideo = bg_video || "";

  return (
    <section id="main-hero" className="w-full relative flex flex-col md:flex-row items-center justify-between min-h-[95vh] py-12 md:py-16">
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
            backgroundImage: `url(${bgImageUrl || "#111"})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      )}

      {/* Content container - added gap-[10%] for spacing between columns */}
      <div className="web-width px-6 py-10 relative z-10 flex w-full flex-col md:flex-row md:gap-[10%]">
        {/* Left side (50%) for Title, Subtitle, and Button */}
        <div className="w-full md:w-1/2 text-white">
          <h1 className="text-4xl font-bold">{data?.heading}</h1>

          {data?.subheading && (
            <p className="mt-3 max-w-xl text-lg mb-32">{data.subheading}</p>
          )}

          {data?.button_label && data?.button_url && (
            <a
              href={data.button_url}
              className="inline-flex bg-white px-6 py-3 text-black btn-blue"
            >
              {data.button_label}
            </a>
          )}
        </div>

        {/* Right side (40%) for logo gallery - removed pl-6, adjusted width */}
        <div className="w-full md:w-[40%] mt-big">
          {/* Loop through logo_gallery ACF field and display logos */}
          <div className="mt-6 grid grid-cols-3 gap-0">
            {logo_gallery &&
              logo_gallery.map((logo, index) => {
                const isLastColumn = (index + 1) % 3 === 0;
                const isLastRow = index >= logo_gallery.length - (logo_gallery.length % 3 || 3);

                return (
                  <div
                    key={index}
                    className={`flex justify-center items-center p-6 border-dashed border-white/20
                      ${!isLastColumn ? 'border-r' : ''} 
                      ${!isLastRow ? 'border-b' : ''}`}
                  >
                    <img
                      src={logo.client_logo}
                      alt={`Client Logo ${index + 1}`}
                      className="h-12 w-auto object-contain"
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
}
