"use client";
import Dropdown from "@/components/elements/dropdown/Dropdown";
import NextImage from "@/components/elements/images/NextImage";
import ToggleContextProvider from "@/library/contexts/ToggleContextProvider";
import { cn } from "@/library/utils/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";

export type TNavLinkProps = {
  href?: string;
  title?: string;
  sub?: TNavLinkProps[];
  type?: "main" | "sub";
  active?: boolean;
};

const NavLink = ({
  href,
  title,
  sub,
  type = "main",
  active,
}: TNavLinkProps) => {
  const path = usePathname();
  const isActive =
    path === href || sub?.some((subLink) => subLink?.href === path) || active;



  let content = (
    <p
      className={cn(
        "relative cursor-pointer text-nowrap disabled:cursor-not-allowed",
        isActive ? "text-[15px] font-normal text-theme-light-golden" : "",
      )}
    >
      {title}
    </p>
  );

  if (href) {
    content = (
      <Link
        href={href || "#"}
        className={cn(
          "relative cursor-pointer disabled:cursor-not-allowed",
          {
            "block h-full w-full px-4 py-2.5 hover:bg-theme-off-white/20":
              type === "sub",
          },
          {
            "text-[15px] font-normal text-theme-light-golden": isActive,
            "text-xs": type === "sub" && isActive,
          },
        )}
        onClick={(e) => {
          e.stopPropagation();
        }}
        onPointerDown={(e) => {
          e.stopPropagation();
        }}
      >
        {title}
      </Link>
    );
  }

  if (sub?.length) {
    content = (
      <ToggleContextProvider>
        <Dropdown
          title={
            <div className="flex items-center gap-[6px]">
              <NavLink title={title} href={href} active={isActive} />

              <NextImage
                src={
                  isActive
                    ? "/svg-icons/navbar/arrow-down.svg"
                    : "/svg-icons/navbar/arrow-down-white.svg"
                }
                alt="arrow down icon"
                width={11}
                height={6}
                disableBlur
                priority
                className="h-1.5 w-[11px] shrink-0 cursor-pointer"
              />
            </div>
          }
          content={
            <div className="flex flex-col divide-y divide-theme-green-gray/40">
              {sub?.map((subLink) => (
                <NavLink key={subLink.title} {...subLink} type="sub" />
              ))}
            </div>
          }
          enableHoverMode
        />
      </ToggleContextProvider>
    );
  }

  return (
    <div
      className={cn(
        "relative px-2.5",
        "after:absolute after:-bottom-[19px] after:left-0 after:right-0 after:w-full after:scale-x-0 after:border-b-[3px] after:border-b-theme-off-white after:opacity-0 after:transition-all after:duration-300 after:content-[''] after:hover:scale-x-100 after:hover:opacity-100",
        "text-[12px] font-normal uppercase text-theme-off-white",
        {
          "px-0 text-xs after:border-0": type === "sub",
        },
        {
          "after:scale-x-100 after:border-b-theme-light-golden after:opacity-100 hover:bg-transparent":
            isActive,
        },
      )}
    >
      {content}
    </div>
  );
};

export default NavLink;
