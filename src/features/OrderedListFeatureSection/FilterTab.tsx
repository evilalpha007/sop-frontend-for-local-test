import Filter, { IFilterItem } from "./Filter";

export interface IFiltersTabProps {
  data: IFilterItem[];
  activeTab?: string | number;
  onFilterClick?: (data?: IFilterItem) => void;
}

const FilterTab = ({ data, activeTab, onFilterClick }: IFiltersTabProps) => {
  return (
    <ul className="flex w-fit items-center justify-between gap-x-6 gap-y-2 md:gap-x-8">
      {data?.map((filter) => {
        //  // console.log(filter);
        const lowerCaseActiveTab = activeTab
          ? String(activeTab).toLowerCase()
          : undefined;
        const lowerCaseTitle = filter?.title?.toLowerCase();
        const isTitleMatched =
          !!lowerCaseActiveTab &&
          !!lowerCaseTitle &&
          lowerCaseActiveTab === lowerCaseTitle;
        const isIdMatched =
          !!activeTab && !!filter.id && activeTab === filter.id;
        const isQueryMatched =
          !!filter.query && !!activeTab && activeTab === filter.query;
        const isActive = isIdMatched || isTitleMatched || isQueryMatched;

        return (
          <Filter key={filter.id} info={{ filter, isActive, onFilterClick }}>
            {filter?.title}
          </Filter>
        );
      })}
    </ul>
  );
};

export default FilterTab;
