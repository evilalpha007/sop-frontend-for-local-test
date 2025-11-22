"use client";
import NextImage from "@/components/elements/images/NextImage";
import { cn } from "@/library/utils/cn";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { TCountry } from "..";
import { useCookies } from "next-client-cookies";
import Link from "next/link";

const CountrySelect = ({ data }: { data: TCountry[] }) => {
  const cookies = useCookies();
  const router = useRouter();
  const pathname = usePathname();
  const selectedCountry = pathname.split("/")[1];
  const [defaultCountry, setDefaultCountry] = useState<TCountry>();

  useEffect(() => {
    const tempCountry = data.find(
      (country: TCountry) => country.code === selectedCountry,
    );
    if (!tempCountry) {
      setDefaultCountry(
        data.find((country: TCountry) => country.code === "uae"),
      );
    } else {
      setDefaultCountry(tempCountry);
    }
  }, [pathname, selectedCountry, data]);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Fallback image source
  const getImageSrc = (flag?: string) => {
    if (!flag) return "/images/flags/fallback-flag.svg"; // Add a fallback flag
    return flag.startsWith("http") ? flag : `/images/flags/${flag}`; // Adjust path as needed
  };

  return (
    <div className="w-fit">
      <div className="relative" ref={dropdownRef}>
        <div
          onClick={handleToggleDropdown}
          className="w-fit cursor-pointer"
          aria-label="Change country"
        >
          <NextImage
            key={defaultCountry?.id}
            src={getImageSrc(defaultCountry?.flag)}
            alt={defaultCountry?.code || "country flag"}
            width={30}
            height={30}
            className="w-6 object-contain" // Added object-contain
            disableBlur
          />
        </div>

        {/* Dropdown */}
        <div
          className={cn(
            `absolute right-0 top-full z-50 mt-2 flex w-fit flex-col items-start gap-2 overflow-hidden border border-theme-gray bg-theme-black p-2 shadow-lg transition-all duration-500`,
            isDropdownOpen ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0",
          )}
        >
          {data
            ?.filter(
              (country) =>
                country.code && country.code !== defaultCountry?.code,
            )
            ?.map((country) => (
              <Link
                href={country.code === "uae" ? "/" : `/${country.code}`}
                key={country.id}
                onClick={() => cookies.set("country", country.code!)}
                className="cursor-pointer"
                aria-label={`Select ${country.code} flag`}
              >
                <NextImage
                  src={getImageSrc(country.flag)}
                  alt={country.code || "country flag"}
                  width={30}
                  height={30}
                  className="w-6 object-contain"
                  disableBlur
                />
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CountrySelect;
