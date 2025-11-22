import Typography from "@/components/elements/texts/Typography";
import { nextFetch } from "@/library/utils/next-fetch";
import { TResponse } from "@/types/common";
import MobileTableRow from "./MobileTableRow";
import TableRow from "./TableRow";

export interface IJobOpeningsProps {
  title?: string;
  experience?: string;
  type_of_job?: string;
  job_location?: string;
  slug?: string;
  data?: [
    {
      id?: number;
      title?: string;
      experience?: string;
      type_of_job?: string;
      job_location?: string;
      slug?: string;
    },
  ];
}

const JobOpenings = async ({ country }: { country?: string }) => {
  const res =
    await nextFetch<TResponse<IJobOpeningsProps | undefined>>(
      `v1/auth/careers`,
    );
  const JobOpeningsData = res?.data || {};

  const jobOpeningTableData = JobOpeningsData?.data || [];

  // console.log("career current country", country);

  return (
    <div>
      <Typography
        as="h2"
        className="mb-2 text-center text-xl font-light text-theme-off-white md:text-2xl md:text-[32px]"
      >
        We connect by leading the way
      </Typography>

      <Typography
        as="p"
        className="mb-[35px] mt-7 text-center text-[12px] font-light text-theme-off-white md:text-lg"
      >
        Looking to take your career to the next level? As we expand across
        diverse departments, we continuously offer exciting new opportunities.{" "}
        {`We're`} looking for driven, ambitious, creative, and passionate
        individuals to join our dynamic team.
      </Typography>

      <div className="w-full">
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[700px] border-separate border-spacing-y-2">
            <tbody className="hidden w-full md:table-row-group">
              <TableRow
                jobOpeningTableData={jobOpeningTableData}
                country={country}
              />
            </tbody>
            <tbody className="w-full md:hidden">
              <MobileTableRow
                jobOpeningTableData={jobOpeningTableData}
                country={country}
              />
            </tbody>
          </table>
        </div>

        {/* <div className="mt-6 flex justify-center">
          <PrimaryButton className="bg-theme-light-golden !bg-opacity-20 px-[52px] py-3 text-sm font-light text-white hover:bg-theme-light-golden hover:!bg-opacity-20 sm:px-[52px] sm:py-3">
            View All
          </PrimaryButton>
        </div> */}
      </div>
    </div>
  );
};

export default JobOpenings;
