import { TSpecialtyItem } from "@/api/get-speciality";
import { cn } from "@/library/utils/cn";
import KeyFeatureCard from "./KeyFeatureCard";

interface IKeyFeaturesListProps {
  className?: string;
  withFragmentOnly?: boolean;
  data?: TSpecialtyItem[];
}

const KeyFeaturesList = async ({
  className,
  withFragmentOnly,
  data,
}: IKeyFeaturesListProps) => {
  //  // console.log("🚀 ~ keyFeaturesData", keyFeaturesData);
  const element = (
    <>{data?.map((item) => <KeyFeatureCard {...item} key={item?.id} />)}</>
  );

  if (withFragmentOnly) return element;

  return (
    <div
      className={cn(
        "grid w-full gap-5 sm:grid-cols-2 lg:flex lg:flex-wrap lg:justify-center",
        className,
      )}
    >
      {element}
    </div>
  );
};

export default KeyFeaturesList;
