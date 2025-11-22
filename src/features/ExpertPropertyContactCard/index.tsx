import PrimaryButton from "@/components/elements/buttons/PrimaryButton";
import NextImage from "@/components/elements/images/NextImage";
import Typography from "@/components/elements/texts/Typography";
import Link from "next/link";
import Avatar from "./Avatar";
import ContactRow from "./ContactRow";

interface IExpertPropertyContactCardProps {
  data?: any;
  country?: string;
}

const ExpertPropertyContactCard = ({
  data,
  country = "uae",
}: IExpertPropertyContactCardProps) => {
  return (
    <div className="flex flex-col justify-between gap-4 border border-theme-light-golden px-5 py-4 pb-7 pt-7">
      <Avatar containerClassName="flex flex-col items-center" isActive />

      <Typography
        as="h3"
        className="mb-1 mt-2 text-center text-[22px] font-medium lowercase text-theme-light-golden"
      >
        {/* {data?.contact_form_section?.property_contact_member_name} */}
      </Typography>

      {/* <Typography
        as="p"
        className="mb-2 text-center text-xs font-medium uppercase not-italic leading-[normal] text-theme-off-white"
      >
        GIUSEPPE IORIO
      </Typography> */}

      <ContactRow country={country} />

      <div>
        <PrimaryButton className="mt-2 flex w-full flex-grow items-center justify-center gap-1.5 rounded-none bg-theme-gray text-xs text-theme-light-golden hover:bg-theme-gray/80 sm:text-xs">
          <Link
            className="flex flex-row items-center justify-center gap-2"
            target="_blank"
            href={`${country !== "in" ? "https://wa.aisensy.com/74Xxd4" : "https://api.whatsapp.com/send/?phone=918755588863&text&type=phone_number&app_absent=0"}`}
          >
            <NextImage
              src="/svg-icons/prompt-consultation/whatsapp.svg"
              alt="whatsapp"
              width={20}
              height={20}
              className="h-3.5 w-4"
              disableBlur
            />
            Whats App
          </Link>
        </PrimaryButton>
      </div>

      {/* <Button className="mx-auto mt-2.5 flex items-center justify-center gap-1.5 rounded-none text-xs font-medium text-theme-off-white text-opacity-60 sm:text-xs">
        <NextImage
          src="/svg-icons/property/location-expert.svg"
          alt="whatsapp"
          width={11}
          height={14}
          className="h-[13.25px] w-[10.6px]"
          disableBlur
        />
        Properties on map
      </Button> */}
    </div>
  );
};

export default ExpertPropertyContactCard;
