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
import ContactRow from "@/features/ExpertPropertyContactCard/ContactRow";
import Accordion from "@/components/elements/Accordion";
import { AccordionProvider } from "@/components/elements/Accordion/AccordionContext";
import parse from "html-react-parser";
import BookingForm from "@/features/Experts/BookingForm";
import { Metadata } from "next";
import SimilarPropertyList from "@/features/Properties/SimilarPropertyList";

interface IProductDetailsPageProps {
  params: { slug?: string };
  searchParams: {};
  country?: string;
}

const getYouTubeID = (url: any) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { propertyData } = await getPropertyDetails({
    slug: params?.slug,
  });

  const { ad_section, meta_section } = propertyData;

  return {
    title: meta_section?.meta_title || "Property Details",
    description: meta_section?.meta_description || "",
    keywords: meta_section?.meta_keywords || "",
    openGraph: {
      images: ad_section?.ad_image ? [ad_section.ad_image] : [],
    },
  };
}

const ProductDetailsPage = async ({ params }: any) => {
  const {
    propertyData,
    listingDetailsData,
    description,
    floorPlanDetailsData,
    featureAmenitiesSectionData,
    highlightsSectionData,
    location_section,
    dld_section,
    developer_section,
    video_section,
    propertySliderImages,
    title,
    price,
    size,
    bedrooms,
    washrooms,
    address,
    country = params?.country,
  } = await getPropertyDetails({
    slug: params?.slug,
  });

  const data = propertyData?.faq_section?.faq_data;
  return (
    <>
      {/* <ProductDetailsModal /> */}
      <HeroSection
        data={propertyData}
        propertySliderImages={propertySliderImages}
        info={{
          title,
          address,
          bedrooms,
          price,
          size,
          washrooms,
        }}
        country={country}
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
                  className="text-center# mx-auto w-full  text-center text-sm font-light leading-6 text-theme-off-white text-opacity-80 md:text-[17px] md:leading-[31px]"
                >
                  {parse(propertyData?.description ?? "")}
                </Typography>
              </Section.Container>
            </div>
          )}

          <Hr
            className="mb-[83px] mt-[80px] border-b-theme-light-golden"
            withSectionContainer
          />
          {!!propertyData?.plan_section?.is_plan_section && (
            <>
              <div id="FloorPlan">
                <FloorPlan data={propertyData} />
              </div>
              <Hr
                className="mb-[83px] mt-[80px] border-b-theme-light-golden"
                withSectionContainer
              />
            </>
          )}

          {/* Floor Plan Details */}
          {!!floorPlanDetailsData?.shouldVisible && (
            <ArrowListTable>
              <ArrowListTable.Title
                title={
                  propertyData?.floor_plan_details_section?.floor_plan_title ??
                  "Explore the Floor Plan"
                }
              />
              <ArrowListTable.Description
                description={
                  propertyData?.floor_plan_details_section
                    ?.floor_plan_subtitle ??
                  "A detailed look at the layout and space distribution"
                }
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
          {!!propertyData?.["360_viewport_section"]
            ?.is_360_viewport_section && (
            <>
              <div id="Viewport">
                <ViewPort360 data={propertyData} />
              </div>
              <Hr
                className="mb-[83px] mt-[80px] border-b-theme-light-golden"
                withSectionContainer
              />
            </>
          )}
          {/* Features & amenities */}
          {
            <div id="FeaturesAmenities">
              <ArrowListTable>
                <ArrowListTable.Title title={"Key Features & Benefits"} />
                <ArrowListTable.Description
                  description={
                    "A blend of luxury, convenience, and functionality."
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
                title={propertyData?.highlights_section?.highlight_title}
              />
              <ArrowListTable.Description
                description={
                  propertyData?.highlights_section?.highlight_description
                }
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
                    {propertyData?.dld_section?.dld_title}
                  </Typography>
                </div>

                <div className="flex w-full flex-col items-center justify-between gap-3 lg:w-2/3 lg:flex-row">
                  {propertyData?.dld_section?.dld_qr_code && (
                    <NextImage
                      src={propertyData?.dld_section?.dld_qr_code}
                      alt="qr-code"
                      width={178}
                      height={164}
                      className="h-[164px] w-[178px]"
                    />
                  )}

                  {propertyData?.dld_section?.dld_qr_code &&
                    propertyData?.dld_section?.dld_qr_number && (
                      <Typography
                        as="p"
                        className="text-[22px] font-light leading-10 text-theme-off-white"
                      >
                        OR
                      </Typography>
                    )}

                  {propertyData?.dld_section?.dld_qr_number && (
                    <Typography
                      as="p"
                      className="text-[22px] font-light leading-10 text-theme-off-white"
                    >
                      {propertyData?.dld_section?.dld_qr_number}
                    </Typography>
                  )}
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
                    {parse(video_section?.video_description ?? "")}
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
                    <iframe
                      width="560"
                      height="315"
                      src={`https://www.youtube.com/embed/${getYouTubeID(video_section?.highlight_video_url) || "XXYelygwnlE"}`}
                      title="YouTube video player"
                      frameBorder="0"
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
                  image={
                    propertyData?.contact_form_section
                      ?.property_contact_member_image ||
                    "/images/logo/primary-logo.svg"
                  }
                  alt="expert"
                  name={
                    propertyData?.contact_form_section
                      ?.property_contact_member_name
                  }
                  designation={
                    propertyData?.contact_form_section
                      ?.property_contact_member_specialized
                  }
                  experience={
                    propertyData?.contact_form_section
                      ?.property_contact_member_experience
                  }
                  languages={
                    propertyData?.contact_form_section
                      ?.property_contact_member_language
                      ? Array.isArray(
                          propertyData.contact_form_section
                            .property_contact_member_language,
                        )
                        ? propertyData.contact_form_section.property_contact_member_language.join(
                            ", ",
                          )
                        : (() => {
                            try {
                              const parsed = JSON.parse(
                                propertyData.contact_form_section
                                  .property_contact_member_language,
                              );
                              return Array.isArray(parsed)
                                ? parsed.join(", ")
                                : propertyData.contact_form_section
                                    .property_contact_member_language;
                            } catch {
                              return propertyData.contact_form_section
                                .property_contact_member_language;
                            }
                          })()
                      : ""
                  }
                />
              </div>

              <BookingForm
                country={country}
                slug={params?.slug}
                id={propertyData?.id}
              />
            </div>
          </Section.Container>

          <Hr
            className="mb-[83px] mt-[80px] border-b-theme-light-golden"
            withSectionContainer
          />
          {/* About DeveloperMarina */}
          {developer_section?.is_developer_section && (
            <div id="DubaiMarina">
              <DubaiMarina developerSection={developer_section} />
            </div>
          )}

          <Hr
            className="mb-[83px] mt-[80px] border-b-theme-light-golden"
            withSectionContainer
          />

          <div id="FrequentlyAskedQuestions">
            {/* <Faq /> */}
            <Section.Container>
              <Typography
                as="h2"
                className="mb-[18px] text-center text-[20px] font-medium text-theme-off-white sm:mb-[35px] sm:text-[32px]"
              >
                Frequently asked questions
              </Typography>

              <AccordionProvider>
                <div className="space-y-1 sm:space-y-2">
                  {data?.map((item: any) => (
                    <Accordion key={item?.id} title={item?.question ?? ""}>
                      <p className="bg-theme-light-golden bg-opacity-20 px-4 py-3.5 text-[12px] font-light leading-[18px] sm:px-7 sm:py-5 sm:text-lg sm:leading-6">
                        {item?.answer}
                      </p>
                    </Accordion>
                  ))}
                </div>
              </AccordionProvider>
            </Section.Container>
          </div>

          <Hr
            className="mb-[83px] mt-[80px] border-b-theme-light-golden"
            withSectionContainer
          />

          <Reviews />

          <Hr
            className="mb-[83px] mt-[80px] border-b-theme-light-golden"
            withSectionContainer
          />
          <SimilarPropertyList
            apiQuery={{
              type_id: propertyData?.parameters?.type_id,
              city_id: propertyData?.parameters?.city_id,
              country: "in",
            }}
          />
        </div>
      </Section>
    </>
  );
};

export default ProductDetailsPage;
