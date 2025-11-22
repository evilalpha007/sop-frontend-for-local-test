"use client";
import PrimaryButton from "@/components/elements/buttons/PrimaryButton";
import Input from "@/components/elements/inputs/Input";
import Typography from "@/components/elements/texts/Typography";
import useCountryRouting from "@/library/hooks/useCountryRouting";
import { nextFetch } from "@/library/utils/next-fetch";
import { TResponse } from "@/types/common";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const ApplyJobForm = ({ params, data }: { params?: any; data?: any }) => {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [coverLetterFile, setCoverLetterFile] = useState<File | null>(null);
  const [careerId, setCareerId] = useState("");
  const [popup, setPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successPopup, setSuccessPopup] = useState(false);

  const { currentCountry } = useCountryRouting();
  const country = params?.country == "in" ? "in" : "uae";

  const allowedFileTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  useEffect(() => {
    setCareerId(data?.id);
  }, [data]);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "cv" | "coverLetter",
  ) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      if (!allowedFileTypes.includes(file.type)) {
        setError("Only PDF, DOC, and DOCX files are allowed.");
        return;
      }
      if (type === "cv") {
        setCvFile(file);
      } else if (type === "coverLetter") {
        setCoverLetterFile(file);
      }
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // console.log(phone, email, fullName, cvFile, coverLetterFile, careerId);
    if (
      !phone ||
      !email ||
      !fullName ||
      !cvFile ||
      // !coverLetterFile ||
      !careerId
    ) {
      setError("Please fill all required fields.");
      return;
    }
    setError("");
    setPopup(true);
  };

  const handleConfirmSubmit = async () => {
    setLoading(true);

    // Create a new FormData instance
    const formData = new FormData();
    formData.append("career_id", careerId);
    formData.append("full_name", fullName);
    formData.append("email", email);
    formData.append("mobile", phone);
    formData.append("linkedin", linkedin);
    formData.append("country", country || "");
    formData.append("url", window?.location?.href);

    // Append files only if they are not null
    if (cvFile) {
      formData.append("cv", cvFile);
    }

    if (coverLetterFile) {
      formData.append("cover_letter", coverLetterFile);
    }

    try {

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}v1/auth/careers/career-application`,
        {
          method: "POST",
          body: formData,
        },
      );

      if (res.ok) {
        setSuccessPopup(true);
        setPopup(false);
      } else {
        setError("Submission failed. Please try again.");
      }
    } catch (error) {
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        id="applyForThisJob"
        className="mt-[89px] rounded-[5px] border border-solid border-theme-green-gray border-opacity-20 bg-theme-gray bg-opacity-20 px-5 py-5 md:px-[63px] md:py-[43px]"
      >
        <Typography
          as="h2"
          className="mb-7 text-center text-lg font-semibold text-theme-off-white md:mb-[50px] md:text-[32px]"
        >
          Apply for this Job
        </Typography>

        {error && (
          <Typography as="p" className="mb-5 text-center text-sm text-red-500">
            {error}
          </Typography>
        )}

        <div className="w-full">
          <form onSubmit={handleSubmit} className="w-full">
            <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
              <div className="grid w-full flex-grow gap-3 md:gap-y-8">
                {/* Hidden Career ID field */}
                <input type="hidden" value={careerId} name="career_id" />

                <Input
                  requiredSymbol
                  label="Full Name"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="!py-3.5"
                />
                <Input
                  requiredSymbol
                  label="Email"
                  placeholder="Enter your email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="!py-3.5"
                />
                <div>
                  <label className="mb-2 flex gap-1 text-theme-light-golden">
                    Mobile <span className="text-red-500">*</span>
                  </label>
                  <PhoneInput
                    country={country == "in" ? "in" : "ae"}
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
              </div>

              <div className="hidden h-[300px] w-0 border-r border-r-theme-off-white md:block" />

              <div className="grid w-full flex-grow gap-y-8">
                <Input
                  label="LinkedIn"
                  placeholder="Enter your LinkedIn profile address"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  className="!py-3.5"
                />
                <div>
                  <label className="mb-2 flex gap-1 text-theme-light-golden">
                    CV <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => handleFileChange(e, "cv")}
                    className="!py-3.5"
                  />
                </div>
                <div>
                  <label className="mb-2 flex gap-1 text-theme-light-golden">
                    Cover Letter
                    {/* <span className="text-red-500">*</span> */}
                  </label>
                  <Input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => handleFileChange(e, "coverLetter")}
                    className="!py-3.5"
                  />
                </div>
              </div>
            </div>

            <PrimaryButton
              type="submit"
              className="mt-9 w-full py-2 text-sm sm:py-3.5 sm:text-sm"
              disabled={loading}
            >
              Submit Your CV/Resume
            </PrimaryButton>
          </form>
        </div>
      </div>

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
              I authorize Silver Oak Properties UAE | INDIA to process and store
              my personal information provided in this application for
              recruitment purposes, in compliance with applicable data
              protection laws. I also understand that my information may be
              retained for future job opportunities and may be shared with
              relevant departments within the organization.
            </Typography>
            <PrimaryButton
              className="mt-5 w-full flex-grow rounded-none"
              onClick={handleConfirmSubmit}
            >
              {loading ? "Submitting..." : "Confirm & Submit"}
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
            <Typography
              as="h4"
              className="text-center text-xl text-theme-off-white"
            >
              Application Submitted Successfully!
            </Typography>
            <PrimaryButton
              className="mt-5 w-full flex-grow rounded-none"
              onClick={() => setSuccessPopup(false)}
            >
              Close
            </PrimaryButton>
          </div>
        </div>
      )}
    </>
  );
};

export default ApplyJobForm;
