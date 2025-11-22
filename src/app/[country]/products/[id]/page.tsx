import { getPropertyDetails } from "@/api/get-property-details";
import Section from "@/components/blocks/Section/index";
import Hr from "@/components/elements/border/Hr";
import Button from "@/components/elements/buttons/Button";
import PrimaryButton from "@/components/elements/buttons/PrimaryButton";
import SecondaryButton from "@/components/elements/buttons/SecondaryButton";
import NextImage from "@/components/elements/images/NextImage";
import Input from "@/components/elements/inputs/Input";
import Typography from "@/components/elements/texts/Typography";
import ArrowListTable from "@/features/ArrowListTable";
import ExpertCard from "@/features/Experts/ExpertCard";
import Faq from "@/features/Faq";
import LocationList from "@/features/LocationList";
import DubaiMarina from "@/features/Products/DubaiMarina";
import FloorPlan from "@/features/Products/FloorPlan";
import HeroSection from "@/features/Products/HeroSection";
import UpComingShortTab from "@/features/Products/UpComingShortTab";
import ViewPort360 from "@/features/Products/ViewPort360";
import Reviews from "@/features/Reviews";
import { cn } from "@/library/utils/cn";
import Link from "next/link";
import { FaPhone } from "react-icons/fa";



interface IProductDetailsPageProps {
  params: { slug?: string; country?: string };
  searchParams: {};
}

