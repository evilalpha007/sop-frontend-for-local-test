"use client";

import { FC } from "react";
import LinkIcon from "../Footer/LinkIcons/LinkIcon";
import { usePathname } from "next/navigation";
import { useCookies } from "next-client-cookies";

interface CountryIconsProps {
  data: any;
  direction?: "vertical" | "horizontal";
}

const CountryIcons: FC<CountryIconsProps> = ({
  data,
  direction = "horizontal",
}) => {
  const cookies = useCookies();
  const pathname = usePathname();
  const [selectedCountry] = pathname.split("/")[1];
  let defaultCountry = data.find(
    (country: any) => country.code === selectedCountry,
  );
  if (!defaultCountry) {
    defaultCountry = "uae";
  }
  const processedData = data.map((country: any) => ({
    id: country.id,
    icon: country.flag,
    alt: country.name,
    code: country.code,
    link: country.code === "uae" ? "/" : `/${country.code}`,
  }));
  return (
    <div
      className="flex items-center gap-x-4"
      style={{ flexDirection: direction === "vertical" ? "column" : "row" }}
    >
      {processedData.map((icon: any) => (
        <LinkIcon
          external
          key={icon.id}
          {...icon}
          onClick={() => {
            cookies.set("country", icon.code);
          }}
        />
      ))}
    </div>
  );
};

export default CountryIcons;
