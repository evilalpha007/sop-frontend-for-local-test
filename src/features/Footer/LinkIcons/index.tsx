"use client";
import useCountryRouting from "@/library/hooks/useCountryRouting";
import { usePathname } from "next/navigation";
import LinkIcon, { ILinkIconProps } from "./LinkIcon";
import { TCountry } from "@/api/get-countries";

const footerIconsData: ILinkIconProps[] = [
  {
    id: crypto.randomUUID(),
    icon: "/svg-icons/footer/facebook.svg",
    alt: "facebook",
    link: "https://www.facebook.com/SOPUAE/",
    target: "_blank",
  },
  {
    id: crypto.randomUUID(),
    icon: "/svg-icons/footer/x.svg",
    alt: "x",
    link: "https://x.com/i/flow/login?redirect_after_login=%2Fsilveroakuae",
    target: "_blank",
  },
  {
    id: crypto.randomUUID(),
    icon: "/svg-icons/footer/instagram.svg",
    alt: "instagram",
    link: "https://www.instagram.com/silveroakglobal.ae/",
    target: "_blank",
  },
  {
    id: crypto.randomUUID(),
    icon: "/svg-icons/footer/linkedin.svg",
    alt: "linkedin",
    link: "https://www.linkedin.com/company/silveroakuae/posts/?feedView=all",
    target: "_blank",
  },
  // youtube
  {
    id: crypto.randomUUID(),
    icon: "/svg-icons/footer/youtube.svg",
    alt: "youtube",
    link: "https://www.youtube.com/channel/UCumxu3ox9xTMZZCtTY6zI0w",
    target: "_blank",
  },
  // tiktok
  {
    id: crypto.randomUUID(),
    icon: "/svg-icons/footer/tiktok.svg",
    alt: "tiktok",
    link: "https://www.tiktok.com/@silveroakuae",
    target: "_blank",
  },
  // {
  //   id: crypto.randomUUID(),
  //   icon: "/svg-icons/footer/telegram.svg",
  //   alt: "telegram",
  //   link: "#",
  //   target: "_blank",
  // },
];

const indiaFooterIconsData: ILinkIconProps[] = [
  {
    id: crypto.randomUUID(),
    icon: "/svg-icons/footer/facebook.svg",
    alt: "facebook",
    link: "https://www.facebook.com/SOPRealEstateIndia",
    target: "_blank",
  },
  {
    id: crypto.randomUUID(),
    icon: "/svg-icons/footer/x.svg",
    alt: "x",
    link: "https://x.com/silveroakglobal",
    target: "_blank",
  },
  {
    id: crypto.randomUUID(),
    icon: "/svg-icons/footer/instagram.svg",
    alt: "instagram",
    link: "https://www.instagram.com/silveroakglobal.india/",
    target: "_blank",
  },
  {
    id: crypto.randomUUID(),
    icon: "/svg-icons/footer/linkedin.svg",
    alt: "linkedin",
    link: "https://www.linkedin.com/company/silveroakglobal-india/",
    target: "_blank",
  },
  // youtube
  {
    id: crypto.randomUUID(),
    icon: "/svg-icons/footer/youtube.svg",
    alt: "youtube",
    link: "https://www.youtube.com/channel/UCV_9-aEqD8Z3_ma4fCCHY3Q",
    target: "_blank",
  },
  // {
  //   id: crypto.randomUUID(),
  //   icon: "/svg-icons/footer/telegram.svg",
  //   alt: "telegram",
  //   link: "#",
  //   target: "_blank",
  // },
];

const LinkIcons = ({ country = "uae" }: { country?: string }) => {
  const {
    router,
    countryToRedirect,
    currentCountryData,
    currentCountry,
    defaultCountry,
  } = useCountryRouting();

  //  // console.log("current country: ", currentCountry);

  const pathname = usePathname();

  // Filter out TikTok icon if pathname includes "in"
  //   const filteredIcons = footerIconsData.filter(
  //     (icon) => !(pathname.includes("in") && icon.alt === "tiktok"),
  //   );

  const filteredIcons =
    country === "in" ? indiaFooterIconsData : footerIconsData;

  return (
    <div className="flex items-center gap-x-4">
      {filteredIcons.map((icon) => (
        <LinkIcon key={icon.id} {...icon} />
      ))}
    </div>
  );
};

export default LinkIcons;
