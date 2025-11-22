"use client";
import PrimaryButton from "@/components/elements/buttons/PrimaryButton";
import SecondaryButton from "@/components/elements/buttons/SecondaryButton";
import NextImage from "@/components/elements/images/NextImage";
import Input from "@/components/elements/inputs/Input";
import Typography from "@/components/elements/texts/Typography";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import "react-phone-number-input/style.css";
import { FC, useEffect, useState } from "react";
import PhoneInput from "react-phone-number-input";
import Label from "../ProductsFilter/RangeInput/Label";
import axios from "axios";
import { IoClose } from "react-icons/io5";

interface BrochureFormProps {
  country?: string;
  slug: string;
  id: string | number;
  closeForm: () => void;
}

const BrochureForm: FC<BrochureFormProps> = ({
  country,
  slug,
  id,
  closeForm,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [fullURL, setFullURL] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState<any>("");
  const [confirmMessage, setConfirmMessage] = useState(false); 

  useEffect(() => {
    if (typeof window !== "undefined") {
      const protocol = window.location.protocol;
      const host = window.location.host;
      let url = `${protocol}//${host}${pathname}`;
      setFullURL(url);
    }
  }, [pathname]);

  const handleSubmit = async () => {
    try {
      // Internal API call
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}v1/auth/properties/brochure-request`,
        {
          name,
          email,
          phone: mobile,
          url: fullURL,
          property_id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );

      // LeadRat CRM integration
      const leadData = [
        {
          name: name,
          state: "",
          city: "",
          location: "",
          budget: "",
          notes: "",
          email: email,
          countryCode: country === "uae" ? "971" : "91",
          mobile: mobile,
          project: "",
          property: "",
          leadExpectedBudget: "",
          propertyType: "",
          submittedDate: new Date().toLocaleDateString("en-GB"),
          submittedTime: new Date().toLocaleTimeString("en-GB"),
          source: "",
          subSource: "",
          agencyName: "",
          leadScheduledDate: "",
          leadScheduleTime: "",
          leadStatus: "New",
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
      ];

      await fetch("https://connect.leadrat.com/api/v1/integration/Website", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "API-Key": "MmQ5ZDNiOGYtZmVkZi00ZDZhLWJiMzctYTM4OWI1MGQyMDA0",
        },
        body: JSON.stringify(leadData),
      });

      // W3Forms email
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_key: "e2df016a-722b-448e-acba-8cdec3d52f72",
          from_name: name,
          subject: "New Brochure Request",
          message: `
            Name: ${name}
            Email: ${email}
            Phone: ${mobile}
            Country: ${country}
            Page URL: ${fullURL}
          `,
          to: "leads@silveroakglobal.in",
        }),
      });

      // Clear form
      setName("");
      setEmail("");
      setMobile("");

      // Show confirmation message immediately
      setConfirmMessage(true);
    } catch (error) {
      setName("");
      setEmail("");
      setMobile("");
      closeForm();
      console.error(error);
    }
  };

  return (
    <div className="w-full flex-1">
      {/* Confirm Message Popup */}
      {confirmMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-5">
          <span
            className="absolute left-0 top-0 block h-full w-full"
            onClick={() => {
              setConfirmMessage(false);
              closeForm();
              if (country == "in") {
                router.push("/in/thank-you");
              } else {
                router.push("/thank-you");
              }
            }}
          ></span>
          <div className="relative z-50 w-full max-w-[500px] rounded-[5px] border border-theme-gray bg-theme-black p-6">
            <button
              className="absolute right-3 top-3 text-xl text-theme-off-golden"
              onClick={() => {
                setConfirmMessage(false);
                closeForm();
                if (country == "in") {
                  router.push("/in/thank-you");
                } else {
                  router.push("/thank-you");
                }
              }}
            >
              <IoClose />
            </button>
            <Typography
              as="p"
              className="text-theme-dark-blue mt-2 text-[14px] font-medium sm:text-base text-center"
            >
              Your request has been submitted successfully! Our agent will
              contact you shortly.
            </Typography>
          </div>
        </div>
      )}

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
      </div>
    </div>
  );
};

export default BrochureForm;
