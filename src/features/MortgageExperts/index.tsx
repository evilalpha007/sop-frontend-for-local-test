import Section from "@/components/blocks/Section/index";
import PrimaryButton from "@/components/elements/buttons/PrimaryButton";
import NextImage from "@/components/elements/images/NextImage";
import Typography from "@/components/elements/texts/Typography";

const MortgageExperts = () => {
  return (
    <Section.Container className="flex flex-wrap-reverse items-center justify-between gap-x-20 gap-y-6 p-0 px-4 md:flex-nowrap md:gap-y-5 md:border md:border-solid md:border-theme-green-gray md:border-opacity-20 md:bg-theme-gray md:bg-opacity-20 md:p-7 md:px-7">
      <div className="w-full max-w-[466px]">
        <Typography
          as="h2"
          className="text-sm font-light leading-normal md:text-[28px] md:font-medium"
        >
          Speak to our mortgage experts
        </Typography>

        <Typography
          as="p"
          className="mb-5 mt-[13px] text-xs font-medium leading-[152%] opacity-80 md:mb-3.5 md:mt-[15px] md:text-lg"
        >
          With over 20 years of mortgage experience, our consultants can provide
          guidance and knowledge on the entire mortgage process.
        </Typography>

        <PrimaryButton className="w-full px-6 py-2 text-[10px] font-medium md:w-fit md:px-[45px] md:py-[9.5px] md:text-lg">
          Contact us
        </PrimaryButton>
      </div>

      <div className="w-full flex-grow">
        <NextImage
          src="/images/mortgage-section/mortgage-experts.svg"
          alt="Mortgage experts"
          width={482}
          height={209}
          // className=""
        />
      </div>
    </Section.Container>
  );
};

export default MortgageExperts;
