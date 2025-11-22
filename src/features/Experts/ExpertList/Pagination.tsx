"use client";
import Button from "@/components/elements/buttons/Button";
import OutlineButton from "@/components/elements/buttons/OutlineButton";
import { cn } from "@/library/utils/cn";
import React, { useEffect, useState } from "react";

interface PaginationProps {
  totalItems?: number;
  itemsPerPage?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  position?: "left" | "center" | "right";
  className?: string;
}

const getVisiblePages = (page: number, total: number) => {
  if (total <= 5) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages = [];
  if (page <= 3) {
    pages.push(1, 2, 3, 4, 5);
  } else if (page >= total - 2) {
    pages.push(total - 4, total - 3, total - 2, total - 1, total);
  } else {
    pages.push(page - 2, page - 1, page, page + 1, page + 2);
  }

  return pages;
};

const Pagination: React.FC<PaginationProps> = ({
  totalItems = 10,
  itemsPerPage = 5,
  currentPage = 1,
  onPageChange,
  position = "center",
  className,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [visiblePages, setVisiblePages] = useState<number[]>([]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    onPageChange?.(page);
    setVisiblePages(getVisiblePages(page, totalPages));
  };

  useEffect(() => {
    setVisiblePages(getVisiblePages(currentPage, totalPages));
  }, [currentPage, totalPages]);

  return (
    <div
      className={cn("flex items-center gap-4", {
        "justify-start": position === "left",
        "justify-center": position === "center",
        "justify-end": position === "right",
        className,
      })}
    >
      <OutlineButton
        className="w-[100px] border-theme-off-white py-2 font-roboto text-sm font-normal"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </OutlineButton>

      <div className="flex items-center gap-4">
        {visiblePages?.[0] > 1 && (
          <>
            <Button
              className="font-roboto text-lg font-normal text-white"
              onClick={() => handlePageChange(1)}
            >
              1
            </Button>

            {visiblePages[0] > 2 && (
              <span className="select-none font-roboto text-lg font-normal text-white">
                ...
              </span>
            )}
          </>
        )}

        {visiblePages?.map((page) => (
          <Button
            key={page}
            className={cn(
              "relative px-1 font-roboto text-lg font-normal text-white",
              "after:absolute after:-bottom-1 after:left-0 after:right-0 after:w-full after:scale-x-0 after:border-b-[2px] after:border-b-theme-light-golden after:opacity-0 after:transition-all after:duration-300 after:content-[''] after:hover:scale-x-100 after:hover:opacity-100",
              {
                "text-theme-light-golden after:scale-x-100 after:opacity-100":
                  page === currentPage,
              },
            )}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </Button>
        ))}

        {visiblePages?.[visiblePages?.length - 1] < totalPages && (
          <>
            {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
              <span className="select-none font-roboto text-lg font-normal text-white">
                ...
              </span>
            )}
            <button
              className="font-roboto text-lg font-normal text-white"
              onClick={() => handlePageChange(totalPages)}
            >
              {totalPages}
            </button>
          </>
        )}
      </div>

      <OutlineButton
        className="w-[100px] border-theme-off-white py-2 font-roboto text-sm font-normal"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </OutlineButton>
    </div>
  );
};

export default Pagination;
