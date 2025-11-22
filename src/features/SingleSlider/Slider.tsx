import { cn } from "@/library/utils/cn";
import SliderWrapper from "./SliderWrapper";

interface ISingleSliderProps {
  children: React.ReactNode;
  className?: string;
  withInternalWrapper?: boolean;
  settings?: Record<string, any>;
}

const SingleSlider = ({
  children,
  className,
  settings,
}: ISingleSliderProps) => {
  const slider = (
    <SliderWrapper className={cn(className)} settings={settings}>
      <>{children}</>
    </SliderWrapper>
  );

  return <div className={cn(className)}>{slider}</div>;
};

export default SingleSlider;
