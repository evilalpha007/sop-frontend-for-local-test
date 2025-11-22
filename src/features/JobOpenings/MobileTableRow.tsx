import NextImage from "@/components/elements/images/NextImage";
import Typography from "@/components/elements/texts/Typography";
import ViewDetailsButton from "./ViewDetailsButton";

export interface IJobOpeningTableData {
  jobOpeningTableData: {
    id?: number;
    title?: string;
    experience?: string;
    type_of_job?: string;
    job_location?: string;
    slug?: string;
  }[];
  country?: string;
}

const MobileTableRow = ({
  jobOpeningTableData,
  country,
}: IJobOpeningTableData) => {
  //  // console.log("table data", jobOpeningTableData);
  return (
    <>
      {jobOpeningTableData.map((data, index) => (
        <tr
          key={index}
          className="mb-4 flex w-full flex-col bg-theme-gray bg-opacity-20 px-3 ring-1 ring-theme-off-white ring-opacity-20 md:hidden"
        >
          <td className="py-3">
            <div className="flex w-full items-center gap-[10.5px]">
              <NextImage
                src="/svg-icons/job-opening/right-send.svg"
                alt="right-send"
                width={22}
                height={20}
                className="h-5 w-3 shrink-0 md:w-[22px]"
              />

              <Typography
                as="p"
                className="text-sm font-light capitalize text-white md:text-lg"
              >
                {data.title}
              </Typography>
            </div>
          </td>
          <td className="py-3">
            <div className="flex w-full items-center gap-[10.5px]">
              <NextImage
                src="/svg-icons/job-opening/offer.svg"
                alt="offer"
                width={22}
                height={20}
                className="size-[10px] shrink-0 md:size-[21.5px]"
              />

              <Typography
                as="p"
                className="text-sm font-light capitalize text-white md:text-lg"
              >
                {data.experience}
              </Typography>
            </div>
          </td>
          <td className="py-3">
            <div className="flex w-full items-center gap-[10.5px]">
              <NextImage
                src="/svg-icons/job-opening/clock.svg"
                alt="clock"
                width={22}
                height={20}
                className="size-[10px] shrink-0 md:size-[21.5px]"
              />

              <Typography
                as="p"
                className="text-sm font-light capitalize text-white md:text-lg"
              >
                {data.type_of_job}
              </Typography>
            </div>
          </td>
          <td className="py-3">
            <div className="flex w-full items-center gap-[10.5px]">
              <NextImage
                src="/svg-icons/job-opening/location.svg"
                alt="location"
                width={22}
                height={20}
                className="h-[21.5px] w-3 shrink-0 md:w-[17.5px]"
              />

              <Typography
                as="p"
                className="text-sm font-light capitalize text-white md:text-lg"
              >
                {data.job_location}
              </Typography>
            </div>
          </td>
          <td className="py-3">
            <ViewDetailsButton slug={data?.slug} country={country} />
          </td>
        </tr>
      ))}
    </>
  );
};

export default MobileTableRow;
