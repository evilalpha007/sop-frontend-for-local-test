"use client";
import useCountryRouting from "@/library/hooks/useCountryRouting";
import Link from "next/link";
import NextImage from "../images/NextImage";
import OutlineButton from "./OutlineButton";

const handleScrollToTop = () => {
  try {
    if (!window) return;
    window?.scrollTo?.({ top: 0, behavior: "smooth" });
  } catch (error) {
    console.error("Error on scroll to top", error);
  }
};

const WhatsAppButton = () => {
  const {
    router,
    countryToRedirect,
    currentCountryData,
    currentCountry,
    defaultCountry,
  } = useCountryRouting();
  
   const whatsappNumber =
     currentCountry === "in"
       ? "https://api.whatsapp.com/send/?phone=918755588863&text&type=phone_number&app_absent=0"
       : "https://wa.aisensy.com/74Xxd4";

  return (
    <OutlineButton
      type="button"
      onClick={handleScrollToTop}
      className="flex size-10 items-center justify-center rounded-full bg-theme-black backdrop-blur-md backdrop-opacity-70 hover:!bg-theme-black/75 active:scale-90 sm:size-10"
      asChild
    >
      <Link href={whatsappNumber} target="_blank">
        <NextImage
          src="/svg-icons/navbar/whatsApp.svg"
          alt="WhatsApp icon"
          width={21}
          height={21}
          disableBlur
          priority
          className="size-5 shrink-0"
        />

        <span className="sr-only">WhatsApp contact link</span>
      </Link>
    </OutlineButton>
  );
};

export default WhatsAppButton;
