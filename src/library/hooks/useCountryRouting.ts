// import { countryIconsData } from "@/features/Navbar/MobileMenu/CountrySelect";
// import { TCountry } from "@/features/Navbar";
"use client";
import { TCountry, TCountryCode } from "@/api/get-countries";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// export type TCountries = "ae" | "in" | "au" | "us" | "uk" | "ca";

export type TCountryParams =
  | {
      country?: TCountryCode;
    }
  | undefined;

interface IGlobalHomePageProps {
  params?: TCountryParams;
}

type TUseCountryRoutingProps = {
  countryData: TCountry[];
} | void;

const useCountryRouting = (props: TUseCountryRoutingProps) => {
  const { countryData = [] } = props || {};
  const router = useRouter();
  const params = useParams();
  const pathName = usePathname();
  const selectedCountry = pathName.split("/")[1];
  const [defaultCountry, setDefaultCountry] = useState<TCountry>();
  useEffect(() => {
    const tempCountry = countryData.find(
      (country: TCountry) => country.code === selectedCountry,
    );
    if (!tempCountry) {
      setDefaultCountry(
        countryData.find((country: TCountry) => country.code === "uae"),
      );
    } else {
      setDefaultCountry(tempCountry);
    }
  }, [pathName, selectedCountry, countryData]);

  const currentCountryData: TCountry = countryData?.find(
    (currentCountryData) =>
      !!currentCountryData?.code &&
      !!defaultCountry &&
      currentCountryData?.code === defaultCountry,
  ) ?? {
    id: 1,
    code: "uae",
    flag: "https://flagpedia.net/data/flags/h40/ae.png",
  };

  const countryToRedirect =
    defaultCountry?.code === "uae" ? "/" : `/${defaultCountry?.code}`;

//   console.log("COuntry To Redirect", countryToRedirect);

  const getDynamicPathName =
    ({ pathName }: { pathName: string }) =>
    (countryCode: TCountryCode) => {
      return pathName.replace(`/${countryCode}/`, `${countryToRedirect}`);
    };

  return {
    currentCountryData,
    countryToRedirect,
    router,
    params,
    pathName,
    currentCountry: defaultCountry?.code,
    defaultCountry,
    getDynamicPathName: getDynamicPathName({
      pathName,
    }),
  };
};

export default useCountryRouting;
