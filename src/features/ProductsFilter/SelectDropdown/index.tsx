import NextImage from "@/components/elements/images/NextImage";
import Typography from "@/components/elements/texts/Typography";
import React from "react";
import Label from "./Label";
import Select from "./Select";
import { cn } from "@/library/utils/cn";

interface ISelectDropdownProps {
  children?: React.ReactNode;
  className?: string;
}

const SelectDropdown = ({ children, className }: ISelectDropdownProps) => {
  return <div className={cn(className)}>{children}</div>;
};

SelectDropdown.Label = Label;
SelectDropdown.Select = Select;

export default SelectDropdown;
