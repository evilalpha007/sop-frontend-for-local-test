import Filter, { IFilterItem } from "./Filter";

export interface IFiltersTabProps {
  data: IFilterItem[]; // List of filter items
  activeTab?: string | number; // Current active tab identifier
  onFilterClick?: (data: IFilterItem) => void; // Callback when a filter is clicked
}

const FilterTab = ({ data, activeTab, onFilterClick }: IFiltersTabProps) => {
  return (
    <ul className="flex w-full flex-nowrap items-center justify-between gap-x-4 gap-y-2 !overflow-x-auto overflow-y-hidden md:gap-x-3">
      {data?.map((filter) => {
        // Ensure proper comparisons for active state
        const lowerCaseActiveTab = activeTab
          ? String(activeTab).toLowerCase().trim()
          : undefined;
        const lowerCaseTitle = filter?.title?.toLowerCase().trim();

        const isTitleMatched =
          lowerCaseActiveTab &&
          lowerCaseTitle &&
          lowerCaseActiveTab === lowerCaseTitle;
        const isIdMatched = activeTab && filter.id === activeTab;
        const isQueryMatched = activeTab && filter.query === activeTab;

        // Ensure isActive is a boolean
        const isActive = Boolean(
          isIdMatched || isTitleMatched || isQueryMatched,
        );

        return (
          <Filter
            key={filter.id}
            info={{
              filter,
              isActive, // Now guaranteed to be boolean
              onFilterClick: () => onFilterClick?.(filter), // Pass the clicked filter to the callback
            }}
          >
            {filter?.title}
          </Filter>
        );
      })}
    </ul>
  );
};

export default FilterTab;