const ProductDetailsPage = async ({ params }: IProductDetailsPageProps) => {
  const {
    listingDetailsData,
    description,
    floorPlanDetailsData,
    featureAmenitiesSectionData,
    highlightsSectionData,
    location_section,
    dld_section,
    video_section,
    propertySliderImages,
    title,
    price,
    size,
    bedrooms,
    washrooms,
    address,
  } = await getPropertyDetails({
    slug: params?.slug,
  });

  // console.log("processed listing data: ", {
  //   listingDataPart1,
  //   listingDataPart2,
  // });

  return (
    <>
      {/* <ProductDetailsModal /> */}
      <HeroSection
        propertySliderImages={propertySliderImages}
        info={{
          title,
          address,
          bedrooms,
          price,
          size,
          washrooms,
        }}
        slug={params?.slug}
      />

      {/* tab section */}
      <Section.Container className="bg-[#232223] py-5 pb-8">
        <Typography
          as="h2"
          className="mb-6 text-center text-xl font-light text-theme-light-golden md:text-3xl"
        >
          Navigate This Listing
        </Typography>
        <UpComingShortTab />
      </Section.Container>

      <Section>
        <div>
          {!!listingDetailsData?.shouldVisible && (
            <div id="ListingDetails">
              <ArrowListTable>
                <ArrowListTable.Title title="Listing Details" />
                <ArrowListTable.Description
                  description={
                    "Comprehensive Property Listings for Your Dream Home"
                  }
                />
                <ArrowListTable.ListRowsGroup maxColumns="2">
                  <div className="w-full overflow-x-auto">
                    <div className="w-full min-w-[300px]">
                      <ArrowListTable.ListRowsGroup.ListRows
                        data={listingDetailsData?.listingDataPart1}
                      />
                    </div>
                  </div>
                  <div className="w-full overflow-x-auto">
                    <div className="w-full min-w-[300px]">
                      <ArrowListTable.ListRowsGroup.ListRows
                        data={listingDetailsData?.listingDataPart2}
                      />
                    </div>
                  </div>
                </ArrowListTable.ListRowsGroup>
              </ArrowListTable>
            </div>
          )}

          <Hr
            className="mb-[50px] mt-[109px] border-b-theme-light-golden"
            withSectionContainer
          />

          {/* Description */}
          {!!description && (
            <div id="Description">
              <Section.Container>
                <Typography
                  as="h2"
                  className="mb-6 text-center text-2xl font-light text-theme-light-golden md:text-3xl"
                >
                  Description
                </Typography>


                <Typography
                  as="p"
                  className="text-center# mx-auto w-full max-w-[863px] text-justify text-sm font-light leading-6 text-theme-off-white text-opacity-80 md:text-lg md:leading-[31px]"
                >
                  {description}
                </Typography>
              </Section.Container>
            </div>
          )}

          <Hr
            className="mb-[83px] mt-[80px] border-b-theme-light-golden"
            withSectionContainer
          />

          {/* <div id="FloorPlan">
            <FloorPlan />
          </div> */}

          <Hr
            className="mb-[83px] mt-[80px] border-b-theme-light-golden"
            withSectionContainer
          />
          {/* Floor Plan Details */}
          {!!floorPlanDetailsData?.shouldVisible && (
            <ArrowListTable>
              <ArrowListTable.Title
                title={floorPlanDetailsData?.floorPlanTitle}
              />
              <ArrowListTable.Description
                description={floorPlanDetailsData?.floorPlanSubtitle}
              />

              <ArrowListTable.ListRowsGroup maxColumns="3" gap="none">
                <ArrowListTable.ListRowsGroup.ListRows
                  data={floorPlanDetailsData?.propertyTypeTable}
                  type="with-header"
                  header="Property Type"
                />
                <ArrowListTable.ListRowsGroup.ListRows
                  data={floorPlanDetailsData?.sizeTable}
                  type="with-header"
                  header="Size"
                />
                <ArrowListTable.ListRowsGroup.ListRows
                  data={floorPlanDetailsData?.priceTable}
                  type="with-header"
                  header="Price"
                />
              </ArrowListTable.ListRowsGroup>
            </ArrowListTable>
          )}

          <Hr
            className="mb-[83px] mt-[80px] border-b-theme-light-golden"
            withSectionContainer
          />
          {/* <div id="Viewport">
            <ViewPort360 />
          </div> */}
          <Hr
            className="mb-[83px] mt-[80px] border-b-theme-light-golden"
            withSectionContainer
          />
          {/* Features & amenities */}
          {
            <div id="FeaturesAmenities">
              <ArrowListTable>
                <ArrowListTable.Title
                  title={
                    featureAmenitiesSectionData?.featureAmenitiesSectionTitle
                  }
                />
                <ArrowListTable.Description
                  description={
                    "Comprehensive Property Listings for Your Dream Home"
                  }
                />

                <ArrowListTable.ListRowsGroup maxColumns="3">
                  <ArrowListTable.ListRowsGroup.ListRows
                    data={featureAmenitiesSectionData?.part1Data}
                  />
                  <ArrowListTable.ListRowsGroup.ListRows
                    data={featureAmenitiesSectionData?.part2Data}
                  />
                  <ArrowListTable.ListRowsGroup.ListRows
                    data={featureAmenitiesSectionData?.part3Data}
                  />
                </ArrowListTable.ListRowsGroup>
              </ArrowListTable>
            </div>
          }

          <Hr
            className="mb-[83px] mt-[80px] border-b-theme-light-golden"
            withSectionContainer
          />

          {!!highlightsSectionData?.shouldVisible && (
            <ArrowListTable>
              <ArrowListTable.Title
                title={highlightsSectionData?.highlightTitle}
              />
              <ArrowListTable.Description
                description={highlightsSectionData?.highlightDescription}
              />

              <ArrowListTable.ListRowsGroup maxColumns="2" gap="none">
                <ArrowListTable.ListRowsGroup.ListRows
                  data={highlightsSectionData?.highlightsTable1}
                  header="Size"
                />
                <ArrowListTable.ListRowsGroup.ListRows
                  data={highlightsSectionData?.highlightsTable2}
                  header="Size"
                />
              </ArrowListTable.ListRowsGroup>
            </ArrowListTable>
          )}

          <Hr
            className="mb-[83px] mt-[80px] border-b-theme-light-golden"
            withSectionContainer
          />

          {!!location_section?.is_location_section && (
            <div id="Location">
              <LocationList
                title={location_section?.location_section_title}
                subtitle={location_section?.location_section_subtitle}
                locationMapUrl={location_section?.location_map_url}
                locationListTitle={location_section?.location_section_slogan}
                locations={location_section?.location_left_data}
              />
            </div>
          )}

          <Hr
            className="mb-[83px] mt-[80px] border-b-theme-light-golden"
            withSectionContainer
          />

          {dld_section?.is_dld_section && (
            <Section.Container>
              <div
                id="DLDPermitNumber"
                className="flex flex-col items-center justify-between gap-6 bg-theme-gray bg-opacity-30 px-10 py-10 md:flex-row"
              >
                <div className="w-full lg:w-2/3">
                  <Typography
                    as="h2"
                    className="mb-[23px] text-center text-xl font-light leading-normal text-theme-light-golden md:text-start md:text-2xl lg:text-[32px]"
                  >
                    {dld_section?.dld_title}
                  </Typography>
                </div>

                <div className="flex w-full flex-col items-center justify-between gap-3 lg:w-2/3 lg:flex-row">
                  <NextImage
                    src="/images/property-details/qr-code.svg"
                    alt="qr-code"
                    width={178}
                    height={164}
                    className="h-[164px] w-[178px]"
                  />

                  <Typography
                    as="p"
                    className="text-[22px] font-light leading-10 text-theme-off-white"
                  >
                    OR
                  </Typography>

                  <Link
                    className="flex flex-row items-center justify-center gap-2 text-xl transition-all duration-300 hover:text-theme-light-golden"
                    href={`tel:${dld_section?.dld_qr_number}`}
                    passHref
                  >
                    <FaPhone className="text-xl text-theme-light-golden" />
                    {dld_section?.dld_qr_number}
                  </Link>
                </div>
              </div>
            </Section.Container>
          )}

          <Hr
            className="mb-[83px] mt-[80px] border-b-theme-light-golden"
            withSectionContainer
          />

          {!!video_section?.is_video_section && (
            <Section.Container>
              <div
                id="NowInYoutube"
                className="flex w-full flex-col items-center gap-x-16 p-[50px] lg:flex-row"
              >
                <div className="flex-col items-start justify-center text-center lg:flex-[45%] lg:text-start">
                  <Typography
                    as="h2"
                    className={cn(
                      "relative hidden w-full cursor-pointer disabled:cursor-not-allowed lg:inline-block",
                      "after:absolute after:-bottom-6 after:left-0 after:right-0 after:w-full after:scale-x-0 after:border-b-[3px] after:border-b-theme-off-white after:opacity-0 after:transition-all after:duration-300 after:content-[''] after:hover:scale-x-100 after:hover:opacity-100",
                      "pr-20 text-xs font-light text-theme-off-white sm:text-[39px]",
                      "text-nowrap after:scale-x-100 after:border-b-theme-light-golden after:opacity-100 lg:max-w-[400px]",
                    )}
                  >
                    {video_section?.video_title}
                  </Typography>
                  {/* <Typography
                  as="h2"
                  className="mb-1.5 text-2xl font-light text-theme-light-golden md:text-4xl"
                >
                  Now in Youtube
                </Typography> */}

                  <Typography
                    as="p"
                    className="mb-[37px] pr-2.5 text-sm font-light text-theme-off-white md:text-xl lg:mt-10"
                  >
                    {video_section?.video_description}
                  </Typography>

                  <Button className="hidden items-center gap-3.5 border border-theme-light-golden px-[35px] py-3.5 text-xl font-normal text-white lg:flex">
                    <NextImage
                      src="/svg-icons/why-work-with-sop/play-icon.svg"
                      alt="play-icon"
                      width={18}
                      height={18}
                      className="size-[18px]"
                      disableBlur
                    />
                    {video_section?.video_button_text}
                  </Button>
                </div>

                <div className="w-full lg:flex-[45%]">
                  <div className="relative aspect-video w-full overflow-clip rounded-md">
                    {/* <NextImage
                      src="/images/why-work-with-sop/1.svg"
                      alt="why-work-with-sop"
                      width={558}
                      height={324}
                      className="w-full overflow-hidden rounded-[20px]"
                    />

                    <NextImage
                      src="/svg-icons/why-work-with-sop/youtube-play.svg"
                      alt="why-work-with-sop"
                      width={75}
                      height={52}
                      className="absolute left-1/2 top-1/2 z-[1] h-[52px] w-[75px] -translate-x-1/2 -translate-y-1/2 transform"
                    /> */}

                    <iframe
                      width="560"
                      height="315"
                      src="https://www.youtube.com/embed/5fLW5Q5ODiE?si=l4OM77oSkKG_mhoT"
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      loading="lazy"
                      className="h-full w-full"
                    />
                  </div>

                  <PrimaryButton asChild className="mt-[10px] w-full lg:hidden">
                    <Link
                      href={video_section?.video_button_link ?? "#"}
                      target="_blank"
                    >
                      {video_section?.video_button_text}
                    </Link>
                  </PrimaryButton>
                </div>
              </div>
            </Section.Container>
          )}

          <Hr
            className="mb-[83px] mt-[80px] border-b-theme-light-golden"
            withSectionContainer
          />

          <Section.Container>
            <div
              id="BookYourViewing"
              className="flex w-full flex-col items-center gap-10 rounded-[5px] border border-solid border-theme-green-gray border-opacity-20 bg-theme-gray bg-opacity-20 px-5 py-5 md:px-[80px] md:py-[60px] lg:flex-row"
            >
              <div className="w-full max-w-full flex-1 lg:max-w-[460px]">
                <ExpertCard
                  id={1}
                  image="/images/experts/1.svg"
                  alt="expert"
                  name="Dmitri Zolotco"
                  designation="Senior Sales Manager"
                  experience="12 years"
                  languages="English, Russian, Romanian"
                />
              </div>

              <div className="w-full flex-1">
                <Typography
                  as="h2"
                  className="mb-1.5 text-center text-xl font-normal text-theme-light-golden lg:text-4xl"
                >
                  BOOK YOUR VIEWING
                </Typography>

                <Typography
                  as="p"
                  className="mb-[30px] text-center text-sm font-light text-theme-off-white lg:text-xl"
                >
                  And our agent will show you property
                </Typography>

                <div className="mb-5 flex w-full items-center gap-2.5">
                  <PrimaryButton className="w-full">In person</PrimaryButton>

                  <SecondaryButton className="w-full py-2 text-theme-light-golden md:py-2.5">
                    Video chat
                  </SecondaryButton>

                  <PrimaryButton className="py-2 md:py-3.5">
                    <NextImage
                      src="/svg-icons/property-details/calender-black.svg"
                      alt="whatsapp"
                      width={28}
                      height={25}
                      disableBlur
                      className="h-3 w-4 md:h-4 lg:h-[25px] lg:w-7"
                    />
                  </PrimaryButton>
                </div>

                <div className="space-y-[25px]">
                  <Input
                    label="Full Name"
                    placeholder="Enter your full name"
                    labelClassName="text-theme-off-white text-theme-green-gray text-xs font-medium sm:mb-1.5"
                    className="bg-transparent"
                  />

                  <Input
                    label="Email"
                    placeholder="Enter your email"
                    labelClassName="text-theme-off-white text-theme-green-gray text-xs font-medium sm:mb-1.5"
                    className="bg-transparent"
                  />

                  <Input
                    label="Mobile"
                    placeholder="Enter your mobile number"
                    labelClassName="text-theme-off-white text-theme-green-gray text-xs font-medium sm:mb-1.5"
                    className="bg-transparent"
                  />
                </div>

                <div className="mt-[30px] flex w-full items-center gap-2.5">
                  <PrimaryButton className="w-full sm:text-lg md:flex-[60%]">
                    Submit
                  </PrimaryButton>

                  <SecondaryButton className="flex w-full items-center justify-center gap-2 py-2 text-theme-light-golden sm:text-lg md:flex-[40%] md:py-2.5">
                    <NextImage
                      src="/svg-icons/property-details/whats-app.svg"
                      alt="whatsapp"
                      width={26}
                      height={25}
                      disableBlur
                      className="size-3 md:size-6"
                    />
                    Whats App
                  </SecondaryButton>
                </div>
              </div>
            </div>
          </Section.Container>

          <Hr
            className="mb-[83px] mt-[80px] border-b-theme-light-golden"
            withSectionContainer
          />
          {/* About DeveloperMarina */}
          {/* <div id="DubaiMarina">
            <DubaiMarina />
          </div> */}

          <Hr
            className="mb-[83px] mt-[80px] border-b-theme-light-golden"
            withSectionContainer
          />

          <div id="FrequentlyAskedQuestions">
            <Faq />
          </div>

          <Hr
            className="mb-[83px] mt-[80px] border-b-theme-light-golden"
            withSectionContainer
          />

          <Reviews
            apiQuery={{
              country: params?.country,
            }}
          />
        </div>
      </Section>
    </>
  );
};

export default ProductDetailsPage;
