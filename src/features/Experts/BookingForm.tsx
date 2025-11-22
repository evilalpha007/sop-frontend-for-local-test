"use client";
import PrimaryButton from "@/components/elements/buttons/PrimaryButton";
import SecondaryButton from "@/components/elements/buttons/SecondaryButton";
import NextImage from "@/components/elements/images/NextImage";
import Input from "@/components/elements/inputs/Input";
import Typography from "@/components/elements/texts/Typography";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "react-phone-number-input/style.css";
import { FC, useEffect, useState } from "react";
import PhoneInput from "react-phone-number-input";
import Label from "../ProductsFilter/RangeInput/Label";
import axios from "axios";
import { IoClose } from "react-icons/io5";

interface BookingFormProps {
  country?: string;
  slug: string;
  id: string | number;
}

const BookingForm: FC<BookingFormProps> = ({ country, slug, id }) => {
  const pathname = usePathname();
  const [fullURL, setFullURL] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState<any>("");
  const [successPopup, setSuccessPopup] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const protocol = window.location.protocol;
      const host = window.location.host;
      let url = `${protocol}//${host}${pathname}`;
      setFullURL(url);
    }
  }, [pathname]);

  const handleSubmit = async () => {
    // Show popup immediately
    setSuccessPopup(true);

    // Clear form
    setName("");
    setEmail("");
    setMobile("");

    // Fire main API in background
    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}v1/auth/properties/property-lead`,
        { name, email, phone: mobile, url: fullURL, property_id: id },
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      )
      .catch((err) => console.error(err));

    // LeadRat API in background
    fetch("https://connect.leadrat.com/api/v1/integration/Website", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "API-Key": "MmQ5ZDNiOGYtZmVkZi00ZDZhLWJiMzctYTM4OWI1MGQyMDA0",
      },
      body: JSON.stringify([
        {
          name,
          state: "",
          city: "",
          location: "",
          budget: "",
          notes: "",
          email,
          countryCode: "91",
          mobile,
          project: "",
          property: "",
          leadExpectedBudget: "",
          propertyType: "",
          submittedDate: new Date().toISOString().split("T")[0],
          submittedTime: new Date().toISOString().split("T")[1].split(".")[0],
          source: "",
          subSource: "",
          agencyName: "",
          leadScheduledDate: "",
          leadScheduleTime: "",
          leadStatus: "Schedule Site Visit or Schedule Meeting or Booked or Booking Cancel",
          leadBookedDate: "",
          leadBookedTime: "",
          additionalProperties: {
            EnquiredFor: "",
            BHKType: "",
            NoOfBHK: "0",
          },
          primaryUser: "",
          secondaryUser: "",
          CampaignName: "",
          AgencyName: "",
          ChannelPartnerName: "",
        },
      ]),
    }).catch((err) => console.error(err));

    // W3Forms API in background
    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: "e2df016a-722b-448e-acba-8cdec3d52f72",
        from_name: name,
        subject: "New Property Booking Request",
        message: `Name: ${name}\nEmail: ${email}\nPhone: ${mobile}\nURL: ${fullURL}`,
        to: "leads@silveroakglobal.in",
      }),
    }).catch((err) => console.error(err));
  };

  return (
    <div className="w-full flex-1">
      {successPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-5">
          <span
            className="absolute left-0 top-0 block h-full w-full"
            onClick={() => setSuccessPopup(false)}
          ></span>
          <div className="relative z-50 w-full max-w-[768px] rounded-[5px] border border-theme-gray bg-theme-black p-8">
            <button
              className="absolute right-3 top-3 text-xl text-theme-off-golden"
              onClick={() => setSuccessPopup(false)}
            >
              <IoClose />
            </button>
            <Typography
              as="p"
              className="text-theme-dark-blue mt-2 text-[12px] font-light sm:text-sm"
            >
              Thank you for your interest in this property. Our agent will
              contact you shortly.
            </Typography>
          </div>
        </div>
      )}

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
      </div>

      <div className="space-y-[25px]">
        <Input
          label="Full Name"
          placeholder="Enter your full name"
          labelClassName="text-theme-off-white text-theme-green-gray text-xs font-medium sm:mb-1.5"
          className="bg-transparent"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Input
          label="Email"
          placeholder="Enter your email"
          labelClassName="text-theme-off-white text-theme-green-gray text-xs font-medium sm:mb-1.5"
          className="bg-transparent"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Label
          title="Mobile"
          className="mb-0 font-medium text-theme-green-gray"
        />
        <PhoneInput
          //@ts-expect-error
          defaultCountry={(country == "uae" ? "ae" : "in").toUpperCase()}
          name="mobile"
          value={mobile}
          onChange={(value) => setMobile(value)}
          placeholder="Enter your mobile number"
          className="mt-0 block w-full border-0 px-3.5 py-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>

      <div className="mt-[30px] flex w-full items-center gap-2.5">
        <PrimaryButton
          className="w-full sm:text-lg md:flex-[60%]"
          onClick={handleSubmit}
        >
          Submit
        </PrimaryButton>

        <SecondaryButton className="flex w-full items-center justify-center gap-2 py-2 text-theme-light-golden sm:text-lg md:flex-[40%] md:py-2.5">
          <Link
            className="flex flex-row items-center justify-center gap-2"
            target="_blank"
            href={`${
              country !== "in"
                ? "https://wa.aisensy.com/74Xxd4"
                : "https://api.whatsapp.com/send/?phone=918755588863&text&type=phone_number&app_absent=0"
            }`}
          >
            <NextImage
              src="/svg-icons/property-details/whats-app.svg"
              alt="whatsapp"
              width={26}
              height={25}
              disableBlur
              className="size-3 md:size-6"
            />
            Whats App
          </Link>
        </SecondaryButton>
      </div>
    </div>
  );
};

export default BookingForm;
