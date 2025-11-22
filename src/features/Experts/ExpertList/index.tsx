import React from "react";
import Title from "./Title";
import Filters from "./Filters";
import Pagination from "./Pagination";
import OutlineButton from "@/components/elements/buttons/OutlineButton";
import ExpertCardList from "../ExpertCardList";
import Section from "@/components/blocks/Section/index";
import MoreButton from "./MoreButton";
import { TResponse } from "@/types/common";
import { nextFetch } from "@/library/utils/next-fetch";

interface IExpertListProps {
  className?: string;
  children?: React.ReactNode;
}

const ExpertList = async ({ className, children }: IExpertListProps) => {
  return (
    <Section.Container className={className}>{children}</Section.Container>
  );
};

ExpertList.Title = Title;
ExpertList.Filters = Filters;
ExpertList.ExpertCardList = ExpertCardList;
ExpertList.Pagination = Pagination;
ExpertList.MoreButton = MoreButton;

export default ExpertList;
