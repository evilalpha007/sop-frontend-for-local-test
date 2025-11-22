"use client";
import NextImage from "@/components/elements/images/NextImage";
import Typography from "@/components/elements/texts/Typography";
import { useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import Form from "./Form";
import ModalSlider from "./ModalSlider";

const HeroModal = () => {
  const [open, setOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Explicitly define the type of modalRef as HTMLDivElement or null
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true); // This ensures that the component has mounted
    const hasModalBeenShown = localStorage.getItem("heroModalShown");
    if (!hasModalBeenShown) {
      setOpen(true); // Show the modal if it hasn't been shown
    }

    // Close modal when clicking outside of it
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
        localStorage.setItem("heroModalShown", "true");
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const handleClose = () => {
    setOpen(false);
    localStorage.setItem("heroModalShown", "true"); // Set a flag in localStorage after closing
  };

  // Avoid rendering the modal until the component has mounted on the client
  if (!isMounted) {
    return null; // Avoid rendering anything during SSR
  }

  return (
    <>
      {open && (
        <div className="fixed left-0 top-0 z-50 flex h-screen w-full flex-col items-center justify-center bg-theme-black/70 p-5">
          <div
            ref={modalRef} // Reference to the modal container
            className="relative grid w-full max-w-[880px] grid-cols-1 border border-theme-off-golden bg-theme-black lg:grid-cols-2"
          >
            {/* close button */}
            <button
              onClick={handleClose}
              className="absolute right-3 top-3 p-1 text-xl text-theme-light-golden"
            >
              <IoClose />
            </button>
            {/* images box */}
            <div className="hidden w-full flex-col items-center justify-center border-r border-theme-off-golden lg:flex">
              <ModalSlider />
            </div>
            {/* form box */}
            <div className="flex w-full flex-col items-center justify-center p-7 px-10">
              <div className="w-full">
                <NextImage
                  src="/svg-icons/navbar/navbar-logo.svg"
                  alt="SOP brand logo"
                  width={21}
                  height={40}
                  disableBlur
                  priority
                  className="h-10 w-[21px]"
                />
              </div>
              <div className="flex w-full flex-col items-center justify-center gap-3 text-center">
                <Typography className="text-2xl font-light uppercase lg:text-3xl">
                  GET EXCLUSIVE CONTENT
                </Typography>
                <Typography className="text-sm font-light">
                  Unveil Elegant Dubai Interior Design Trends
                </Typography>
              </div>
              <br />
              <Form />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HeroModal;
