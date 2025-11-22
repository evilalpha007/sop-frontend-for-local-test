import { cn } from "@/library/utils/cn";
import React from "react";
import Description from "./Description";
import Info from "./Info";
import LargeImage from "./LargeImage";
import Title from "./Title";

interface ILargeBlogCardProps {
  children: React.ReactNode;
  className?: string;
}

const LargeBlogCard = ({ children, className }: ILargeBlogCardProps) => {
  return <div className={cn(className)}>{children}</div>;
};

LargeBlogCard.Title = Title;
LargeBlogCard.Info = Info;
LargeBlogCard.Description = Description;
LargeBlogCard.LargeImage = LargeImage;

export default LargeBlogCard;
