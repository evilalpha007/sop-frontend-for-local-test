"use client";
import Section from "@/components/blocks/Section";
import PrimaryButton from "@/components/elements/buttons/PrimaryButton";
import Input from "@/components/elements/inputs/Input";
import Typography from "@/components/elements/texts/Typography";
import { nextFetch } from "@/library/utils/next-fetch";
import { TResponse } from "@/types/common";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

interface IContactFormProps {
  country?: string;
}

const ContactForm = ({ country = "UAE" }: IContactFormProps) => {
  const [popup, setPopup] = useState(false);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  const handleSubmit = () => {
    if (!name || !phone || !email || !message) {
      setError("Please fill all fields");
      return;
    }
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email");
      return;
    }
    setPopup(true);
  };

  const handleSendMessageClick = async () => {
    setLoading(true);
    try {
      // Internal API call
      const res = (await nextFetch<TResponse<any>>("v1/auth/contact-us-lead", {
        method: "POST",
        body: JSON.stringify({
          name,
          phone,
          email,
          message,
          country,
          sub_source: "Contact Us",
        }),
      })) as any;

      if (res?.status == "error") {
        setError(res?.message);
        setLoading(false);
        return;
      }
      if (res?.status === "validation_error") {
        const errorMessages = Object.entries(res.errors)
          .flatMap(([field, messages]) =>
            (messages as string[]).map((msg) => `${msg}`),
          )
          .join("\n");

        setError(errorMessages || "Validation error occurred");
        setLoading(false);
        return;
      }

      // LeadRat CRM integration
      const leadData = [
        {
          name: name,
          state: "",
          city: "",
          location: "",
          budget: "",
          notes: message,
          email: email,
          countryCode: country === "in" ? "91" : "971",
          mobile: phone,
          project: "",
          property: "",
          leadExpectedBudget: "",
          propertyType: "",
          submittedDate: new Date().toLocaleDateString("en-GB"),
          submittedTime: new Date().toLocaleTimeString("en-GB"),
          source: "",
          subSource: "Contact Us",
          agencyName: "",
          leadScheduledDate: "",
          leadScheduleTime: "",
          leadStatus: "New",
          leadBookedDate: "",
          leadBookedTime: "",
          additionalProperties: {
            EnquiredFor: "Contact Us",
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
          subject: "New Contact Form Submission",
          message: `
            Name: ${name}
            Email: ${email}
            Phone: ${phone}
            Country: ${country}
            Message: ${message}
          `,
          to: "leads@silveroakglobal.in",
        }),
      });

      if (res) {
        setSuccessPopup(true);
        setPopup(false);
        setName("");
        setPhone("");
        setEmail("");
        setMessage("");
        setError("");
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
      <Section.Container className="mt-[92px]">
        <div className="rounded-[5px] border border-solid border-theme-green-gray border-opacity-20 bg-theme-gray bg-opacity-20 p-6 md:pb-14">
          <Typography
            as="h2"
            className="text-center text-sm font-semibold leading-[16.5px] text-theme-off-white md:text-[32px] md:leading-normal"
          >
            Get In Touch With Us!
          </Typography>

          {error && (
            <Typography
              as="p"
              className="mb-5 mt-2 block text-center text-[14px] font-light text-red-500"
            >
              {error}
            </Typography>
          )}

          <div className="mt-5 grid gap-x-4 gap-y-2 md:grid-cols-3 md:gap-y-[22px]">
            <Input
              label="Write your name "
              placeholder="Type Your name please "
              className="bg-transparent !py-3.5"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <div className="contactFromPhone -mt-0.5">
              <label className="mb-2 flex gap-1 text-theme-light-golden">
                Write your Phone
              </label>
              <PhoneInput
                country={country === "in" ? "in" : "ae"}
                value={phone}
                onChange={(value) => setPhone(value)}
                inputStyle={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ddd",
                }}
              />
            </div>

            <Input
              label="Write your email"
              placeholder="Enter your E-mail ID"
              className="bg-transparent !py-3.5"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="md:col-span-2">
              <Input
                label="Write your message"
                placeholder="Your Message please."
                className="bg-transparent !py-3.5"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            <div className="mt-4 flex flex-grow items-end md:mt-0">
              <PrimaryButton
                onClick={handleSubmit}
                className="h-fit w-full font-medium text-theme-black"
              >
                Send
              </PrimaryButton>
            </div>
          </div>
        </div>
      </Section.Container>

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
              onClick={handleSendMessageClick}
              className="mt-5 w-full flex-grow rounded-none"
            >
              {loading ? "Submitting..." : "Confirm Submit"}
            </PrimaryButton>
          </div>
        </div>
      )}

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
              Your message has been sent successfully. We will get back to you
              soon.
            </Typography>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactForm;
