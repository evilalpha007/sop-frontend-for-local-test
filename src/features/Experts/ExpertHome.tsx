import { getHomeExpert } from "@/api/get-home-expert";
import Section from "@/components/blocks/Section";
import NextImage from "@/components/elements/images/NextImage";
import { generateBlurDataUrl } from "@/library/utils/image";
import Title from "../TextBlock/Title";
import parse from "html-react-parser";

interface IExpertHomeProps {
  apiQuery?: { country?: string };
}

const ExpertHome = async ({ apiQuery }: IExpertHomeProps) => {
  // const expertHomeData = await getHomeExpert(apiQuery);
  const expertHomeData = await getHomeExpert(apiQuery);
  const blurDataURL = await generateBlurDataUrl(expertHomeData?.image);

  return (
    <Section.Container>
      <div className="flex flex-col items-start justify-start gap-7 lg:flex-row lg:gap-12">
        {/* image */}
        <div className="w-full lg:w-2/5">
          <NextImage
            src={expertHomeData?.image || ""}
            alt={expertHomeData?.title || "Expert Home"}
            blurDataURL={blurDataURL}
            width={418}
            height={507}
            className="h-full w-full object-cover"
          />
        </div>

        {/* info */}
        <div className="w-full lg:w-3/5">
          <div>
            <Title className="w-full text-3xl lg:text-start lg:text-4xl">
              {expertHomeData?.title}
            </Title>

            <div className="w-full">
              <div className="flex w-full flex-col items-center justify-start gap-5 md:flex-row lg:gap-12">
                {/* description */}
                <div className="w-full md:w-3/6">
                  <p className="text-sm font-light leading-[1.6rem] opacity-90 lg:text-[15px]">
                    {parse(expertHomeData?.description ?? "")}
                  </p>
                </div>

                {/* counters */}
                <div className="flex w-full flex-row items-start justify-between gap-3 border-[#ECECECB2]/30 md:w-2/6 md:flex-col md:justify-center md:gap-7 md:border-l md:pl-12">
                  {expertHomeData?.data?.map((data) => (
                    <div
                      key={data.title}
                      className="mt-2 flex w-full items-center gap-2"
                    >
                      <div>
                        <p className="text-3xl text-theme-light-golden">
                          {data.value}
                        </p>

                        <p className="text-sm font-light opacity-80">
                          {data.title}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* <div className="mt-8 w-full lg:w-[85%]">
                <EnquireModal>
                  <button className="flex w-full flex-row items-center justify-center bg-theme-light-golden py-2.5 text-center font-medium text-theme-black transition-all duration-300 hover:bg-theme-off-golden">
                    Enquire now
                  </button>
                </EnquireModal>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </Section.Container>
  );
};

export default ExpertHome;
