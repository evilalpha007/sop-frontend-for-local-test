import Section from "@/components/blocks/Section/index";
import { cn } from "@/library/utils/cn";

interface IHrProps {
  className?: string;
  withSectionContainer?: boolean;
}

const Hr = ({ className, withSectionContainer }: IHrProps) => {
  const content = (
    <div
      className={cn(
        "h-0 w-full self-stretch border-b-[0.5px] border-b-theme-off-white opacity-60",
        className,
      )}
    />
  );

  if (withSectionContainer) {
    return <Section.Container>{content}</Section.Container>;
  }

  return content;
};

export default Hr;
