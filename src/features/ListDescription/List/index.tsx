import { cn } from "@/library/utils/cn";
import React from "react";
import Item from "./Item";

interface IListProps {
  className?: string;
  children?: React.ReactNode;
}

const List = ({ className, children }: IListProps) => {
  return (
    <ul className={cn("list-outside list-disc", className)}>{children}</ul>
  );
};

List.Item = Item;

export default List;
