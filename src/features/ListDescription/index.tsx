import { cn } from "@/library/utils/cn";
import React from "react";
import List from "./List";
import Paragraph from "./Paragraph";
import Title from "./Title";

interface IListDescriptionProps {
  className?: string;
  children?: React.ReactNode;
}

const ListDescription = ({ className, children }: IListDescriptionProps) => {
  return <div className={cn(className)}>{children}</div>;
};

ListDescription.Title = Title;
ListDescription.Paragraph = Paragraph;
ListDescription.List = List;

export default ListDescription;
