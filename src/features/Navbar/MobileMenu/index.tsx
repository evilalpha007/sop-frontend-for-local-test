"use client";
import { getCountries } from "@/api/get-countries";
import NextImage from "@/components/elements/images/NextImage";
import LinkIcons from "@/features/Footer/LinkIcons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { HiChevronDown, HiMiniBars4 } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";
import { TCountry } from "..";
import WhatsAppIcon from "../WhatsAppIcon";
import CountrySelect from "./CountrySelect";

const MobileMenu = ({
  data: countries,
  defaultData,
}: {
  data: TCountry[];
  defaultData: any;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathName = usePathname();
  
  let defaultCountry = pathName.split("/")[1];
  if (defaultCountry === "in") {
    defaultCountry = "in";
  } else if (defaultCountry === "ca") {
    defaultCountry = "ca";
  } else {
    defaultCountry = "uae";
  }

  const countryToRedirect = defaultCountry === "uae" ? "/" : `/${defaultCountry}/`;

  const navLinksData = [
    {
      id: crypto.randomUUID(),
      title: "BUY",
      href: `${countryToRedirect}properties?is_front_section=1`,
    },
    {
      id: crypto.randomUUID(),
      title: "RENT",
      href: `${countryToRedirect}properties?is_front_section=2`,
    },
    {
        id: crypto.randomUUID(),
        title: "Off Plan",
        href: `${countryToRedirect}properties?is_front_section=2`,
      },
      {
        id: crypto.randomUUID(),
        title: "Area Guides",
        href: `/uae/exclusive-areas`,
      },
      {
        id: crypto.randomUUID(),
        title: "Developers",
        href: `/our-developers`,
      },
      {
        id: crypto.randomUUID(),
        title: "Blogs",
        href: `/blogs`,
      },
    {
      id: crypto.randomUUID(),
      title: "OUR SERVICES",
      href: `${countryToRedirect}our-services`,
    },
    ...(defaultCountry === "uae" ? [
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
    ] : [
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
    ])
  ];

  // Filter out "NON RESIDENT'S CORNER" if path includes "in"
  const filteredNavLinksData = navLinksData.filter(
    (link) => !(link.title === "NON RESIDENT'S CORNER" && pathName.includes("in"))
  );

  const handleToggle = () => setIsOpen((prev) => !prev);
  const handleSubMenuToggle = (id: string) => setOpenSubMenu(openSubMenu === id ? null : id);
  const closeMenu = () => setIsOpen(false);

  const handleClickOutside = (event: MouseEvent | TouchEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    }
  }, [isOpen]);

  return (
    <>
      <div className="fixed top-0 z-[2000] flex w-full items-center justify-between bg-theme-black/70 px-4 py-2.5 backdrop-blur-sm lg:hidden">
        <div className="logo w-full">
          <Link href="/">
            <NextImage
              src="/images/logo/primary-logo.svg"
              alt="SOP brand logo"
              width={21}
              height={40}
              disableBlur
              priority
              className="h-10 w-[30px]"
            />
          </Link>
        </div>
        <div className="flex flex-row items-center justify-end gap-4">
          <CountrySelect data={countries} />
          <button
            onClick={handleToggle}
            aria-label="toggle menu"
            className="text-2xl text-theme-off-white hover:text-theme-light-golden focus:outline-none"
            style={{ WebkitTapHighlightColor: "transparent" }}
          >
            <HiMiniBars4 />
          </button>
        </div>
      </div>

      {/* Menu Items Box */}
      <div
        ref={menuRef}
        className={`fixed left-0 top-0 z-[2001] h-[100dvh] w-full transform bg-theme-black/90 px-5 py-2.5 backdrop-blur-sm transition-all duration-300 ${
          isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
      >
        {/* Heading and Close Button */}
        <div className="heading flex w-full flex-row items-center justify-between">
          <Link href="/">
            <NextImage
              src="/svg-icons/navbar/navbar-logo.svg"
              alt="SOP brand logo"
              width={21}
              height={40}
              disableBlur
              priority
              className="h-10 w-[21px]"
            />
          </Link>
          <button
            onClick={closeMenu}
            aria-label="close menu"
            className="text-3xl text-theme-off-white hover:text-theme-light-golden focus:outline-none"
            style={{ WebkitTapHighlightColor: "transparent" }}
          >
            <IoClose />
          </button>
        </div>

        {/* Menu Links */}
        <div className="mt-5 flex h-full max-h-[90dvh] flex-col items-start justify-start overflow-y-auto">
          <div className="flex w-full flex-col items-start">
            {filteredNavLinksData.map((link) => (
              <div key={link.id} className="w-full">
                <div className="flex w-full items-center justify-between border-b border-theme-off-golden/30 py-3 text-[16px] text-theme-off-white hover:text-theme-light-golden">
                  {link.sub ? (
                    <button
                      onClick={() => handleSubMenuToggle(link.id)}
                      className="flex w-full flex-row items-center justify-between text-left uppercase transition-all duration-300 hover:text-theme-light-golden"
                      style={{ WebkitTapHighlightColor: "transparent" }}
                    >
                      {link.title}
                      <HiChevronDown
                        className={`transform transition-transform duration-300 ${
                          openSubMenu === link.id ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  ) : (
                    <Link
                      className="uppercase transition-all duration-300 hover:text-theme-light-golden"
                      href={link.href}
                      onClick={closeMenu}
                    >
                      {link.title}
                    </Link>
                  )}
                </div>
                {link.sub && (
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openSubMenu === link.id
                        ? "max-h-[200px] opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    {link.sub.map((subLink) => (
                      <Link
                        key={subLink.href}
                        href={subLink.href}
                        className="block border-b border-theme-off-golden/30 px-4 py-2 text-[16px] text-theme-off-white hover:text-theme-light-golden"
                        onClick={closeMenu}
                      >
                        {subLink.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Social Links and Contact */}
          <div className="flex w-full items-center justify-start gap-7 border-b border-theme-off-golden/30 py-3 text-[16px] uppercase text-theme-light-golden">
            Follow us: <LinkIcons />
          </div>
          <div className="flex w-full items-center justify-start gap-5 border-b border-theme-off-golden/30 py-3 text-[16px] uppercase text-theme-light-golden">
            Contact Us:{" "}
            <div className="flex items-center gap-[25px]">
              <Link
                href={`${defaultCountry === "in" ? "tel:+918884418110" : "tel:+971551307662"}`}
                target="_blank"
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;