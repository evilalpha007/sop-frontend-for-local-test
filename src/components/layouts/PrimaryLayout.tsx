import Footer from "@/features/Footer";
import HeroModalImage from "@/features/modals/HeroModalImage";
import Navbar from "@/features/Navbar";
import PromptConsultation from "@/features/PromptConsultation";
import QuickLinks from "@/features/QuickLinks";
import Section from "../blocks/Section/index";
import StickyButtonGroup from "../blocks/StickyButtonGroup";
import { cookies, headers } from "next/headers";
import { getPopupData } from "@/api/get-popup-data";
import { getCountries, TCountry } from "@/api/get-countries";

interface IPrimaryLayoutProps {
  children: React.ReactNode;
  country?: string;
  params?: any;
  pathname?: string;
}

const PrimaryLayout = async ({
  children,
  country,
  params,
  pathname,
}: IPrimaryLayoutProps) => {
  const { countries } = await getCountries();
  const headerList = headers();
  const pathname2 = headerList.get("x-current-path");
  const countryName = pathname2?.split("/")[1];
  let defaultCountry = countries.find(
    (country: TCountry) => country.code === countryName,
  );

  if (!defaultCountry) {
    defaultCountry = countries.find(
      (country: TCountry) => country.code === "uae",
    );
  }
  const country2 = defaultCountry?.code;
  const popupData = await getPopupData({ country: country2 });
  return (
    <div>
      {/* <LenisLayoutWrapper> */}
      <Navbar />
      {children}
      {countryName != "ca" && (
        <>
          <PromptConsultation />
          <Section.Container className="mb-[107px] mt-[113px]">
            <QuickLinks country={country2 ?? "uae"} />
          </Section.Container>
        </>
      )}
      <Footer />

      <StickyButtonGroup />
      <HeroModalImage data={popupData} />
      {/* </LenisLayoutWrapper> */}
    </div>
  );
};

export default PrimaryLayout;
