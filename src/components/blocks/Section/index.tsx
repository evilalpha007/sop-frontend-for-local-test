import React from "react";

import { cn } from "@/library/utils/cn";
import BackgroundImage from "./BackgroundImage";
import BackgroundVideo from "./BackgroundVideo";
import Container from "./Container";
import H1 from "./H1";
import HeroContainer from "./HeroContainer";
import Title from "./Title";

export default function Section({
  children,
  className = "",
  ...rest
}: React.ComponentProps<"div">) {
  return (
    <section
      {...rest}
      className={cn(
        "relative z-0 py-7 sm:py-10 md:py-14 lg:py-16 xl:py-20 2xl:py-24",
        className,
      )}
    >
      {children}
    </section>
  );
}

Section.Container = Container;
Section.Title = Title;
Section.BackgroundImage = BackgroundImage;
Section.BackgroundVideo = BackgroundVideo;
Section.HeroContainer = HeroContainer;
Section.H1 = H1;
