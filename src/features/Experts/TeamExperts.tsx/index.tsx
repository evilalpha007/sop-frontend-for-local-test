import { getTeamExperts } from "@/api/get-team-experts";
import ExpertList from "../ExpertList";
import Filters from "./Filters";
import Pagination from "./Pagination";

interface ITeamExpertsProps {
  disabled?: boolean
  apiQuery?: {
    country?: string;
    language?: string;
    specialized?: string;
    limit?: number;
    page?: number;
  };
}

const TeamExperts = async ({ apiQuery, disabled }: ITeamExpertsProps) => {
  const { data, paginationInfo } = await getTeamExperts(apiQuery);

  return (
    <ExpertList className="mt-20">
      <Filters country={apiQuery?.country ?? 'uae'} disabled={disabled ?? true}/>

      <ExpertList.ExpertCardList className="mb-10 lg:grid-cols-4" data={data} />

      <Pagination paginationInfo={paginationInfo} />
    </ExpertList>
  );
};

export default TeamExperts;
