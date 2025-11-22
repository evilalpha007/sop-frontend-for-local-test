import Section from "@/components/blocks/Section/index";
import ToggleContextProvider from "@/library/contexts/ToggleContextProvider";
import React from "react";
import ContainerWrapper from "./ContainerWrapper";
import Description from "./Description";
import Filters from "./Filters";
import ProfilePhoto from "./ProfilePhoto";
import Title from "./Title";

interface IExpertProfileDetailsProps {
  className?: string;
  children?: React.ReactNode;
}

const ExpertProfileDetails = ({
  className,
  children,
}: IExpertProfileDetailsProps) => {
  return (
    <div className="z-[1] mx-auto w-full max-w-[1200px] px-4">
      <ToggleContextProvider>
        <ContainerWrapper>{children}</ContainerWrapper>
      </ToggleContextProvider>
    </div>
  );
};

ExpertProfileDetails.Title = Title;
ExpertProfileDetails.Filters = Filters;
ExpertProfileDetails.ProfilePhoto = ProfilePhoto;
ExpertProfileDetails.Description = Description;

export default ExpertProfileDetails;
