import { TCountryCode } from "@/api/get-countries";
import React from "react";
import { getInSeoMeta } from "@/library/utils/get-in-seo-meta";

export const metadata = getInSeoMeta();

interface ICountryLayoutProps {
  params?: TCountryCode;
  children?: React.ReactNode;
}

const CountryLayout = ({ params, children }: ICountryLayoutProps) => {
  return <>{children}</>;
};

export default CountryLayout;
