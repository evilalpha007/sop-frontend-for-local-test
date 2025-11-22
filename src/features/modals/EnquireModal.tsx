"use client";
import PrimaryButton from "@/components/elements/buttons/PrimaryButton";
import NextImage from "@/components/elements/images/NextImage";
import Link from "next/link";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { IoClose } from "react-icons/io5";

interface EnquireModalProps {
  children: any;
  closeBtn?: boolean;
  outsideHide?: boolean;
  animationDuration?: number;
}

const EnquireModal = ({
  children,
  closeBtn = true,
  outsideHide = true,
  animationDuration = 500,
}: EnquireModalProps) => {
  const [open, setOpen] = useState(false);
  const [isBrowser, setIsBrowser] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setOpen(false);
      setIsClosing(false);
    }, animationDuration);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [open]);

  const contactLink = "544454545454"; // Use this URL for testing

  // Generate a custom link based on input type
  const getCustomLink = () => {
    const isNumber = /^\d+$/.test(contactLink);
    return isNumber ? `https://wa.me/${contactLink}` : contactLink;
  };

  const modalContent = open ? (
    <div
      className="fixed left-0 top-0 z-50 flex h-screen w-full flex-col items-center justify-center bg-theme-black/80 p-5"
      onClick={outsideHide ? handleClose : undefined}
    >
      <div
        className={`${
          isClosing ? "animate-modal-close" : "animate-modal"
        } relative flex w-full max-w-[450px] flex-col items-center justify-center md:max-w-[1040px]`}
        onClick={(e) => e.stopPropagation()}
      >
        {closeBtn && (
          <button
            onClick={handleClose}
            className="absolute right-0 top-0 z-50 p-1 text-2xl text-theme-off-white"
          >
            <IoClose />
          </button>
        )}

        {/* Dynamic link based on contactLink */}
        <Link
          className="flex h-full w-full flex-col items-center justify-center"
          target="_blank"
          href={getCustomLink()} // Custom link based on input
        >
          <NextImage
            width={880}
            height={495}
            src="/images/banner/event/new-year-banner.webp"
            alt="hero-modal"
            className="hidden h-full w-full object-cover md:block"
          />
          <NextImage
            width={880}
            height={495}
            src="/images/banner/event/new-year-banner-mobile.webp"
            alt="hero-modal"
            className="block h-full w-full object-cover md:hidden"
          />
          <div className="flex w-full flex-row items-center justify-center">
            <PrimaryButton className="rounded-b-xl px-12 !text-lg">
              <a
                href={getCustomLink()}
                target="_blank"
                rel="noopener noreferrer"
              >
                Enquire Now
              </a>
            </PrimaryButton>
          </div>
        </Link>
      </div>
    </div>
  ) : null;

  return (
    <>
      <div onClick={handleClickOpen} className="w-auto">
        {children}
      </div>

      {isBrowser && ReactDOM.createPortal(modalContent, document.body)}
    </>
  );
};

export default EnquireModal;
