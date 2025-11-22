"use client";
import Section from "@/components/blocks/Section/index";
import PrimaryButton from "@/components/elements/buttons/PrimaryButton";
import NextImage from "@/components/elements/images/NextImage";
import Input from "@/components/elements/inputs/Input";
import Typography from "@/components/elements/texts/Typography";
import useCountryRouting from "@/library/hooks/useCountryRouting";
import { nextFetch } from "@/library/utils/next-fetch"; // Assuming this is the function for sending requests
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { IoClose } from "react-icons/io5";

const PromptConsultation = () => {
  const [popup, setPopup] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const path = usePathname();

  const {
    router,
    countryToRedirect,
    currentCountryData,
    currentCountry,
    defaultCountry,
  } = useCountryRouting();

  const country = currentCountry;

  // Prevent rendering on 'contact-us' page
  if (path.includes("contact-us")) return null;

  const numberVerification = /^[0-9]+$/;

  // Form submit handler
  const handleSubmit = () => {
    if (!name || !phone || !email) {
      setError("Please fill all fields");
      return;
    }
    if (!numberVerification.test(phone)) {
      setError("Please enter a valid phone number");
      return;
    }
    setPopup(true); // Trigger the confirmation popup
  };

  // Confirm submit and send request
  const handleConfirmSubmit = async () => {
    setLoading(true);
    try {
      // Internal API call
      const res = await nextFetch("v1/auth/prompt-consulatation", {
        method: "POST",
        body: JSON.stringify({
          name,
          phone,
          email,
          country,
          url: window?.location?.href,
        }),
      });

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
          mobile: phone,
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
            EnquiredFor: "Prompt Consultation",
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

      // W3Forms email integration
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "e2df016a-722b-448e-acba-8cdec3d52f72",
          from_name: name,
          subject: "New Prompt Consultation Request",
          message: `
            Name: ${name}
            Email: ${email}
            Phone: ${phone}
            Country: ${country}
            Page URL: ${window?.location?.href}
          `,
          to: "leads@silveroakglobal.in",
        }),
      });

      // Show success popup
      if (res) {
        setSuccessPopup(true);
        setPopup(false);
        setName("");
        setPhone("");
        setEmail("");
        setError(""); // Clear error message on success
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Network error:", error);
      setError("Network error, please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Section.Container className="my-20">
        <div className="rounded-[5px] border border-theme-off-white border-opacity-60 px-4 sm:px-8">
          <div className="mt-[22px] sm:mt-[34px]">
            <Typography
              as="h2"
              className="mb-2 text-center text-sm font-light leading-[16.5px] text-theme-off-white sm:text-[32px] sm:leading-normal"
            >
              Prompt Consultation
            </Typography>

            <Typography
              as="p"
              className="mb-[22px] text-center text-[9px] font-light leading-[9.39px] text-theme-off-white opacity-80 sm:mb-[31px] sm:text-lg sm:leading-normal"
            >
              Fill the form below and our agent will contact you shortly.
            </Typography>
          </div>

          {error && (
            <Typography
              as="p"
              className="mb-5 mt-2 block text-center text-[14px] font-light text-red-500"
            >
              {error}
            </Typography>
          )}

          <div className="mb-[35px] flex flex-col gap-x-4 sm:mb-[54px] sm:flex-row sm:items-center">
            <div className="grid grid-cols-2 gap-x-3 gap-y-5 sm:flex sm:grid-cols-1 sm:items-center sm:gap-x-4">
              <Input
                label="Your Name"
                placeholder="Your Name"
                labelClassName="sm:hidden"
                className="w-full flex-grow"
                value={name}
                name="name"
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                label="Your Phone"
                placeholder="Your Phone"
                labelClassName="sm:hidden"
                className="w-full flex-grow"
                value={phone}
                name="phone"
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <Input
              label="Your Email"
              placeholder="Your Email"
              labelClassName="sm:hidden"
              className="w-full flex-grow"
              value={email}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="mt-[18px] flex flex-grow items-center gap-4 sm:mt-0">
              <PrimaryButton
                onClick={handleSubmit}
                className="w-full flex-grow rounded-none"
              >
                Send
              </PrimaryButton>

              <PrimaryButton
                onClick={handleSubmit}
                className="flex w-full flex-grow items-center justify-center gap-1.5 rounded-none bg-theme-gray text-theme-light-golden hover:bg-theme-gray/80"
              >
                <Link
                  target="_blank"
                  className="flex flex-row items-center justify-center gap-2"
                  href={"https://wa.aisensy.com/74Xxd4"}
                >
                  <NextImage
                    src="/svg-icons/prompt-consultation/whatsapp.svg"
                    alt="whatsapp"
                    width={20}
                    height={20}
                    className="h-2.5 w-2.5 sm:h-5 sm:w-5"
                    disableBlur
                  />
                  Send
                </Link>
              </PrimaryButton>
            </div>
          </div>
        </div>
      </Section.Container>

      {/* Popup confirmation */}
      {popup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-5">
          <span
            className="absolute left-0 top-0 block h-full w-full"
            onClick={() => setPopup(false)}
          ></span>
          <div className="relative z-50 w-full max-w-[768px] rounded-[5px] border border-theme-gray bg-theme-black p-8">
            <button
              className="absolute right-3 top-3 text-xl text-theme-off-golden"
              onClick={() => setPopup(false)}
            >
              <IoClose />
            </button>
            <Typography
              as="p"
              className="text-theme-dark-blue mt-2 text-[12px] font-light sm:text-sm"
            >
              By submitting this form, you consent to the collection and use of
              your personal data in accordance with our Privacy Policy. We may
              contact you via email, phone, or SMS to provide updates and
              relevant information. You can opt out at any time.
            </Typography>
            <PrimaryButton
              onClick={handleConfirmSubmit}
              className="mt-5 w-full flex-grow rounded-none"
            >
              {loading ? "Submitting..." : "Confirm Submit"}
            </PrimaryButton>
          </div>
        </div>
      )}

      {/* Success Popup */}
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
              Your consultation request has been sent successfully!
            </Typography>
          </div>
        </div>
      )}
    </>
  );
};

export default PromptConsultation;
