import SmoothHeightAnimation from "@/components/elements/SmoothHeightAnimation";
import { cn } from "@/library/utils/cn";
import DropdownWrapper from "./DropdownWrapper";

interface IDropdownProps {
  title: React.ReactNode;
  content: React.ReactNode;
  className?: string;
  enableHoverMode?: boolean;
  minW?: boolean;
}

const Dropdown = ({
  title,
  content,
  className,
  enableHoverMode,
  minW = true,
}: IDropdownProps) => {
  return (
    <DropdownWrapper
      title={title}
      enableHoverMode={enableHoverMode}
      minW={minW}
    >
      <SmoothHeightAnimation.ContentContainer className="bg-transparent">
        <div className="overflow-hidden border border-theme-green-gray/60 bg-theme-black p-0 shadow-2xl">
          <div
            className={cn(
              "hide-scrollbar max-h-80 w-full overflow-y-auto scroll-smooth",
              className,
            )}
          >
            {content}
          </div>
        </div>
      </SmoothHeightAnimation.ContentContainer>
    </DropdownWrapper>
  );
};

export default Dropdown;
