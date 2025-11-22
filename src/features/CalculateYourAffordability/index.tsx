import Section from "@/components/blocks/Section/index";
import Typography from "@/components/elements/texts/Typography";
import { cn } from "@/library/utils/cn";
import Calculator from "./Calculator";

interface ICalculateYourAffordabilityProps {
  className?: string;
}

const CalculateYourAffordability = ({
  className,
}: ICalculateYourAffordabilityProps) => {
  return (
    <Section.Container
      className={cn(
        "h-full border border-theme-off-white border-opacity-50 py-3.5 sm:rounded-[5px] sm:px-10 sm:pb-10 sm:pt-5 lg:border-none",
        className,
      )}
    >
      {/* Header Text */}
      <div>
        <Typography
          as="h2"
          className="mb-2.5 text-center text-sm font-medium text-theme-off-white md:text-[32px]"
        >
          Calculate Your Affordability
        </Typography>
        <Typography
          as="h2"
          className="mx-auto mb-[19px] mt-5 w-full max-w-[627px] text-center text-[12px] font-normal leading-[25px] text-theme-off-white md:mb-8 md:text-lg"
        >
          Your first step towards smart investments!
        </Typography>
      </div>

      <Calculator />
    </Section.Container>
  );
};

export default CalculateYourAffordability;
