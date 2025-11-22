"use client";
import PrimaryButton from "@/components/elements/buttons/PrimaryButton";
import NextImage from "@/components/elements/images/NextImage";
import Input from "@/components/elements/inputs/Input";
import Typography from "@/components/elements/texts/Typography";
import { nextFetch } from "@/library/utils/next-fetch";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import {
  getFees,
  getLoanPeriodInMonth,
  getMaximumLoanAmount,
  getMonthlyInterestRate,
  getPropertyValue,
  getUpFrontCost,
} from "@/library/utils/affordability-calculator";
import { calculateMonthlyPayment } from "@/library/utils/affordability-calculator/calculate-monthly-payment";
import { useCalculationContext } from "../CalculationContext";

interface ISubmitDialogProps {
  popup: boolean;
  setPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SubmitDialog({ popup, setPopup }: ISubmitDialogProps) {
  const [successPopup, setSuccessPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | string[]>("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const { employeeType, monthlyDebt, monthlyIncome, citizenType } =
    useCalculationContext();

  const pathName = usePathname();
  const selectedCountry = pathName.split("/")[1];
  const country = selectedCountry === "in" ? "91" : "971";
  const numberVerification = /^[+]?[0-9]+$/;

  const handleSubmit = async () => {
    // --- Validate input fields ---
    if (!name || !phone || !email) {
      setError("Please fill all personal details");
      return;
    }
    if (!numberVerification.test(phone)) {
      setError("Please enter a valid phone number");
      return;
    }
    if (!employeeType || !employeeType.value || !monthlyIncome || !monthlyDebt) {
      setError("Please complete all calculator fields before submitting");
      return;
    }

    setLoading(true);
    try {
      // --- Calculate affordability values ---
      const { monthlyPayment } = calculateMonthlyPayment({
        monthlyIncome,
        monthlyExpense: monthlyDebt,
      });
      const loanPeriodInMonth = getLoanPeriodInMonth({ numberOfYears: 25 });
      const monthlyInterestRate = getMonthlyInterestRate({ interest: "7.3%" });
      const { maximumLoanAmount } = getMaximumLoanAmount({
        loanPeriodInMonth,
        monthlyInterestRate,
        monthlyLoanRepayment: monthlyPayment,
      });
      const { propertyValue, downPayment } = getPropertyValue({
        maximumLoanAmount,
        taxPercentage: citizenType,
        
      });
      const { totalFees } = getFees({ maximumLoanAmount, propertyValue });
      const { upFrontCost } = getUpFrontCost({ downPayment, totalFees });

      const submissionData = {
        name,
        email,
        phone,
        residency_status: citizenType,
        employment_type: employeeType.value,
        monthly_income: monthlyIncome,
        monthly_debt: monthlyDebt,
        home_affordability: propertyValue,
        upfront_cost: upFrontCost,
        down_payment: downPayment,
        fee: totalFees,
        maximum_eligibility_financing: maximumLoanAmount,
        monthly_payment: monthlyPayment,
        country,
        sub_source: "Affordability",
      };

      console.log("Submission Data:", submissionData);

      // --- Internal API call ---
      const res = (await nextFetch("v1/auth/affordabilty-lead", {
        method: "POST",
        body: JSON.stringify(submissionData),
      })) as any;

      if (res?.status == "error") {
        setError(res?.message);
        return;
      }
      if (res?.status === "validation_error") {
        const errorMessages = Object.entries(res.errors)
          .flatMap(([field, messages]) =>
            (messages as string[]).map((msg) => `${msg}`)
          )
          .join("\n");
        setError(errorMessages || "Validation error occurred");
        return;
      }

      // --- LeadRat CRM Integration ---
      const leadData = [
        {
          name,
          state: "",
          city: "",
          location: "",
          budget: "",
          notes: `Affordability form: ${propertyValue}`,
          email,
          countryCode: country,
          mobile: phone,
          project: "",
          property: "",
          leadExpectedBudget: "",
          propertyType: "",
          submittedDate: new Date().toLocaleDateString("en-GB"),
          submittedTime: new Date().toLocaleTimeString("en-GB"),
          source: "silver Oak Global",
          subSource: "Affordability",
          agencyName: "",
          leadScheduledDate: "",
          leadScheduleTime: "",
          leadStatus: "New",
          leadBookedDate: "",
          leadBookedTime: "",
          additionalProperties: {
            EnquiredFor: "Affordability",
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

      // --- W3Forms Email Integration ---
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "e2df016a-722b-448e-acba-8cdec3d52f72",
          from_name: name,
          subject: "New Calculate  Affordability Form Submission",
          message: `
            Name: ${name}
            Email: ${email}
            Phone: ${phone}
            Country: ${country}
            Home Affordability: ${propertyValue}
            Monthly Payment: ${monthlyPayment}
          `,
          to: "leads@silveroakglobal.in",
        }),
      });

      // --- Success ---
      setSuccessPopup(true);
      setPopup(false);
      setName("");
      setPhone("");
      setEmail("");
      setError("");
    } catch (error: any) {
      console.error("Submission error:", error);
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {popup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-5">
          <span
            className="absolute left-0 top-0 block h-full w-full"
            onClick={() => setPopup(false)}
          ></span>
          <div className="relative z-50 flex h-auto w-full max-w-[800px] flex-col items-center justify-center rounded-[5px] border border-theme-gray bg-theme-black p-8">
            <button
              className="absolute right-3 top-3 text-xl text-theme-off-golden"
              onClick={() => setPopup(false)}
            >
              <IoClose />
            </button>
            <div className="flex w-full flex-col gap-7 p-5">
              {error && (
                <div className="text-center text-[12px] font-light text-red-500 sm:text-sm">
                  {Array.isArray(error) ? (
                    <ul className="list-disc pl-5 text-left">
                      {error.map((err, index) => (
                        <li key={index}>{err}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>{error}</p>
                  )}
                </div>
              )}
              <div className="grid w-full grid-cols-2 gap-x-3">
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
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit"}
                </PrimaryButton>

                <PrimaryButton className="flex w-full flex-grow items-center justify-center gap-1.5 rounded-none bg-theme-gray text-theme-light-golden hover:bg-theme-gray/80">
                  <Link
                    target="_blank"
                    className="flex flex-row items-center justify-center gap-2"
                    href={
                      country === "91"
                        ? "https://api.whatsapp.com/send?phone=918755588863&text&type=phone_number&app_absent=0"
                        : "https://wa.aisensy.com/74Xxd4"
                    }
                  >
                    <NextImage
                      src="/svg-icons/prompt-consultation/whatsapp.svg"
                      alt="whatsapp"
                      width={20}
                      height={20}
                      className="h-2.5 w-2.5 sm:h-5 sm:w-5"
                      disableBlur
                    />
                    WhatsApp
                  </Link>
                </PrimaryButton>
              </div>
            </div>
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
              Your affordability details have been submitted successfully!
            </Typography>
          </div>
        </div>
      )}
    </>
  );
}
