import { getCountries } from "@/api/get-countries";
import Dropdown from "@/components/elements/dropdown/Dropdown";
import NextImage from "@/components/elements/images/NextImage";
import ToggleContextProvider from "@/library/contexts/ToggleContextProvider";
import Link from "next/link";
import LinkIcons from "../Footer/LinkIcons";
import BookmarkButton from "./BookmarkButton";
import DesktopBrandLogo from "./DesktopBrandLogo";
import MobileMenu from "./MobileMenu";
import NavLinks from "./NavLinks";
import WhatsAppIcon from "./WhatsAppIcon";
import CountryIcons from "./CountryIcons";
import { headers } from "next/headers";
import CountrySelect from "./CountrySelect";

// const customUrlPurser = (href: string) => {
//   const url = new URL(href);
//   //  // console.log("url: ", url);
//   return url;
// };
export type TCountry = {
  id?: number;
  code?: string;
  flag?: string;
};

const Navbar = async () => {
  const { countries } = await getCountries();
  const headerList = headers();
  const pathname = headerList.get("x-current-path");
  const countryName = pathname?.split("/")[1];
  let defaultCountry = countries.find(
    (country: TCountry) => country.code === countryName,
  );

  if (!defaultCountry) {
    defaultCountry = countries.find(
      (country: TCountry) => country.code === "uae",
    );
  }
  const country = defaultCountry?.code;
  return (
    <div className="pb-10 lg:pb-0">
      <nav className="sticky top-0 z-50 hidden items-center justify-between bg-theme-black/70 py-2.5 backdrop-blur-sm lg:flex">
        <div className="flex items-center gap-[57px]">
          <DesktopBrandLogo
            countries={countries}
            defaultCountry={defaultCountry?.code}
          />

          <div className="">
            <NavLinks />
          </div>
        </div>

        <div className="flex items-center">
          <div className="flex items-center gap-[14px]">
            <ToggleContextProvider>
              <Dropdown
                title={
                  <div className="flex items-center gap-[6px]">
                    <p className="text-[15px] font-normal text-theme-light-golden">
                      Follow us
                    </p>

                    <NextImage
                      src="/svg-icons/navbar/arrow-down.svg"
                      alt="arrow down icon"
                      width={11}
                      height={6}
                      disableBlur
                      priority
                      className="h-1.5 w-[11px] shrink-0"
                    />
                  </div>
                }
                content={
                  <div className="flex justify-center p-2">
                    <LinkIcons country={country} />
                  </div>
                }
                enableHoverMode
              />
            </ToggleContextProvider>

            <div className="flex items-center gap-[25px]">
              <Link
                href={`${defaultCountry?.code === "in" ? "tel:+918884418110" : "tel:+971551307662"}`}
                target="_blank"
                className="w-fit"
              >
                <NextImage
                  src="/svg-icons/navbar/phone-call.svg"
                  alt="Phone call icon"
                  width={21}
                  height={21}
                  disableBlur
                  priority
                  className="size-[19px]"
                />
              </Link>

              <WhatsAppIcon />
              <ToggleContextProvider>
                <CountrySelect countries={countries} direction={"vertical"} />
              </ToggleContextProvider>
            </div>
          </div>

          <div className="flex items-center gap-[22.75px] pr-7"></div>
        </div>
      </nav>

      <MobileMenu data={countries} defaultData={defaultCountry} />
    </div>
  );
};

export default Navbar;
