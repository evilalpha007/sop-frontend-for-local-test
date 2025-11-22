"use client";
import { usePathname } from "next/navigation";
import BuyRentSection from "../BuyRentSection";

const BuyRentSectionCountry = () => {
  const path = usePathname();

  return (
    <>
      {path.includes("in") ? null : (
        <BuyRentSection className="mt-[30px] md:mt-[144px]" />
      )}
    </>
  );
};

export default BuyRentSectionCountry;
