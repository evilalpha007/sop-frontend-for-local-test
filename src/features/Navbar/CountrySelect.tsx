"use client";
import { FC, useEffect, useState } from "react";
import CountryIcons from "./CountryIcons";
import Dropdown from "@/components/elements/dropdown/Dropdown";
import NextImage from "@/components/elements/images/NextImage";
import { TCountry } from "@/api/get-countries";
import { usePathname } from "next/navigation";

interface CountrySelectProps {
  countries: TCountry[];
  direction?: "vertical" | "horizontal";
}

const CountrySelect: FC<CountrySelectProps> = ({
  countries,
  direction = "horizontal",
}) => {
  const pathname = usePathname();
  const selectedCountry = pathname.split("/")[1];
  const [defaultCountry, setDefaultCountry] = useState<TCountry>();
  useEffect(() => {
    const tempCountry = countries.find(
      (country: TCountry) => country.code === selectedCountry,
    );
    if (!tempCountry) {
      setDefaultCountry(
        countries.find((country: TCountry) => country.code === "uae"),
      );
    } else {
      setDefaultCountry(tempCountry);
    }
  }, [pathname, selectedCountry, countries]);

  return (
    <Dropdown
      title={
        <>
          <NextImage
            key={defaultCountry?.id}
            src={defaultCountry?.flag || ""}
            alt={defaultCountry?.code || "country flag"}
            width={30}
            height={30}
            className="w-6"
            disableBlur
          />
          <NextImage
            src="/svg-icons/navbar/arrow-down.svg"
            alt="arrow down icon"
            width={11}
            height={6}
            disableBlur
            priority
            className="ml-2 h-1.5 w-[11px] shrink-0"
          />
        </>
      }
      minW={false}
      content={
        <div className="flex justify-center p-2">
          <CountryIcons
            data={countries?.filter((country) => {
              return (
                !!country.code &&
                !!defaultCountry?.code &&
                country.code !== defaultCountry?.code
              );
            })}
            direction={direction}
          />
        </div>
      }
      enableHoverMode
    />
  );
};

export default CountrySelect;
