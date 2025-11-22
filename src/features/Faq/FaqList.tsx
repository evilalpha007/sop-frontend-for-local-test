"use client";
import { TAFaq } from "@/api/get-faqs";
import Accordion from "@/components/elements/Accordion";
import { AccordionProvider } from "@/components/elements/Accordion/AccordionContext";
import OutlineButton from "@/components/elements/buttons/OutlineButton";
import { useState } from "react";

interface IFaqListProps {
  limitedData?: TAFaq[] | null;
  allData?: TAFaq[] | null;
}

const FaqList = ({ allData, limitedData }: IFaqListProps) => {
  const [isShowAll, setIsShowAll] = useState(false);

  const data = isShowAll ? allData : limitedData;

  const content = (
    <AccordionProvider>
      <div className="space-y-1 sm:space-y-2">
        {data?.map((item) => (
          <Accordion key={item?.id} title={item?.question ?? ""}>
            <p className="bg-theme-light-golden bg-opacity-20 px-4 py-3.5 text-[12px] font-light leading-[18px] sm:px-7 sm:py-5 sm:text-lg sm:leading-6">
              {item?.answer}
            </p>
          </Accordion>
        ))}
      </div>
    </AccordionProvider>
  );

  return (
    <div>
      {content}

      <div className="font- mt-5 flex w-full items-center justify-center">
        <OutlineButton onClick={() => setIsShowAll((prev) => !prev)}>
          {isShowAll ? "Show Less" : "Show More"}
        </OutlineButton>
      </div>
    </div>
  );
};

export default FaqList;
