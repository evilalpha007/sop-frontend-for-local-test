import SingleSlider from "@/features/SingleSlider/Slider";
import { nextFetch } from "@/library/utils/next-fetch";
import { TResponse } from "@/types/common";
import ExpertCardList from "../ExpertCardList";
import ExpertCardSlideList from "../ExpertCardSlideList";

export type TExpertsSlide = {
  id: number | string;
  full_name: string;
  position: string;
  experience: string;
  image: string;
  alt_text: string;
  specialized_id: 4;
  specialized: {
    id: number | string;
    name: string;
  };
  languages: [
    {
      id: number | string;
      name: string;
      pivot: {
        our_team_id: 6;
        team_language_id: 3;
      };
    },
    {
      id: number | string;
      name: string;
      pivot: {
        our_team_id: number | string;
        team_language_id: number | string;
      };
    },
  ];
};

export type TExpertsSlideData = {
  data?: TExpertsSlide[] | null;
  current_page: number;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: {
    url: null;
    label: string;
    active: false;
  }[];
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: null;
  to: number;
  total: number;
};

const TabletSlider = async () => {
  const res = await nextFetch<TResponse<TExpertsSlideData>>(
    "v1/auth/our-teams/filter?limit=2",
    {
      cache: "no-store",
    },
  );
  const ourExpertsData = res?.data;

  const totalSlides = new Array(ourExpertsData?.last_page || 0).fill(0);

  return (
    <SingleSlider>
      {/* <ExpertGroup />
      <ExpertGroup /> */}
      {totalSlides?.map((_, index) => (
        <ExpertCardSlideList key={index} type="Tablet" index={index} />
      ))}
    </SingleSlider>
  );
};

export default TabletSlider;
