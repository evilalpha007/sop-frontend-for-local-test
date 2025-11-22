"use client";
import useManageSearchParams from "@/library/hooks/useManageSearchParams";
import { TMeta } from "@/types/common";
import ExpertList from "../ExpertList";

interface IPaginationProps {
  paginationInfo: Required<TMeta>;
}

const Pagination = ({ paginationInfo }: IPaginationProps) => {
  const { updateAParam } = useManageSearchParams<{
    page?: number;
    limit?: number;
  }>();

  return (
    <ExpertList.Pagination
      totalItems={paginationInfo?.total || 0}
      itemsPerPage={paginationInfo?.per_page ?? 8}
      currentPage={paginationInfo?.current_page ?? 1}
      onPageChange={(page) => {
        updateAParam({
          key: "page",
          value: page === 1 || !page ? undefined : page,
        });
      }}
    />
  );
};

export default Pagination;
