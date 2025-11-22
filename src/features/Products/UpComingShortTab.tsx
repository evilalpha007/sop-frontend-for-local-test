import Link from "next/link";

const tabData = [
  {
    id: crypto.randomUUID(),
    name: "Listing Details",
    url: "#ListingDetails",
  },
  {
    id: crypto.randomUUID(),
    name: "Description",
    url: "#Description",
  },
  {
    id: crypto.randomUUID(),
    name: "Floor Plan",
    url: "#FloorPlan",
  },
  {
    id: crypto.randomUUID(),
    name: "360° Viewport",
    url: "#Viewport",
  },
  {
    id: crypto.randomUUID(),
    name: "Features & Amenities",
    url: "#FeaturesAmenities",
  },
  {
    id: crypto.randomUUID(),
    name: "Location",
    url: "#Location",
  },
  {
    id: crypto.randomUUID(),
    name: "DLD Permit Number",
    url: "#DLDPermitNumber",
  },
  {
    id: crypto.randomUUID(),
    name: "Now In Youtube",
    url: "#NowInYoutube",
  },
  {
    id: crypto.randomUUID(),
    name: "Book Your Viewing",
    url: "#BookYourViewing",
  },
  // {
  //   id: crypto.randomUUID(),
  //   name: "Dubai Marina",
  //   url: "#DubaiMarina",
  // },

  {
    id: crypto.randomUUID(),
    name: "Frequently Asked Questions",
    url: "#FrequentlyAskedQuestions",
  },
  // {
  //   id: crypto.randomUUID(),
  //   name: "Highlight",
  //   url: "#Highlight",
  // },
  // {
  //   id: crypto.randomUUID(),
  //   name: "Average Prices",
  //   url: "#AveragePrices",
  // },
];

const UpComingShortTab = () => {
  return (
    <div>
      {/* show with active status button */}
      <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4">
        {tabData.map((item) => (
          <Link
            className="border border-theme-green-gray/40 px-2 py-1.5 text-sm text-white/40 transition-all duration-300 hover:bg-theme-light-golden hover:text-theme-black md:px-4 md:py-2 md:text-[15px]"
            href={item.url}
            key={item.id}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UpComingShortTab;
