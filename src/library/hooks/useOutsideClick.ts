import { useEffect, useRef, useState } from "react";

export type TEventType = MouseEvent | TouchEvent | FocusEvent;
export type TCallback = (event: TEventType) => void | void;

export type TUseOutsideClickProps = {
  onOutsideClick?: TCallback;
  onInsideClick?: TCallback;
};

const processHandleClickOutside = <T extends HTMLElement>({
  onInsideClick,
  onOutsideClick,
  setIsInsideClick,
  ref,
}: TUseOutsideClickProps & {
  setIsInsideClick: React.Dispatch<React.SetStateAction<boolean>>;
  ref: React.RefObject<T>;
}) => {
  return (event: TEventType) => {
    if (ref.current && !ref.current.contains(event?.target as Node)) {
      onOutsideClick?.(event);
      setIsInsideClick(false);
    } else if (ref.current && ref.current.contains(event?.target as Node)) {
      onInsideClick?.(event);
      setIsInsideClick(true);
    }
  };
};

export const useOutsideClick = <T extends HTMLElement>({
  onInsideClick,
  onOutsideClick,
}: TUseOutsideClickProps) => {
  const [isInsideClick, setIsInsideClick] = useState(false);
  const ref = useRef<T>(null);

  useEffect(() => {
    // const handleClickOutside = (event: TEventType) => {
    //   if (ref.current && !ref.current.contains(event?.target as Node)) {
    //     onOutsideClick?.(event);
    //     setIsInsideClick(false);
    //   } else if (ref.current && ref.current.contains(event?.target as Node)) {
    //     onInsideClick?.(event);
    //     setIsInsideClick(true);
    //   }
    // };

    const handleClickOutside = processHandleClickOutside({
      onInsideClick,
      onOutsideClick,
      setIsInsideClick,
      ref,
    });

    document?.addEventListener("mouseup", handleClickOutside);
    document?.addEventListener("touchend", handleClickOutside);

    return () => {
      document?.removeEventListener("mouseup", handleClickOutside);
      document?.removeEventListener("touchend", handleClickOutside);
    };
  }, [onInsideClick, onOutsideClick]);

  return { ref, isInsideClick };
};
