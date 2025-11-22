import React from "react";
import Brand from "./Brand";

const brandsMarqueeData = [
  {
    id: crypto.randomUUID(),
    image: "/images/brands-marquee/1.svg",
  },
  {
    id: crypto.randomUUID(),
    image: "/images/brands-marquee/2.svg",
  },
  {
    id: crypto.randomUUID(),
    image: "/images/brands-marquee/3.svg",
  },
  {
    id: crypto.randomUUID(),
    image: "/images/brands-marquee/4.svg",
  },
  {
    id: crypto.randomUUID(),
    image: "/images/brands-marquee/5.svg",
  },
  {
    id: crypto.randomUUID(),
    image: "/images/brands-marquee/6.svg",
  },
  {
    id: crypto.randomUUID(),
    image: "/images/brands-marquee/7.svg",
  },
  {
    id: crypto.randomUUID(),
    image: "/images/brands-marquee/1.svg",
  },
  {
    id: crypto.randomUUID(),
    image: "/images/brands-marquee/2.svg",
  },
  {
    id: crypto.randomUUID(),
    image: "/images/brands-marquee/3.svg",
  },
  {
    id: crypto.randomUUID(),
    image: "/images/brands-marquee/4.svg",
  },
  {
    id: crypto.randomUUID(),
    image: "/images/brands-marquee/5.svg",
  },
  {
    id: crypto.randomUUID(),
    image: "/images/brands-marquee/6.svg",
  },
  {
    id: crypto.randomUUID(),
    image: "/images/brands-marquee/7.svg",
  },
];

const BrandList = () => {
  return (
    <div className="flex items-center gap-4">
      {brandsMarqueeData?.map((brand) => <Brand key={brand.id} {...brand} />)}
    </div>
  );
};

export default BrandList;
