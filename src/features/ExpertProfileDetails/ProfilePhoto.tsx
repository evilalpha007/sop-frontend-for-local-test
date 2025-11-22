import NextImage from "@/components/elements/images/NextImage";
import { cn } from "@/library/utils/cn";
import Link from "next/link";

interface IProfilePhotoProps {
  hideContactButtons?: boolean;
  photo?: string;
  email?: string;
  phone?: string;
  whatsapp?: string;
}

const ProfilePhoto = ({
  hideContactButtons,
  photo,
  email,
  phone,
  whatsapp,
}: IProfilePhotoProps) => {
  return (
    <div className="w-fit shrink-0 flex-grow">
      <NextImage
        src={photo || ""}
        alt="DExpert"
        width={341}
        height={471}
        className={cn("h-full max-h-[471px] w-full max-w-[341px] rounded-lg", {
          "h-full max-h-[100%] max-w-[441px]": hideContactButtons,
        })}
      />

      {!hideContactButtons && (
        <div className="mt-1 grid grid-cols-3 gap-1.5">
          <Link
            href={phone ? `tel:${phone}` : "#"}
            className="flex cursor-pointer items-center justify-center bg-theme-gray bg-opacity-20 p-1.5 hover:opacity-80"
          >
            <NextImage
              src="/svg-icons/sales-and-leasing-expert-details/phone.svg"
              alt="Phone Icon"
              width={30}
              height={30}
              className="h-[30px] w-[30px] shrink-0"
              disableBlur
            />
          </Link>

          <Link
            href={email ? `mailto:${email}` : "#"}
            className="flex cursor-pointer items-center justify-center bg-theme-gray bg-opacity-20 p-1.5 hover:opacity-80"
          >
            <NextImage
              src="/svg-icons/sales-and-leasing-expert-details/mail.svg"
              alt="Mail Icon"
              width={30}
              height={30}
              className="h-[30px] w-[30px] shrink-0"
              disableBlur
            />
          </Link>

          <Link
            href={whatsapp ? `https://wa.me/${whatsapp}` : "#"}
            className="flex cursor-pointer items-center justify-center bg-theme-gray bg-opacity-20 p-1.5 hover:opacity-80"
          >
            <NextImage
              src="/svg-icons/sales-and-leasing-expert-details/whatsapp.svg"
              alt="Mail Icon"
              width={30}
              height={30}
              className="h-[22px] w-[22px] shrink-0"
              disableBlur
            />
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProfilePhoto;
