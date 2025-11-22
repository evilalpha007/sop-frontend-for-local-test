import { getHomeTeam } from "@/api/get-home-team";
import Section from "@/components/blocks/Section/index";
import OutlineButton from "@/components/elements/buttons/OutlineButton";
import Typography from "@/components/elements/texts/Typography";
import SingleSlider from "@/features/SingleSlider/Slider";
import Link from "next/link";
import ExpertCard from "../ExpertCard";

const slideSettings = {
  slidesToShow: 3,
  slidesToScroll: 3,
  initialSlide: 0,
  infinite: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
      },
    },
    {
      breakpoint: 1023,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: true,
      },
    },
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
      },
    },
  ],
};

interface IExpertsSlideProps {
  className?: string;
  apiQuery?: {
    country?: string;
    language?: string | number;
    specialized?: string | number;
  };
}

const ExpertsSlide = async ({ className, apiQuery }: IExpertsSlideProps) => {
  const data = await getHomeTeam(apiQuery);

  //  // console.log("country: ", country);
  return (
    <Section.Container className={className}>
      <div>
        <Typography
          as="h2"
          className="mb-2.5 text-center text-sm font-light leading-[23px] text-theme-light-golden sm:mb-[11px] sm:text-[32px] sm:leading-[37.57px]"
        >
          The Experts You Trust, The Results You Deserve!
        </Typography>
      </div>

      <div className="flex w-full flex-col items-center">
        <Typography className="mb-6 max-w-[602px] text-center text-[11px] font-light leading-[17px] text-theme-off-white sm:text-lg sm:leading-[29px]">
          Find your consultant now!
        </Typography>
      </div>

      {/* <div className="mb-[38px] flex justify-center">
        <div
          className={cn(
            "grid grid-cols-2 place-items-center gap-3.5 sm:grid-cols-3",
            !!specialization || !!language ? "sm:grid-cols-4" : "",
          )}
        >
          <Filters
            specializationOptions={specializationOptions}
            languageOptions={languageOptions}
          />

          <PrimaryButton
            asChild
            className="col-span-full w-full flex-grow rounded-none text-center sm:col-span-1"
          >
            <Link href="/our-team">Show All</Link>
          </PrimaryButton>
        </div>
      </div> */}

      <div>
        <Section.Container>
          {/* <div className="sm:hidden">
            <MobileSlider />
          </div>
          <div className="hidden md:block lg:hidden">
            <TabletSlider />
          </div>
          <div className="hidden lg:block">
            <DesktopSlider />
          </div> */}
          <SingleSlider settings={slideSettings}>
            {data?.map((expert) => (
              <div className="px-2.5" key={expert?.id}>
                <ExpertCard
                  id={expert?.id ?? -1}
                  image={expert?.image}
                  alt={expert?.alt_text}
                  slug={expert?.slug}
                  name={expert?.full_name}
                  designation={expert?.specialized?.name}
                  experience={expert?.experience}
                  languages={expert?.languages
                    ?.map((language) => language?.name)
                    ?.join(", ")}
                />
              </div>
            ))}
          </SingleSlider>

          {/* <SingleSlider>
            <ExpertGroup />
            <ExpertGroup />
          </SingleSlider> */}
        </Section.Container>
        {/* <ExpertCardList /> */}

        <div className="mt-5 flex justify-center">
          <OutlineButton asChild className="rounded-none text-center">
            <Link href="/our-team">Show All</Link>
          </OutlineButton>
        </div>
      </div>
    </Section.Container>
  );
};

export default ExpertsSlide;
