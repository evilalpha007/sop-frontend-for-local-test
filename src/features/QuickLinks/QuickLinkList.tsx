import { cn } from "@/library/utils/cn";
import Card, { ICardProps } from "./Card";
import { getWidgets } from "@/api/get-widgets";

interface IQuickLinkListProps {
  className?: string;
  country?: string;
  withFragmentOnly?: boolean;
}

const QuickLinkList = async ({
  className,
  country,
  withFragmentOnly,
}: IQuickLinkListProps) => {
  const quickLinksData = (await getWidgets(country)) as any;
  //   console.log("quickLinksData", quickLinksData);
  const quickLinksList = (
    <>
      {quickLinksData?.map((data: any, idx: any) => (
        <Card key={idx} {...data} />
      ))}
    </>
  );

  if (withFragmentOnly) return quickLinksList;

  return (
    <div
      className={cn(
        "grid gap-[18px] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
        className,
      )}
    >
      {quickLinksList}
    </div>
  );
};

export default QuickLinkList;
