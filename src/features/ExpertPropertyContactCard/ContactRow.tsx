import NextImage from "@/components/elements/images/NextImage";
import Link from "next/link";

interface IContactProps {
  country: string;
}
const ContactRow = ({ country }: IContactProps) => {
  return (
    <div className="grid grid-cols-2 self-stretch border border-theme-light-golden">
      <Link
        target="_blank"
        href={`${country === "in" ? "tel:+918884418110" : "tel:+971551307662"}`}
        className="flex h-full w-full items-center justify-center border-r border-r-theme-light-golden py-1.5"
      >
        <NextImage
          src="/svg-icons/property/phone.svg"
          alt="Phone"
          width={24}
          height={24}
          disableBlur
          className="h-[18.561px] w-[20.232px] shrink-0"
        />
      </Link>

      <Link
        target="_blank"
        href={`${country == "in" ? "mailto:info@silveroakglobal.in" : "mailto:info@silveroakglobal.ae"}`}
        className="flex h-full w-full items-center justify-center py-1.5"
      >
        <NextImage
          src="/svg-icons/property/email.svg"
          alt="Phone"
          width={24}
          height={24}
          disableBlur
          className="h-[18.561px] w-[20.232px] shrink-0"
        />
      </Link>

      {/* <div className="flex h-full w-full items-center justify-center border-l border-l-theme-light-golden py-1.5">
        <NextImage
          src="/svg-icons/property/phone.svg"
          alt="Phone"
          width={24}
          height={24}
          disableBlur
          className="h-[18.561px] w-[20.232px] shrink-0"
        />
      </div> */}
    </div>
  );
};

export default ContactRow;
