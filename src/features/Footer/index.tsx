import Section from "@/components/blocks/Section/index";
import Hr from "@/components/elements/border/Hr";
import NextImage from "@/components/elements/images/NextImage";
import Typography from "@/components/elements/texts/Typography";
import { cn } from "@/library/utils/cn";
import Link from "next/link";
import LinkIcons from "./LinkIcons";
import LinksGroup, { ILinksGroupProps } from "./LinksGroup";
import { getCountries, TCountry } from "@/api/get-countries";
import { headers } from "next/headers";
import { getPropertyTypes } from "@/api/get-property-types";

interface IFooterLinksGroupsData {
  id: number | string;
  data: ILinksGroupProps;
  additionalData?: ILinksGroupProps;
  className?: string;
}

const Footer = async () => {
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

  const propertyTypes = await getPropertyTypes({
    country: country == "ca" ? "uae" : country,
  });

  const footerLinksGroupsData: IFooterLinksGroupsData[] = [
    {
      id: crypto.randomUUID(),
      data: {
        id: crypto.randomUUID(),
        title: "Property Types",
        links: propertyTypes
          ?.filter((type) => type?.name)
          .slice(0, 4)
          .map((type) => ({
            id: crypto.randomUUID(),
            text: type?.name || "",
            link:
              country == "in"
                ? `/in/properties?propertyType=${type?.id}`
                : `/properties?propertyType=${type?.id}`,
          })),
      },
    },
    {
      id: crypto.randomUUID(),
      data: {
        id: crypto.randomUUID(),
        title: "Categories",
        links:
          country == "in"
            ? [
                {
                  id: crypto.randomUUID(),
                  text: "Residential",
                  link: "/in/properties?is_front_section=4",
                },
                {
                  id: crypto.randomUUID(),
                  text: "Commercial",
                  link: "/in/properties?is_front_section=5",
                },
                {
                  id: crypto.randomUUID(),
                  text: "Rental",
                  link: "/in/properties?is_front_section=3",
                },
                {
                  id: crypto.randomUUID(),
                  text: "Resale",
                  link: "/in/properties?is_front_section=6",
                },
                {
                  id: crypto.randomUUID(),
                  text: "New Launch",
                  link: "/in/properties?is_front_section=6",
                },
                {
                  id: crypto.randomUUID(),
                  text: "Ready to Move",
                  link: "/in/properties?is_front_section=7",
                },
                {
                  id: crypto.randomUUID(),
                  text: "All Pages",
                  link: "/in/all-pages",
                },
                // {
                //   id: crypto.randomUUID(),
                //   text: "Under Construction",
                //   link: "/in/properties?is_front_section=8",
                // },
                // {
                //   id: crypto.randomUUID(),
                //   text: "Upcoming",
                //   link: "/in/properties?is_front_section=9",
                // },
              ]
            : [
                {
                  id: crypto.randomUUID(),
                  text: "Off-Plan",
                  link: "/properties?is_front_section=1",
                },
                {
                  id: crypto.randomUUID(),
                  text: "Secondary",
                  link: "/properties?is_front_section=2",
                },
                {
                  id: crypto.randomUUID(),
                  text: "Rental",
                  link: "/properties?is_front_section=3",
                },
                {
                  id: crypto.randomUUID(),
                  text: "Top Developers",
                  link: "/our-developers",
                },
                {
                  id: crypto.randomUUID(),
                  text: "All Pages",
                  link: "/all-pages",
                },
              ],
      },
    },
    {
      id: crypto.randomUUID(),
      data: {
        id: crypto.randomUUID(),
        title: "Important Links",
        links: [
          {
            id: crypto.randomUUID(),
            text: "Careers",
            link: country == "in" ? "/in/careers" : "/careers",
          },
          {
            id: crypto.randomUUID(),
            text: "Blogs",
            link: country == "in" ? "/in/blogs" : "/blogs",
          },
          {
            id: crypto.randomUUID(),
            text: "Contact Us",
            link: country == "in" ? "/in/contact-us" : "/contact-us",
          },
          {
            id: crypto.randomUUID(),
            text: "Privacy Policy",
            link:
              country == "in"
                ? "/in/privacy-policy"
                : country == "ca"
                  ? "/ca/privacy-policy"
                  : "/privacy-policy",
          },
          {
            id: crypto.randomUUID(),
            text: "Terms & Conditions",
            link:
              country == "in"
                ? "/in/terms-conditions"
                : country == "ca"
                  ? "/ca/terms-conditions"
                  : "/terms-conditions",
          },
          {
            id: crypto.randomUUID(),
            text: "Sitemap",
            link: "/sitemap.xml",
          },
        ],
      },
    },
  ];
  return (
    <footer className="bg-theme-gray bg-opacity-20">
      {/* <Section.Container className="w-full px-3 py-1.5 md:!px-11">
        <div className="flex w-full items-center justify-between pt-5">
          <p className="w-full text-start text-[15px] sm:text-lg">Excellence</p>
          <p className="w-full border-x border-theme-gray text-center text-[15px] sm:text-lg">
            Quality
          </p>
          <p className="w-full text-end text-[15px] sm:text-lg">Deliverance</p>
        </div>
      </Section.Container> */}

      {/* <Hr className="border-b-theme-off-white border-opacity-50 py-2 md:py-3" /> */}

      <Section.Container className="pt-[71px]# flex w-full flex-col justify-center !px-7 pb-[55px] pt-10">
        <div className="grid h-full flex-grow grid-cols-2 flex-wrap items-start justify-between gap-5 sm:grid-cols-3 lg:flex">
          <Link
            href={"/"}
            className="flex-grow/ pl-[22px]/ col-span-full flex flex-col items-center"
          >
            <div className="flex flex-col items-center justify-center md:h-[200px] md:w-[250px] lg:-mr-[150px]">
              <NextImage
                // src="/svg-icons/footer/footer-logo.svg"
                // src="/svg-icons/SOP-New-Logo-UAE-&-India.png"
                src="https://listing-storage.s3.eu-north-1.amazonaws.com/storage/Logo+Animation+2000x2000+Website.gif"
                alt="SOP Properties Limited"
                // width={63}
                width={119}
                height={119}
                className="mb-4# sm:w-[180px]# mb-1.5 w-[180px] shrink-0 sm:w-[250px]"
              />

              {/* <Typography
                as="h2"
                className="text-center text-[11px] font-bold uppercase text-theme-off-white opacity-80 sm:text-base"
              >
                SOP USA i India
              </Typography> */}
            </div>
          </Link>

          {footerLinksGroupsData?.map((group, idx) => (
            <div
              className={cn(
                "flex h-full flex-shrink-0 items-start gap-5",
                group?.className,
              )}
              key={group?.id}
            >
              <div className="mt-2.5 hidden h-[215px] w-[1px] self-stretch border-l border-l-theme-off-white border-opacity-20 lg:block" />
              <div key={group?.id || idx} className="space-y-8">
                <LinksGroup {...group?.data} />

                {!!group?.additionalData?.title && (
                  <LinksGroup {...group?.additionalData} />
                )}
              </div>
            </div>
          ))}
        </div>
        <Hr className="mb-5 mt-2 border-b-theme-off-white border-opacity-50" />

        <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-2 md:gap-7">
          <div className="flex flex-col items-center gap-y-2">
            <Typography
              as="h3"
              className="text-wrap break-words text-center text-xs font-medium uppercase text-white sm:text-base"
            >
              DUBAI
            </Typography>

            <div className="flex flex-col gap-y-2">
              <ul>
                <li
                  className={cn(
                    "text-wrap break-words text-[10px] font-normal leading-5 text-theme-off-white opacity-60 sm:text-base sm:leading-[30px]",
                    // item?.className,
                  )}
                  // key={item?.id || idx}
                >
                  <Typography
                    // href={item?.link || "#"}
                    // target={item?.target}
                    className="text-wrap break-words text-center text-[9px] hover:underline sm:text-sm"
                  >
                    {/* {item?.text} */}
                    The Bay Gate Tower- 10th Floor, Office No: F10 - 02, Al
                    Mustaqbal St - Business Bay - Dubai. HOTLINE:{" "}
                    <a href="tel:+971 800 555 555">+971 800 555 555</a>
                  </Typography>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col items-center gap-y-2 border-theme-gray md:md:border-l md:pl-5">
            <Typography
              as="h3"
              className="text-wrap break-words text-center text-xs font-medium uppercase text-white sm:text-base"
            >
              INDIA
            </Typography>

            <div className="flex flex-col gap-y-2">
              <ul>
                <li
                  className={cn(
                    "text-wrap break-words text-center text-[10px] font-normal leading-5 text-theme-off-white opacity-60 sm:text-base sm:leading-[30px]",
                    // item?.className,
                  )}
                  // key={item?.id || idx}
                >
                  <Typography
                    // href={item?.link || "#"}
                    // target={item?.target}
                    className="text-wrap break-words text-[9px] hover:underline sm:text-sm"
                  >
                    {/* {item?.text} */}
                    Office# 320/321, Suncity Success Tower, Sector 65, Gurugram,
                    Haryana-122102, INDIA. HOTLINE:{" "}
                    <a href="tel:+91-888-4418 110">+91-888-4418 110</a>
                  </Typography>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Section.Container>

      <Hr className="border-b-theme-off-white border-opacity-50" />

      <div className="flex flex-col items-center gap-2 px-3 py-[18px]">
        <LinkIcons country={country} />
        <Typography className="mt-[6px] block text-wrap break-words text-center font-raleway text-[12px] font-normal not-italic text-white opacity-60 md:leading-[30px]">
          {/* SOP Properties Limited I 2024-2050 All Rights Reserved */}
          SILVER OAK PROPERTIES DUBAI © 2021-2025 All Rights Reserved
        </Typography>
      </div>
    </footer>
  );
};

export default Footer;
