import { cn } from "@/library/utils/cn";
import React from "react";
import Input from "./Input";
import Label from "./Label";
import Tabs from "./Tabs";

interface IRangeInputProps {
  children?: React.ReactNode;
  className?: string;
}

const RangeInput = ({ children, className }: IRangeInputProps) => {
  return <div className={cn("w-full", className)}>{children}</div>;
};

RangeInput.Label = Label;
RangeInput.Input = Input;
RangeInput.Tabs = Tabs;

export default RangeInput;
