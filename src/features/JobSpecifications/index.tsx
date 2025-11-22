"use client";
import { IJobDetailsProps } from "@/app/careers/[slug]/page";
import Hr from "@/components/elements/border/Hr";
import PrimaryButton from "@/components/elements/buttons/PrimaryButton";
import Typography from "@/components/elements/texts/Typography";
import { cn } from "@/library/utils/cn";
import Link from "next/link";
import SpecificationItem from "./SpecificationItem";
interface IJobSpecificationsProps {
  className?: string;
  JobDetailsData?: IJobDetailsProps;
}

const JobSpecifications = ({
  className,
  JobDetailsData,
}: IJobSpecificationsProps) => {
  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Commercial Sales & Lettings Broker",
          text: "Check out this job!",
          url: window?.location?.href,
        })
        .then(() => {
          // console.log("Successful share")
        })
        .catch((error) => {
          console.error("Error sharing", error);
        });
    }
  };
  return (
    <div
      className={cn(
        "border border-solid border-theme-off-white border-opacity-30 bg-theme-gray bg-opacity-30 px-5 pb-[34px] pt-3",
        className,
      )}
    >
      <Typography
        as="h2"
        className="pb-2.5 text-center text-lg font-semibold text-theme-off-white md:text-[25px]"
      >
        Job Specifications
      </Typography>

      <Hr className="!mb-6" />

      <div className="grid grid-cols-2 items-start justify-between gap-5 md:grid-cols-3">
        {/* <SpecificationItem
          image="/svg-icons/job-specification/salary-icon.svg"
          alt="Salary Icon"
          title="Salary Range 50%"
        />

        <SpecificationItem
          image="/svg-icons/job-specification/commission-icon.svg"
          alt="Commission Icon"
          title="Commission Bonuses"
        /> */}

        <SpecificationItem
          image="/svg-icons/job-specification/alarm-icon.svg"
          alt="Alarm Icon"
          title={JobDetailsData?.type_of_job}
        />

        <SpecificationItem
          image="/svg-icons/job-specification/location-icon.svg"
          alt="Location Icon"
          title={JobDetailsData?.job_location}
        />

        {/* <SpecificationItem
          image="/svg-icons/job-specification/calender-icon.svg"
          alt="Calender Icon"
          title="Saturday 01 June 2024"
        /> */}

        <button className="cursor-pointer" onClick={handleShare}>
          <SpecificationItem
            image="/svg-icons/job-specification/share-icon.svg"
            alt="Share Icon"
            title="Share Job"
            disableEndVr
          />
        </button>
      </div>

      <PrimaryButton
        className="mt-7 block w-full text-center text-theme-black active:scale-[0.99] sm:py-2"
        asChild
      >
        <Link href={"#applyForThisJob"}>Apply for this Job</Link>
      </PrimaryButton>
    </div>
  );
};

export default JobSpecifications;
