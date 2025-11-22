import { getGoogleReviews } from "@/api/get-google-reviews";
import Section from "@/components/blocks/Section/index";
import OutlineButton from "@/components/elements/buttons/OutlineButton";
import Typography from "@/components/elements/texts/Typography";
import SingleSlider from "../SingleSlider/Slider";
import ReviewList from "./ReviewList";
import { getReviews } from "@/api/get-reviews";

interface IReviewsProps {
  className?: string;
  apiQuery?: {
    country?: string;
  };
}

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

const Reviews = async ({ className, apiQuery }: IReviewsProps) => {
  const googleReviews = await getGoogleReviews(apiQuery);
  const reviews = await getReviews(apiQuery);

  return (
    <Section.Container className={className}>
      <Typography
        as="h2"
        className="mb-2 text-center text-xl font-normal text-theme-off-white sm:text-[32px] sm:font-medium md:mb-7"
      >
        Client Testimonials
      </Typography>

      <Typography
        as="p"
        className="mb-5 text-center text-[9px] font-light text-theme-off-white sm:hidden"
      >
        Trusted Collaborations with Leading Industry Partners
      </Typography>

      <Section.Container className="h-full">
        <div className="slider-container">
          <SingleSlider settings={slideSettings} className="h-full">
            <ReviewList
              withOnlyFragment
              data={reviews}
              country={apiQuery?.country ?? "uae"}
            />
          </SingleSlider>
        </div>
      </Section.Container>

      <Section.Container>
        <div className="mt-4 flex items-center justify-center gap-4 sm:mt-5">
          <OutlineButton
            className="flex-grow py-2 sm:flex-grow-0 md:py-2.5"
            asChild
          >
            <Typography
              as="a"
              target="_blank"
              href="https://maps.app.goo.gl/43njByeJTFRsP8QRA"
            >
              Show All Reviews
            </Typography>
          </OutlineButton>
        </div>
      </Section.Container>
    </Section.Container>
  );
};

export default Reviews;
