import Hr from "@/components/elements/border/Hr";
import PrimaryButton from "@/components/elements/buttons/PrimaryButton";
import NextImage from "@/components/elements/images/NextImage";
import Typography from "@/components/elements/texts/Typography";
import { cn } from "@/library/utils/cn";
import Close from "./Close";

interface IHorizontalAdProps {
  className?: string;
  containerClassName?: string;
}

const HorizontalAd = ({
  className,
  containerClassName,
}: IHorizontalAdProps) => {
  return (
    <div
      className={cn(
        "relative min-h-[300px] w-full border border-theme-light-golden",
        containerClassName,
      )}
    >
      <NextImage
        src="/images/ad/horizontal-ad-bg.svg"
        alt="horizontal-ad-bg"
        width={1150}
        height={279}
        // imageClassName="object-cover"
        className={cn("!z-0 h-full w-full", className)}
      />

      <Close />

      <div className="absolute bottom-0 left-0 right-0 z-[1] h-[70%] w-full bg-[linear-gradient(0deg,#141213_32%,rgba(0,0,0,0.00)_100%)] p-[18px]" />

      <div className="absolute inset-0 !z-[2] h-fit w-fit p-[18px] pl-11">
        <div className="border border-theme-light-golden bg-theme-black bg-opacity-70 px-6 py-7">
          <Typography
            as="h2"
            className="mb-3 text-center text-[25px] font-normal text-theme-light-golden"
          >
            Al Bateen Residence
          </Typography>

          <div className="mb-5 flex items-center justify-center gap-4">
            <div className="flex items-center gap-1.5">
              <NextImage
                src="/svg-icons/property/area.svg"
                alt="area"
                width={16}
                height={12}
                disableBlur
                className="h-3 w-4 shrink-0"
              />

              <Typography
                as="p"
                className="text-[10px] font-light text-theme-off-white"
              >
                5230sqft
              </Typography>
            </div>

            <div className="flex items-center gap-1.5">
              <NextImage
                src="/svg-icons/property/bed.svg"
                alt="bed"
                width={20}
                height={15}
                disableBlur
                className="h-[15px] w-5 shrink-0"
              />

              <Typography
                as="p"
                className="text-[10px] font-light text-theme-off-white"
              >
                3
              </Typography>
            </div>

            <div className="flex items-center gap-1.5">
              <NextImage
                src="/svg-icons/property/bath.svg"
                alt="bath"
                width={17}
                height={13}
                disableBlur
                className="h-[13px] w-[17px] shrink-0"
              />

              <Typography
                as="p"
                className="text-[10px] font-light text-theme-off-white"
              >
                4
              </Typography>
            </div>
          </div>

          <Hr className="mb-[22px] mt-7" />

          <PrimaryButton className="w-full text-sm text-theme-black sm:text-sm">
            Book Now
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default HorizontalAd;
