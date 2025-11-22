import { cn } from "@/library/utils/cn";
import ContentContainer from "./ContentContainer";

interface ISmoothHeightAnimationProps {
  open?: boolean;
  className?: string;
  children: React.ReactNode;
  groupHoverMode?: boolean;
}

const SmoothHeightAnimation = ({
  open,
  className,
  children,
  groupHoverMode,
}: ISmoothHeightAnimationProps) => {
  return (
    <div
      className={cn(
        "grid grid-rows-[0fr] transition-[grid-template-rows] duration-[0.5s] ease-[ease-out]",
        open ? "grid-rows-[1fr]" : "",
        groupHoverMode ? "group-hover:grid-rows-[1fr]" : "",
        className,
      )}
    >
      {children}
    </div>
  );
};

SmoothHeightAnimation.ContentContainer = ContentContainer;
export default SmoothHeightAnimation;
