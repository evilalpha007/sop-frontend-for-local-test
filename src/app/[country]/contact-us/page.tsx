import Section from "@/components/blocks/Section/index";
import Hr from "@/components/elements/border/Hr";
import PrimaryButton from "@/components/elements/buttons/PrimaryButton";
import NextImage from "@/components/elements/images/NextImage";
import Typography from "@/components/elements/texts/Typography";
import ContactForm from "@/features/contact/ContactForm";
import { getSeoMeta } from "@/library/utils/get-seo-meta";
import { Metadata } from "next";
import Link from "next/link";

interface IContactProps {
  params: {
    country: string;
  };
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await getSeoMeta({
    url: "https://www.silveroakglobal.com/in/contact-us",
  });

  const seoData = data[0];

  return {
    title:
      seoData?.title ||
      "Silver Oak Real Estate India | Exclusive Homes & Investment Opportunities",
    description: seoData?.description,
    keywords: seoData?.keywords,
    openGraph: {
      title: seoData?.title,
      description: seoData?.description,
      url: seoData?.route,
      type: "website",
    },
  };
}

const ContactUsPage = ({ params }: IContactProps) => {
  //  // console.log("contact us page", params.country);
  const IndiaContent = params.country === "in";

  return (
    <div>
      <Section>
        <Section.HeroContainer className="flex min-h-[250px] flex-col items-center justify-center">
          <Section.BackgroundImage
            src="/images/banner/contact-us.webp"
            className="h-full"
            priority
            quality={50}
            width={1440}
            height={302}
          />

          {/* <div className="absolute inset-0 h-full w-full bg-[linear-gradient(180deg,#141213_5.5%,rgba(73,73,73,0.00)_68%)]" /> */}
          <div className="absolute bottom-0 left-0 h-full w-full bg-gradient-to-b from-transparent to-theme-black" />

          <Section.Container className="bg-red-500# w-full px-5">
            <Typography
              as="h1"
              className="text-center text-4xl font-light uppercase text-theme-off-white md:text-[52px]"
            >
              Contact US
            </Typography>
          </Section.Container>
        </Section.HeroContainer>
      </Section>
      <Section.Container className="mt-[58px]">
        <div className="grid gap-[29px] sm:grid-cols-2 md:grid-cols-3">
          <div className="w-full border border-solid border-theme-off-white border-opacity-60 p-10">
            <div className="flex flex-col items-center">
              <NextImage
                src="/svg-icons/contact-us/email.svg"
                alt="email"
                className="h-[67px] w-[78px]"
                width={82}
                height={71}
                disableBlur
              />
            </div>

            <Hr className="mb-[17px] mt-[58px]" />

            {/* <Typography
              as="h4"
              className="text-center text-[22px] font-medium text-white"
            >
              E-Mail
            </Typography> */}

            <PrimaryButton className="my-2.5 mt-6 w-full text-center text-lg font-medium leading-5 text-theme-black">
              <Link
                target="_blank"
                className="text-theme-black"
                href={` ${IndiaContent ? "mailto:info@silveroakglobal.in" : "mailto:info@silveroakglobal.ae"}`}
              >
                Click here to E-Mail us
              </Link>
            </PrimaryButton>
          </div>

          <div className="w-full border border-solid border-theme-off-white border-opacity-60 p-10">
            <div className="flex flex-col items-center">
              <NextImage
                src="/svg-icons/contact-us/phone-ring.svg"
                alt="email"
                className="h-[68px] w-[71px]"
                width={75}
                height={72}
                disableBlur
              />
            </div>

            <Hr className="mb-[17px] mt-[58px]" />

            {/* <Typography
              as="h4"
              className="text-center text-[22px] font-medium text-white"
            >
              Call us
            </Typography> */}

            <PrimaryButton className="my-2.5 mt-6 w-full text-center text-lg font-medium leading-5 text-theme-black">
              <Link
                target="_blank"
                className="text-theme-black"
                href={` ${IndiaContent ? "tel:+918884418110" : "tel:+971551307662"}`}
              >
                Click here to Call us
              </Link>
            </PrimaryButton>
          </div>

          <div className="w-full border border-solid border-theme-off-white border-opacity-60 p-10">
            <div className="flex flex-col items-center">
              <NextImage
                src="/svg-icons/contact-us/whatsapp-icon.svg"
                alt="email"
                className="h-[74px] w-[74px]"
                width={74}
                height={74}
                disableBlur
              />
            </div>

            <Hr className="mb-[17px] mt-[53px]" />

            {/* <Typography
              as="h4"
              className="text-center text-[22px] font-medium text-white"
            >
              WhatsApp
            </Typography> */}
            <PrimaryButton className="my-2.5 mt-6 w-full text-center text-lg font-medium leading-5 text-theme-black">
              <Link
                target="_blank"
                className="text-theme-black"
                href={` ${IndiaContent ? "http://wa.aisensy.com/+918755588863" : "https://wa.aisensy.com/74Xxd4"}`}
              >
                Click to chat now
              </Link>
            </PrimaryButton>
          </div>
        </div>
      </Section.Container>
      <Section.Container className="mt-8">
        <div className="flex w-full flex-col items-center justify-center gap-10 border border-solid border-theme-off-white border-opacity-60 p-10 py-5 md:flex-row">
          <NextImage
            src="/svg-icons/contact-us/location.svg"
            alt="location"
            width={62}
            height={77}
            className="h-[74px] w-[60px]"
          />

          <div>
            <Typography className="max-w-[422px] text-center text-lg font-medium leading-[37px] text-white text-opacity-50 md:text-start md:text-[25px]">
              {IndiaContent
                ? " Office# 320/321, Suncity Success Tower, Sector 65, Gurugram, Haryana-122102, INDIA."
                : "The Bay Gate Tower- 10th Floor, Office No: F10 - 02,  Al Mustaqbal St - Business Bay - Dubai"}
            </Typography>
          </div>
        </div>
      </Section.Container>
      <Section.Container className="mt-[76px]">
        <Typography
          as="h2"
          className="text-center text-xl font-light text-theme-light-golden md:text-[32px]"
        >
          Find us here, on Google Maps
        </Typography>

        <Typography
          as="h2"
          className="mb-[25px] mt-3.5 text-center text-[12px] font-light text-theme-off-white opacity-60 md:text-lg"
        >
          Get in Touch with our experts! At Silver Oak Real Estate INDIA, we’re
          here to assist you with all your real estate needs. Let us help you
          find your perfect property in Gurugram, INDIA.
        </Typography>

        <div className="grid grid-cols-1 md:grid-cols-2">
          <NextImage
            src={`/images/contact-us/${IndiaContent ? "india" : "dubai"}-city.webp`}
            alt="city"
            width={613}
            height={383}
            className="h-full w-full overflow-hidden rounded-b-none rounded-r-lg rounded-t-lg md:rounded-l-lg md:rounded-r-none"
            imageClassName="object-cover h-full w-full"
          />
          <iframe
            src={`${IndiaContent ? "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14037.474672516888!2d77.0702103!3d28.4081306!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d22692a4e3faf%3A0xeb5a2617558c5e55!2sSuncity%20Success%20Tower!5e0!3m2!1sen!2sbd!4v1733076838755!5m2!1sen!2sbd" : "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.3960146166482!2d55.28186327516326!3d25.189864177715766!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6824e717ab0d%3A0x458fafee437122fb!2sFifty%20One%20Tower%20-%20Marasi%20Dr%20-%20Business%20Bay%20-%20Dubai!5e0!3m2!1sen!2sae!4v1732007216869!5m2!1sen!2sae"}`}
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            className="h-full min-h-[250px] w-full rounded-b-lg sm:min-h-0 md:rounded-b-none md:rounded-r-lg"
          />
        </div>
      </Section.Container>
      <ContactForm country={params.country} />{" "}
    </div>
  );
};

export default ContactUsPage;
