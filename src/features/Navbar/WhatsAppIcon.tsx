"use client";
import NextImage from "@/components/elements/images/NextImage";
import useCountryRouting from "@/library/hooks/useCountryRouting";
import Link from "next/link";
import { useParams } from "next/navigation";

const WhatsAppIcon = () => {
  const { country } = useParams();

  const whatsappLink =
    country === "in"
      ? "https://api.whatsapp.com/send/?phone=918755588863&text&type=phone_number&app_absent=0"
      : "https://wa.aisensy.com/74Xxd4"

  return (
    <Link href={whatsappLink} target="_blank" className="w-fit">
      <NextImage
        src="/svg-icons/navbar/whatsApp.svg"
        alt="WhatsApp icon"
        width={21}
        height={21}
        disableBlur
        priority
        className="size-5"
      />
    </Link>
  );
};

export default WhatsAppIcon;
