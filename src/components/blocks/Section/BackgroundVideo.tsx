import { cn } from "@/library/utils/cn";
import React from "react";

interface IBackgroundVideoProps
  extends React.DetailedHTMLProps<
    React.VideoHTMLAttributes<HTMLVideoElement>,
    HTMLVideoElement
  > {}

const BackgroundVideo = ({
  src,
  autoPlay = true,
  muted = true,
  loop = true,
  className,
  playsInline = true,
}: IBackgroundVideoProps) => {
  return (
    <div className="absolute inset-0 !-z-20 h-full w-full">
      <video
        src={src}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        playsInline={playsInline}
        className={cn("!-z-30 h-full w-full object-cover", className)}
      />
    </div>
  );
};

export default BackgroundVideo;
