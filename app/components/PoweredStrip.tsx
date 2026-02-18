export default function PoweredStrip() {
  const brands = [
    "Meta",
    "Google",
    "TikTok",
    "Shopify",
    "HubSpot",
    "Salesforce",
  ];

  return (
    <section className="max-w-6xl mx-auto px-6 mt-20">

      <div className="text-center mb-10">
        <p className="text-xs uppercase tracking-widest text-blue-600/80">
          Powered By
        </p>
        <h3 className="text-lg font-medium text-gray-900 mt-3">
          Platforms We Capture Signals From
        </h3>
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
            "
          >
            {brand}
          </div>
        ))}
      </div>

    </section>
  );
}
