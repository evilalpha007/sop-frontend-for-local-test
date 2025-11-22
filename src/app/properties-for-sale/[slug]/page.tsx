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
import {
  FaPhone,
  FaCheck,
  FaStar,
  FaChild,
  FaClock,
  FaHeadset,
  FaMapMarkerAlt,
  FaEnvelope,
  FaUser,
} from "react-icons/fa";
import ContactRow from "@/features/ExpertPropertyContactCard/ContactRow";
import Accordion from "@/components/elements/Accordion";
import { AccordionProvider } from "@/components/elements/Accordion/AccordionContext";
import parse from "html-react-parser";
import BookingForm from "@/features/Experts/BookingForm";
import { Metadata } from "next";
import SimilarPropertyList from "@/features/Properties/SimilarPropertyList";

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { propertyData } = await getPropertyDetails({
    slug: params.slug,
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

const getYouTubeID = (url: any) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

// Enhanced Sidebar Inquiry Form Component
// const InquirySidebar = ({ country, slug, id }: { country: string; slug: string; id: number }) => {
//   return (
//     <div className="sticky top-6 space-y-6" style={{
//       height: 'fit-content',
//       zIndex: 10
//     }}>
//       {/* Inquiry Form */}
//       <div className="rounded-xl border border-theme-light-golden border-opacity-30 bg-theme-gray bg-opacity-70 backdrop-blur-sm p-6 shadow-lg">
//         <div className="text-center mb-6">
//           <div className="w-12 h-12 bg-theme-light-golden bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
//             <FaEnvelope className="text-theme-light-golden text-lg" />
//           </div>
//           <Typography as="h3" className="text-xl font-semibold text-theme-light-golden">
//             Request More Information
//           </Typography>
//           <Typography as="p" className="text-sm text-theme-green-gray mt-2">
//             Get detailed pricing and availability
//           </Typography>
//         </div>

//         <div className="space-y-4">
//           <div className="relative">
//             <FaUser className="absolute left-3 top-3.5 text-theme-green-gray text-sm" />
//             <Input
//               type="text"
//               placeholder="Full Name"
//               className="w-full bg-theme-dark-gray border border-theme-green-gray border-opacity-40 text-theme-off-white pl-10 py-3 rounded-lg focus:border-theme-light-golden transition-colors"
//             />
//           </div>

//           <div className="relative">
//             <FaEnvelope className="absolute left-3 top-3.5 text-theme-green-gray text-sm" />
//             <Input
//               type="email"
//               placeholder="Email Address"
//               className="w-full bg-theme-dark-gray border border-theme-green-gray border-opacity-40 text-theme-off-white pl-10 py-3 rounded-lg focus:border-theme-light-golden transition-colors"
//             />
//           </div>

//           <div className="relative">
//             <FaPhone className="absolute left-3 top-3.5 text-theme-green-gray text-sm" />
//             <Input
//               type="tel"
//               placeholder="Phone Number"
//               className="w-full bg-theme-dark-gray border border-theme-green-gray border-opacity-40 text-theme-off-white pl-10 py-3 rounded-lg focus:border-theme-light-golden transition-colors"
//             />
//           </div>

//           <div className="relative">
//             <textarea
//               placeholder="Your Message / Questions"
//               rows={4}
//               className="w-full rounded-lg bg-theme-dark-gray border border-theme-green-gray border-opacity-40 text-theme-off-white px-3 py-3 text-sm placeholder-theme-green-gray focus:outline-none focus:ring-2 focus:ring-theme-light-golden focus:border-transparent resize-none"
//             />
//           </div>

//           <PrimaryButton className="w-full py-3.5 rounded-lg font-medium text-white hover:bg-opacity-90 transition-all duration-200 transform hover:scale-[1.02]">
//             Submit Inquiry
//           </PrimaryButton>
//         </div>

//         <Typography as="p" className="text-xs text-theme-green-gray text-center mt-4">
//           We respect your privacy. Your information is safe with us.
//         </Typography>
//       </div>

//       {/* Quick Contact Card */}
//       <div className="rounded-xl border border-theme-light-golden border-opacity-30 bg-gradient-to-br from-theme-gray to-theme-dark-gray bg-opacity-80 backdrop-blur-sm p-6 text-center shadow-lg">
//         <div className="w-14 h-14 bg-theme-light-golden bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
//           <FaPhone className="text-theme-light-golden text-xl" />
//         </div>

//         <Typography as="h3" className="mb-3 text-lg font-semibold text-theme-off-white">
//           Need Immediate Assistance?
//         </Typography>

//         <Typography as="p" className="text-theme-green-gray text-sm mb-4">
//           Call us now for instant support
//         </Typography>

//         <div className="flex items-center justify-center space-x-3 text-theme-light-golden mb-4">
//           <FaPhone className="text-sm" />
//           <Typography as="span" className="text-lg font-semibold">
//             +971551307662
//           </Typography>
//         </div>

//         <SecondaryButton className="w-full py-2.5 rounded-lg border-theme-light-golden text-theme-light-golden hover:bg-theme-light-golden hover:bg-opacity-10 transition-colors">
//           Schedule Callback
//         </SecondaryButton>
//       </div>

//       {/* Why Choose Us Section */}
//       <div className="rounded-xl border border-theme-light-golden border-opacity-30 bg-theme-gray bg-opacity-70 backdrop-blur-sm p-6 shadow-lg">
//         <div className="text-center mb-6">
//           <div className="w-12 h-12 bg-theme-light-golden bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
//             <FaStar className="text-theme-light-golden text-lg" />
//           </div>
//           <Typography as="h3" className="text-xl font-semibold text-theme-light-golden">
//             Why Choose Us
//           </Typography>
//         </div>

//         <div className="space-y-4">
//           {[
//             {
//               icon: FaCheck,
//               title: "Expert Guidance",
//               description: "Professional advice from experienced real estate experts"
//             },
//             {
//               icon: FaStar,
//               title: "Premium Properties",
//               description: "Curated selection of luxury properties"
//             },
//             {
//               icon: FaChild,
//               title: "Secure Transactions",
//               description: "Safe and transparent buying process"
//             },
//             {
//               icon: FaClock,
//               title: "24/7 Support",
//               description: "Round-the-clock customer service"
//             },
//             {
//               icon: FaHeadset,
//               title: "Personalized Service",
//               description: "Tailored solutions for your needs"
//             }
//           ].map((item, index) => (
//             <div key={index} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-theme-dark-gray hover:bg-opacity-50 transition-colors">
//               <div className="mt-1 rounded-full bg-theme-light-golden bg-opacity-20 p-2 flex-shrink-0">
//                 <item.icon className="text-theme-light-golden text-sm" />
//               </div>
//               <div>
//                 <Typography as="h4" className="text-sm font-semibold text-theme-off-white">
//                   {item.title}
//                 </Typography>
//                 <Typography as="p" className="text-xs text-theme-green-gray mt-1">
//                   {item.description}
//                 </Typography>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

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
    country = "uae",
  } = await getPropertyDetails({
    slug: params?.slug,
  });

  const data = propertyData?.faq_section?.faq_data;
  console.log(data, "data");

  return (
    <>
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
        slug={params?.slug}
      />

      {/* Enhanced tab section */}
      <Section.Container className="border-y border-theme-light-golden border-opacity-20 bg-gradient-to-r from-[#1a1a1a] to-[#2d2d2d] py-6">
        <Typography
          as="h2"
          className="mb-6 text-center text-2xl font-light text-theme-light-golden md:text-3xl"
        >
          Navigate This Listing
        </Typography>
        <UpComingShortTab />
      </Section.Container>

      <Section className="py-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Enhanced Main Content - Left Side */}
          <div className="flex-1 space-y-8">
            {/* Property Highlights Summary */}
            <div className="rounded-xl border border-theme-light-golden border-opacity-20 bg-theme-gray bg-opacity-50 p-6">
              <div className="grid grid-cols-2 gap-4 text-center md:grid-cols-4">
                <div className="p-4">
                  <Typography
                    as="p"
                    className="text-2xl font-bold text-theme-light-golden"
                  >
                    {bedrooms}
                  </Typography>
                  <Typography as="p" className="text-sm text-theme-green-gray">
                    Bedrooms
                  </Typography>
                </div>
                <div className="p-4">
                  <Typography
                    as="p"
                    className="text-2xl font-bold text-theme-light-golden"
                  >
                    {washrooms}
                  </Typography>
                  <Typography as="p" className="text-sm text-theme-green-gray">
                    Bathrooms
                  </Typography>
                </div>
                <div className="p-4">
                  <Typography
                    as="p"
                    className="text-2xl font-bold text-theme-light-golden"
                  >
                    {size}
                  </Typography>
                  <Typography as="p" className="text-sm text-theme-green-gray">
                    Square Feet
                  </Typography>
                </div>
                <div className="p-4">
                  <Typography
                    as="p"
                    className="text-2xl font-bold text-theme-light-golden"
                  >
                    {price}
                  </Typography>
                  <Typography as="p" className="text-sm text-theme-green-gray">
                    Price
                  </Typography>
                </div>
              </div>
            </div>

            {!!listingDetailsData?.shouldVisible && (
              <div
                id="ListingDetails"
                className="rounded-xl border border-theme-light-golden border-opacity-20 bg-theme-gray bg-opacity-30 p-6"
              >
                <ArrowListTable>
                  <ArrowListTable.Title title="Listing Details" />
                  <ArrowListTable.Description description="Comprehensive Property Listings for Your Dream Home" />
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
              className="border-b-theme-light-golden border-opacity-30"
              withSectionContainer
            />

            {/* Enhanced Description */}
            {!!description && (
              <div
                id="Description"
                className="rounded-xl border border-theme-light-golden border-opacity-20 bg-theme-gray bg-opacity-30 p-8"
              >
                <Section.Container>
                  <div className="mb-8 text-center">
                    <Typography
                      as="h2"
                      className="mb-4 text-3xl font-light text-theme-light-golden"
                    >
                      Property Description
                    </Typography>
                    <div className="mx-auto h-0.5 w-20 bg-theme-light-golden bg-opacity-50"></div>
                  </div>

                  <div className="prose prose-invert max-w-none">
                    <Typography
                      as="div"
                      className="text-sm font-light leading-7 text-theme-off-white text-opacity-90 md:leading-[32px] lg:text-[15px]"
                    >
                      {parse(propertyData?.description ?? "")}
                    </Typography>
                  </div>
                </Section.Container>
              </div>
            )}

            {!!propertyData?.plan_section?.is_plan_section && (
              <>
                <Hr
                  className="border-b-theme-light-golden border-opacity-30"
                  withSectionContainer
                />
                <div
                  id="FloorPlan"
                  className="rounded-xl border border-theme-light-golden border-opacity-20 bg-theme-gray bg-opacity-30 p-6"
                >
                  <FloorPlan data={propertyData} />
                </div>
              </>
            )}

            {/* Enhanced Floor Plan Details */}
            {!!floorPlanDetailsData?.shouldVisible && (
              <>
                <Hr
                  className="border-b-theme-light-golden border-opacity-30"
                  withSectionContainer
                />
                <div className="rounded-xl border border-theme-light-golden border-opacity-20 bg-theme-gray bg-opacity-30 p-6">
                  <ArrowListTable>
                    <ArrowListTable.Title
                      title={
                        propertyData?.floor_plan_details_section
                          ?.floor_plan_title ?? "Explore the Floor Plan"
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
                </div>
              </>
            )}

            {!!propertyData?.["360_viewport_section"]
              ?.is_360_viewport_section && (
              <>
                <Hr
                  className="border-b-theme-light-golden border-opacity-30"
                  withSectionContainer
                />
                <div
                  id="Viewport"
                  className="rounded-xl border border-theme-light-golden border-opacity-20 bg-theme-gray bg-opacity-30 p-6"
                >
                  <ViewPort360 data={propertyData} />
                </div>
              </>
            )}

            {/* Enhanced Features & amenities */}
            {
              <div
                id="FeaturesAmenities"
                className="rounded-xl border border-theme-light-golden border-opacity-20 bg-theme-gray bg-opacity-30 p-6"
              >
                <ArrowListTable>
                  <ArrowListTable.Title title="Key Features & Benefits" />
                  <ArrowListTable.Description description="A blend of luxury, convenience, and functionality." />

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

            {!!highlightsSectionData?.shouldVisible && (
              <>
                <Hr
                  className="border-b-theme-light-golden border-opacity-30"
                  withSectionContainer
                />
                <div className="rounded-xl border border-theme-light-golden border-opacity-20 bg-theme-gray bg-opacity-30 p-6">
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
                </div>
              </>
            )}

            {!!location_section?.is_location_section && (
              <>
                <Hr
                  className="border-b-theme-light-golden border-opacity-30"
                  withSectionContainer
                />
                <div
                  id="Location"
                  className="rounded-xl border border-theme-light-golden border-opacity-20 bg-theme-gray bg-opacity-30 p-6"
                >
                  <LocationList
                    title={location_section?.location_section_title}
                    subtitle={location_section?.location_section_subtitle}
                    locationMapUrl={location_section?.location_map_url}
                    locationListTitle={
                      location_section?.location_section_slogan
                    }
                    locations={location_section?.location_left_data}
                  />
                </div>
              </>
            )}

            {dld_section?.is_dld_section && (
              <>
                <Hr
                  className="border-b-theme-light-golden border-opacity-30"
                  withSectionContainer
                />
                <Section.Container>
                  <div
                    id="DLDPermitNumber"
                    className="to-theme-dark-gray flex flex-col items-center justify-between gap-6 rounded-xl border border-theme-light-golden border-opacity-20 bg-opacity-50 bg-gradient-to-r from-theme-gray px-10 py-10 md:flex-row"
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
                          className="h-[164px] w-[178px] rounded-lg border-2 border-theme-light-golden border-opacity-30"
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
                          className="bg-theme-dark-gray rounded-lg bg-opacity-50 px-4 py-2 font-mono text-[22px] font-light leading-10 text-theme-light-golden"
                        >
                          {propertyData?.dld_section?.dld_qr_number}
                        </Typography>
                      )}
                    </div>
                  </div>
                </Section.Container>
              </>
            )}

            {!!video_section?.is_video_section && (
              <>
                <Hr
                  className="border-b-theme-light-golden border-opacity-30"
                  withSectionContainer
                />
                <Section.Container>
                  <div
                    id="NowInYoutube"
                    className="flex w-full flex-col items-center gap-x-16 rounded-xl border border-theme-light-golden border-opacity-20 bg-theme-gray bg-opacity-30 p-[50px] lg:flex-row"
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

                      <Typography
                        as="p"
                        className="mb-[37px] pr-2.5 text-sm font-light text-theme-off-white md:text-xl lg:mt-10"
                      >
                        {parse(video_section?.video_description ?? "")}
                      </Typography>

                      <Button className="hidden items-center gap-3.5 border border-theme-light-golden px-[35px] py-3.5 text-xl font-normal text-white transition-colors hover:bg-theme-light-golden hover:bg-opacity-10 lg:flex">
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
                      <div className="relative aspect-video w-full overflow-clip rounded-lg border-2 border-theme-light-golden border-opacity-30">
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

                      <PrimaryButton
                        asChild
                        className="mt-[10px] w-full rounded-lg py-3.5 lg:hidden"
                      >
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
              </>
            )}

            <Hr
              className="border-b-theme-light-golden border-opacity-30"
              withSectionContainer
            />

            <Section.Container>
              <div
                id="BookYourViewing"
                className="to-theme-dark-gray flex w-full flex-col items-center gap-10 rounded-xl border border-solid border-theme-green-gray border-opacity-30 bg-opacity-50 bg-gradient-to-br from-theme-gray px-5 py-5 backdrop-blur-sm md:px-[80px] md:py-[60px] lg:flex-row"
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

            {/* About DeveloperMarina */}
            {developer_section?.is_developer_section && (
              <>
                <Hr
                  className="border-b-theme-light-golden border-opacity-30"
                  withSectionContainer
                />
                <div
                  id="DubaiMarina"
                  className="rounded-xl border border-theme-light-golden border-opacity-20 bg-theme-gray bg-opacity-30 p-6"
                >
                  <DubaiMarina developerSection={developer_section} />
                </div>
              </>
            )}

            <Hr
              className="border-b-theme-light-golden border-opacity-30"
              withSectionContainer
            />

            <div
              id="FrequentlyAskedQuestions"
              className="rounded-xl border border-theme-light-golden border-opacity-20 bg-theme-gray bg-opacity-30 p-6"
            >
              <Section.Container>
                <div className="mb-8 text-center">
                  <Typography
                    as="h2"
                    className="mb-4 text-[20px] font-medium text-theme-off-white sm:text-[32px]"
                  >
                    Frequently Asked Questions
                  </Typography>
                  <div className="mx-auto h-0.5 w-16 bg-theme-light-golden bg-opacity-50"></div>
                </div>

                <AccordionProvider>
                  <div className="space-y-3 sm:space-y-4">
                    {data?.map((item: any) => (
                      <Accordion key={item?.id} title={item?.question ?? ""}>
                        <div className="rounded-b-lg border border-t-0 border-theme-light-golden border-opacity-20 bg-theme-light-golden bg-opacity-10 px-4 py-3.5 text-[12px] font-light leading-[18px] sm:px-7 sm:py-5 sm:text-lg sm:leading-6">
                          {item?.answer}
                        </div>
                      </Accordion>
                    ))}
                  </div>
                </AccordionProvider>
              </Section.Container>
            </div>

            <Hr
              className="border-b-theme-light-golden border-opacity-30"
              withSectionContainer
            />

            <Reviews />

            <Hr
              className="border-b-theme-light-golden border-opacity-30"
              withSectionContainer
            />

            <SimilarPropertyList
              apiQuery={{
                type_id: propertyData?.parameters?.type_id,
                city_id: propertyData?.parameters?.city_id,
              }}
            />
          </div>

          {/* Enhanced Sidebar - Right Side */}
          {/* <div className="w-full lg:w-80 xl:w-96">
            <InquirySidebar country={country} slug={params?.slug} id={propertyData?.id} />
          </div> */}
        </div>
      </Section>
    </>
  );
};

export default ProductDetailsPage;
