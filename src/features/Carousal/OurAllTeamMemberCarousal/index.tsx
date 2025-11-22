import { getAllTeamExperts } from "@/api/get-all-team-expert";
import Slider from "./Slider";

interface IOurAllTeamMemberCarousalProps {
  apiQuery?: {
    country?: string;
    language?: string | number;
    specialized?: string | number;
  };
}

const OurAllTeamMemberCarousal = async ({
  apiQuery,
}: IOurAllTeamMemberCarousalProps) => {
  const data = await getAllTeamExperts(apiQuery);

  return <Slider teamMembers={data} />;
};

export default OurAllTeamMemberCarousal;
