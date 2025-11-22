import React from "react";
import Card, { ICardProps } from "./Card";
import { title } from "process";
import QuickLinkList from "./QuickLinkList";
import SingleSlider from "../SingleSlider/Slider";
import Section from "@/components/blocks/Section/index";

const QuickLinks = ({ country }: { country: string }) => {
  return (
    <div>
      <div className="hidden sm:block">
        <QuickLinkList country={country} />
      </div>

      <div className="mx-auto block sm:hidden">
        <Section.Container>
          <SingleSlider className="h-full">
            <QuickLinkList withFragmentOnly country={country} />
          </SingleSlider>
        </Section.Container>
      </div>
    </div>
  );
};

export default QuickLinks;
