export default function PoweredStrip() {
  const brands = [
    "Meta",
    "Google",
    "TikTok",
    "Twitter",
    "Reddit",
    "Linkedin",
  ];

  return (
    <section className="max-w-6xl mx-auto px-6 mt-20 cursor-default">

      <div className="text-center mb-10">
        <p className="text-xs uppercase tracking-widest text-blue-600/80">
          Powered By
        </p>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6">
        {brands.map((brand) => (
          <div
            key={brand}
            className="
              text-gray-400
              text-sm
              font-medium
              tracking-wide
              transition
              duration-300
              hover:text-gray-700
              border border-gray-500
              rounded
              px-2
            "
          >
            {brand}
          </div>
        ))}
      </div>

    </section>
  );
}
