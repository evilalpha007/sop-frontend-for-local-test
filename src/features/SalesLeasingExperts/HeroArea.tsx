import Section from "@/components/blocks/Section";
import NextImage from "@/components/elements/images/NextImage";
import Typography from "@/components/elements/texts/Typography";

const HeroArea = () => {
  return (
    <div className="relative flex min-h-[60vh] w-full flex-col items-center justify-center overflow-hidden bg-[url('/images/sales-and-leasing-expert-details/hero-bg.svg')] bg-cover bg-center bg-no-repeat pt-12 lg:min-h-[90vh]">
      {/* span designs */}
      <span className="pointer-events-none absolute left-0 top-0 h-full w-full bg-theme-black/70"></span>
      <span className="pointer-events-none absolute left-0 top-0 h-full w-full bg-gradient-to-t from-transparent from-30% to-black/70"></span>
      <span className="pointer-events-none absolute left-0 top-0 h-full w-full bg-gradient-to-t from-theme-black to-transparent to-40%"></span>
      <Section.Container className="relative z-10 2xl:max-w-[1440px]">
        <div className="flex w-full flex-col items-center justify-center gap-5 lg:flex-row">
          <div className="infoBox w-full lg:w-2/5">
            <Typography className="text-wrap text-3xl font-medium uppercase leading-snug tracking-wider text-theme-light-golden lg:text-4xl 2xl:text-5xl">
              REAL ESTATE AGENTS IN DUBAI
            </Typography>
            <Typography className="my-5 !text-xl !font-light tracking-wider">
              Team of real estate experts
            </Typography>
          </div>
          {/* image box */}
          <div className="imageBox flex w-full flex-row items-center justify-center lg:w-3/5">
            <div className="relative z-[5] -mr-12 w-full border border-theme-light-golden">
              <NextImage
                src="/images/sales-and-leasing-expert-details/members/01.svg"
                alt="hero image"
                width={700}
                height={600}
                className="w-full object-cover"
              />
            </div>
            <div className="relative z-[4] -mr-12 mt-[20%] w-[98%] border border-theme-light-golden">
              <NextImage
                src="/images/sales-and-leasing-expert-details/members/02.svg"
                alt="hero image"
                width={600}
                height={600}
                className="w-full object-cover"
              />
            </div>
            <div className="relative z-[3] -mr-12 mt-[7%] w-[95%] border border-theme-light-golden">
              <NextImage
                src="/images/sales-and-leasing-expert-details/members/03.svg"
                alt="hero image"
                width={600}
                height={600}
                className="w-full object-cover"
              />
            </div>
            <div className="relative z-[2] -mr-12 mt-[25%] w-[80%] border border-theme-light-golden">
              <NextImage
                src="/images/sales-and-leasing-expert-details/members/04.svg"
                alt="hero image"
                width={600}
                height={600}
                className="w-full object-cover"
              />
            </div>
          </div>
        </div>
      </Section.Container>
    </div>
  );
};

export default HeroArea;
