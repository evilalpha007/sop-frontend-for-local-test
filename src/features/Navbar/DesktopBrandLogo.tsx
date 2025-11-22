"use client";
import { TCountry } from "@/api/get-countries";
import NextImage from "@/components/elements/images/NextImage";
import useCountryRouting from "@/library/hooks/useCountryRouting";
import Link from "next/link";
import { memo } from "react";

interface IDesktopBrandLogoProps {
  defaultCountry?: string | null | undefined;
  countries: TCountry[];
}

const DesktopBrandLogo = ({
  countries,
  defaultCountry,
}: IDesktopBrandLogoProps) => {
  const { countryToRedirect } = useCountryRouting({
    countryData: countries,
  });
  return (
    <div className="relative lg:pl-[108px]">
      <Link href={countryToRedirect}>
        <NextImage
          src="/images/logo/primary-logo.svg"
          alt="SOP brand logo"
          // width={21}
          width={100}
          height={100}
          disableBlur
          priority
          // className="h-10 w-[21px]"
          className="h-full w-10 shrink-0"
        />
      </Link>
    </div>
  );
};

export default memo(DesktopBrandLogo);
