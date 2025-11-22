"use client";
import PrimaryButton from "@/components/elements/buttons/PrimaryButton";
import NextImage from "@/components/elements/images/NextImage";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";

const HeroModalImage = ({
  outsideHide = true,
  isClosing = false,
  closeBtn = true,
  data = { duration: 15000 }, // Default duration (15s) if `data` is undefined
}: {
  outsideHide?: boolean;
  isClosing?: boolean;
  closeBtn?: boolean;
  data?: any;
}) => {
  // console.log("Data received:", data); // Debug log
  const [open, setOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
    if (typeof window === "undefined") return;

    const hasModalBeenShown = localStorage.getItem("heroModalShown");
    const delayMs = data?.duration ? data.duration * 1000 : 15000; // 15s default

    if (!hasModalBeenShown) {
      const timer = setTimeout(() => {
        setOpen(true);
      }, delayMs);

      return () => clearTimeout(timer);
    }
  }, [data?.duration]);

  // Rest of the code (handleClose, click outside, etc.) remains the same...
  const handleClose = () => {
    setOpen(false);
    localStorage.setItem("heroModalShown", "true");
  };

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-theme-black/80 p-5"
          onClick={outsideHide ? handleClose : undefined}
        >
          <div
            ref={modalRef}
            className={`${
              isClosing ? "animate-modal-close" : "animate-modal"
            } relative flex w-full max-w-[450px] flex-col items-center justify-center md:max-w-[1040px]`}
            onClick={(e) => e.stopPropagation()}
            style={{ maxHeight: "90vh" }}
          >
            {closeBtn && (
              <button
                onClick={handleClose}
                className="absolute right-0 top-0 z-50 p-1 text-2xl text-theme-off-white"
                aria-label="Close modal"
              >
                <IoClose />
              </button>
            )}

            <Link
              href={data?.link || "#"}
              target="_blank"
              className="flex w-full flex-col items-center justify-center"
            >
              <div className="relative flex h-full w-full items-center justify-center">
                <NextImage
                  width={880}
                  height={495}
                  src={
                    data?.image || "/images/banner/event/new-year-banner-2.png"
                  }
                  alt="hero-modal"
                  className="hidden h-auto w-full object-contain md:block"
                  style={{ maxHeight: "80vh" }}
                />
                <NextImage
                  width={880}
                  height={495}
                  src={
                    data?.image || "/images/banner/event/new-year-banner-2.png"
                  }
                  alt="hero-modal"
                  className="block h-auto w-full object-contain md:hidden"
                  style={{ maxHeight: "80vh" }}
                />
              </div>

              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 transform">
                <PrimaryButton className="px-6 py-2">
                  {data?.link_text || "Click Here"}
                </PrimaryButton>
              </div>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default HeroModalImage;
