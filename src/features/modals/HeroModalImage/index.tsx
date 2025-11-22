"use client";
import PrimaryButton from "@/components/elements/buttons/PrimaryButton";
import NextImage from "@/components/elements/images/NextImage";
import useBooleanState from "@/library/hooks/useBooleanState";
import useDelayedAction from "@/library/hooks/useDelayedAction";
import { useLocalStorage } from "@/library/hooks/useLocalStorage";
import { useOutsideClick } from "@/library/hooks/useOutsideClick";
import useWindowMount from "@/library/hooks/useWindowMount";
import Link from "next/link";
import { memo, useEffect } from "react";
import { IoClose } from "react-icons/io5";

const getCustomLink = (contactLink: string): string => {
  const isPhoneNumber = /^\d+$/.test(contactLink); // The regular expression `/^\d+$/` is used to check if the contact link consists only of digits (i.e., a phone number)
  return isPhoneNumber ? `https://wa.me/${contactLink}` : contactLink;
};

const handleStopPropagation: React.MouseEventHandler<HTMLDivElement> = (e) =>
  e.stopPropagation();

const processUpdateLocalStorage = (
  setHasModalBeenShown: (value: boolean) => void,
) => {
  return () => {
    setHasModalBeenShown(true);
  };
};

const HeroModalImage = ({
  outsideHide = true,
  isClosing = false,
  closeBtn = true,
}) => {
  const {
    value: hasModalBeenShown,
    loading: isHasModalBeenShownLoading,
    setValue: setHasModalBeenShown,
  } = useLocalStorage<boolean>("heroModalShown", false);

  const { isMounted } = useWindowMount();
  const { state: isOpen, setClose, setOpen } = useBooleanState();
  const { delayedAction } = useDelayedAction({
    delay: 10000,
  });

  const { ref: modalRef } = useOutsideClick<HTMLDivElement>({
    onOutsideClick: setClose(),
  });

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      isHasModalBeenShownLoading === false &&
      hasModalBeenShown !== true
    ) {
      delayedAction(setOpen())();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasModalBeenShown]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  const contactLink = "544454545454";

  if (!isMounted || !isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-theme-black/80 p-5"
      onClick={
        outsideHide
          ? setClose({
              afterExecute: processUpdateLocalStorage(setHasModalBeenShown),
            })
          : undefined
      }
    >
      <div
        ref={modalRef}
        className={`${
          isClosing ? "animate-modal-close" : "animate-modal"
        } relative flex w-full max-w-[450px] flex-col items-center justify-center md:max-w-[1040px]`}
        onClick={handleStopPropagation}
      >
        {closeBtn && (
          <button
            onClick={setClose({
              afterExecute: processUpdateLocalStorage(setHasModalBeenShown),
            })}
            className="absolute right-0 top-0 z-50 p-1 text-2xl text-theme-off-white"
            aria-label="Close modal"
            role="button"
          >
            <IoClose />
          </button>
        )}

        <Link
          href={getCustomLink(contactLink)}
          target="_blank"
          className="flex h-full w-full flex-col items-center justify-center"
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
              {/* <a
                href={getCustomLink(contactLink)}
                target="_blank"
                rel="noopener noreferrer"
              > */}
              Enquire Now
              {/* </a> */}
            </PrimaryButton>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default memo(HeroModalImage);
