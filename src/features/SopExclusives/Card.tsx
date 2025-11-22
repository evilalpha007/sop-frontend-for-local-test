import { TSopExclusiveItem } from "@/api/get-sop-exclusives";
import Section from "@/components/blocks/Section/index";
import PrimaryButton from "@/components/elements/buttons/PrimaryButton";
import Typography from "@/components/elements/texts/Typography";
import Link from "next/link";
import SingleSlider from "../SingleSlider/Slider";
import GraphFeature from "./GraphFeature";
import SopExclusiveImage from "./SopExclusiveImage";
import TextFeature from "./TextFeature";

interface ICardProps {
  item?: TSopExclusiveItem;
}

const Card = ({ item }: ICardProps) => {
  return (
    <div className="md:!px-2.5">
      <div className="flex flex-col-reverse gap-y-8 md:grid md:grid-cols-[1fr,auto] md:gap-10">
        <div>
          <div className="space-y-7 md:space-y-8">
            <div className="block md:hidden">
              <Typography
                as="h2"
                className="text-md mb-2.5 font-normal leading-[16.44px] text-theme-light-golden"
              >
                NEWLY LAUNCHED
              </Typography>

              <Typography
                as="p"
                className="text-theme-off-whiten mb-[26px] text-xs font-normal leading-[18.6px] text-opacity-80 md:text-opacity-100"
              >
                Navigate Dubai Properties with us & explore investment
                opportunities now!
              </Typography>
            </div>

            <div className="grid gap-x-[73px] gap-y-[18px] md:grid-cols-2">
              <GraphFeature
                title={item?.first_col_title}
                description={item?.first_col_subtitle}
                percentage={item?.first_col_range}
              />

              <GraphFeature
                title={item?.second_col_title}
                description={item?.second_col_subtitle}
                percentage={item?.second_col_range}
              />
            </div>

            <div className="grid gap-x-[73px] gap-y-5 md:grid-cols-2">
              <TextFeature
                title={item?.first_col_header}
                description={item?.first_col_sub_header}
              />

              <TextFeature
                title={item?.second_col_header}
                description={item?.second_col_sub_header}
              />
            </div>
          </div>

          <div className="mb-[27px] mt-[30px] h-0 w-full border-b border-b-theme-light-golden md:mb-5 md:mt-9" />

          <div>
            <Typography className="text-[11px] font-light text-theme-off-white text-opacity-80 md:text-base md:text-opacity-100">
              {item?.description}
            </Typography>
            <br />
            <Typography className="text-[11px] font-light text-theme-off-white text-opacity-80 md:text-base md:text-opacity-100">
              {item?.footer_text}
            </Typography>
          </div>

          <div className="mt-[23px] flex items-center gap-3 md:mt-9 md:gap-6">
            {/* <EnquireModal>
              <PrimaryButton className="flex-shrink-0 flex-grow rounded-sm px-8 text-[10px] font-normal text-white md:flex-grow-0 md:rounded-[5px] md:text-xl">
                Enquire now
              </PrimaryButton>
            </EnquireModal> */}

            <PrimaryButton className="flex-shrink-0 flex-grow rounded-sm bg-theme-gray/90 px-8 py-2 text-[10px] font-normal text-white !ease-in-out hover:bg-theme-gray/80 active:scale-95 disabled:bg-theme-gray/20 disabled:hover:bg-theme-gray/40 md:flex-grow-0 md:rounded-[5px] md:py-[10.5px] md:text-xl">
              <Link
                href={item?.learn_more_url || "#"}
                className="flex flex-row items-center justify-center"
              >
                Learn more
              </Link>
            </PrimaryButton>
          </div>
        </div>

        <div>
          <div className="hidden md:block">
            <SopExclusiveImage
              imageSrc={item?.image}
              imageAlt={item?.alt_text}
            />
          </div>

          <Section.Container className="block md:hidden">
            <SingleSlider>
              <div className="mx-auto">
                <SopExclusiveImage
                  imageSrc={item?.image}
                  imageAlt={item?.alt_text}
                />
              </div>
              <div className="mx-auto">
                <SopExclusiveImage
                  imageSrc={item?.image}
                  imageAlt={item?.alt_text}
                />
              </div>
            </SingleSlider>
          </Section.Container>
        </div>
      </div>
    </div>
  );
};

export default Card;
