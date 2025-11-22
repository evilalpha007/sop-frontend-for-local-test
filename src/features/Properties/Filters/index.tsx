"use client";
import { TPropertyType } from "@/api/get-property-types";
import useManageSearchParams from "@/library/hooks/useManageSearchParams";
import Filter from "./Filter";

export interface IFiltersProps {
  data: TPropertyType[];
  propertyType?: number | string;
}

const Filters = ({ data, propertyType }: IFiltersProps) => {
  const { updateAParam } = useManageSearchParams<{
    propertyType?: number | string;
  }>();

  const activeTab =
    propertyType !== undefined ? String(propertyType) : undefined;

  return (
    <div className="w-full overflow-x-auto scroll-smooth scrollbar-hide pb-3">
      <div className="flex justify-center w-fit min-w-full">
        <ul className="flex flex-nowrap gap-3 px-4">
          {data?.map((filter) => {
            const filterId =
              filter.id !== undefined ? String(filter.id) : undefined;

            const isActive =
              activeTab !== undefined &&
              filterId !== undefined &&
              activeTab === filterId;

            return (
              <Filter
                key={filter?.id}
                info={{
                  filter: {
                    id: filter.id ?? -1,
                    title: filter.name ?? "",
                    query: String(filter.id || -1),
                  },
                  isActive,
                  onFilterClick: () => {
                    updateAParam({
                      key: "propertyType",
                      value: filter.id,
                    });
                  },
                }}
              >
                <span
                  className={`block whitespace-nowrap   px-4 py-1.5 text-sm transition-all duration-200 ${
                    isActive
                      ? " text-white border-theme-light-golden"
                      : " text-white  border-gray-300 hover:border-theme-light-golden hover:text-theme-light-golden"
                  }`}
                >
                  {filter?.name}
                </span>
              </Filter>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Filters;
