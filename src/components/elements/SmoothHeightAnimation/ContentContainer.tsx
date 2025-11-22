import { cn } from "@/library/utils/cn";

interface IContentContainerProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {}

const ContentContainer = ({
  children,
  className,
  ...restProps
}: IContentContainerProps) => {
  return (
    <div
      className={cn("row-[1_/_span_2] overflow-hidden", className)}
      {...restProps}
    >
      {children}
    </div>
  );
};

export default ContentContainer;
