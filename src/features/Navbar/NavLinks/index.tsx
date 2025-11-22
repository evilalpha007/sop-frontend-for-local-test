"use client";
import { TCountry } from "@/api/get-countries";
import { memo, useEffect, useMemo } from "react";
import NavLink, { TNavLinkProps } from "./NavLink";
import { usePathname } from "next/navigation";

type TNavLink = TNavLinkProps & { id: string };

const NavLinks = () => {
  const pathName = usePathname();
  let defaultCountry = pathName.split("/")[1];

  if (defaultCountry === "in") {
    defaultCountry = "in";
  } else if (defaultCountry === "ca") {
    defaultCountry = "ca";
  } else {
    defaultCountry = "uae";
  }

  const countryToRedirect =
    defaultCountry === "uae" ? "/" : `/${defaultCountry}/`;

  const navLinksData: TNavLink[] = useMemo((): TNavLink[] => {
    const dubaiNavLinks: TNavLink[] = [
      {
        id: crypto.randomUUID(),
        title: "NON RESIDENT'S CORNER",
        href: `${countryToRedirect}non-residents-corner`,
      },
      {
        id: crypto.randomUUID(),
        title: "WHO WE ARE",
        sub: [
          {
            title: "OUR TEAM",
            href: `${countryToRedirect}our-team`,
          },
          {
            title: "CAREERS",
            href: `${countryToRedirect}careers`,
          },
          {
            title: "CONTACT US",
            href: `${countryToRedirect}contact-us`,
          },
        ],
      },
    ];

    const otherCountryNavLinks: TNavLink[] = [
      {
        id: crypto.randomUUID(),
        title: "WHO WE ARE",
        sub: [
          {
            title: "OUR TEAM",
            href: `${countryToRedirect}our-team`,
          },
          {
            title: "CAREERS",
            href: `${countryToRedirect}careers`,
          },
          {
            title: "CONTACT US",
            href: `${countryToRedirect}contact-us`,
          },
        ],
      },
    ];

    return [
      {
        id: crypto.randomUUID(),
        title: "BUY",
        // href: `${countryToRedirect}properties?is_front_section=1`,
        href: `${countryToRedirect}properties-for-sale`,
      },
      {
        id: crypto.randomUUID(),
        title: "RENT",
        // href: `${countryToRedirect}properties-for-sale?is_front_section=2`,
        href: `${countryToRedirect}properties-for-rent`,
      },
      {
        id: crypto.randomUUID(),
        title: "Off Plan",
        href: `${countryToRedirect}properties?is_front_section=1`,
      },
      {
        id: crypto.randomUUID(),
        title: "Area Guides",
        href: `/area-guides`,
      },
      {
        id: crypto.randomUUID(),
        title: "Developers",
        href: `/developers`,
      },
      {
        id: crypto.randomUUID(),
        title: "Blogs",
        href: `/blogs`,
      },
      {
        id: crypto.randomUUID(),
        title: "PROPERTY SERVICES",
        href: `${countryToRedirect}our-services`,
      },
      ...(defaultCountry === "uae" ? dubaiNavLinks : otherCountryNavLinks),
    ];
  }, [countryToRedirect, defaultCountry]);

  return (
    <div className="flex w-full gap-2 text-nowrap">
      {navLinksData?.map((navLink) => (
        <NavLink key={navLink?.id} {...navLink} />
      ))}
    </div>
  );
};

export default memo(NavLinks);
