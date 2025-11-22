import Filter, { IFilterItem } from "./Filter";

export interface IFiltersTabProps {
  data: IFilterItem[];
  activeTab?: string | number;
  onFilterClick?: (data?: IFilterItem) => void;
}

const FilterTab = ({ data, activeTab, onFilterClick }: IFiltersTabProps) => {
  return (
    <div className="relative flex w-full flex-row overflow-x-auto overflow-y-hidden">
      <span className="absolute bottom-[1px] left-0 h-0 w-full self-stretch border-b-[0.5px] border-b-theme-off-white opacity-60"></span>
      <ul className="flex w-full min-w-fit flex-nowrap items-center justify-between gap-x-3 py-1">
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
            !!filter.value && !!activeTab && activeTab === filter.value;
          const isActive = isIdMatched || isTitleMatched || isQueryMatched;

          return (
            <Filter key={filter.id} info={{ filter, isActive, onFilterClick }}>
              {filter?.title}
            </Filter>
          );
        })}
      </ul>
    </div>
  );
};

export default FilterTab;
