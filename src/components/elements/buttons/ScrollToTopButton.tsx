"use client";
import { FaArrowUp } from "react-icons/fa";
import OutlineButton from "./OutlineButton";

const handleScrollToTop = () => {
  try {
    if (!window) return;
    window?.scrollTo?.({ top: 0, behavior: "smooth" });
  } catch (error) {
    console.error("Error on scroll to top", error);
  }
};

const ScrollToTopButton = () => {
  return (
    <OutlineButton
      type="button"
      onClick={handleScrollToTop}
      className="flex size-10 animate-bounce items-center justify-center rounded-full bg-theme-black delay-150 animate-duration-[3000ms] hover:animate-none hover:!bg-theme-black/75 active:scale-90 sm:size-10"
    >
      <>
        <FaArrowUp className="size-4 shrink-0 text-theme-light-golden" />

        <span className="sr-only">Scroll to top button</span>
      </>
    </OutlineButton>
  );
};

export default ScrollToTopButton;
