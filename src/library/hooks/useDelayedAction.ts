import { useEffect, useRef, useState } from "react";

type THandleDelayedAction = (props: {
  timeoutRef: React.MutableRefObject<NodeJS.Timeout | null>;
  delay: number;
  setIsWaitingToAction: React.Dispatch<React.SetStateAction<boolean>>;
  isWaitingToAction: boolean;
}) => (callback: Function | null | undefined | void) => () => void;

const handleDelayedAction: THandleDelayedAction = ({
  timeoutRef,
  delay,
  setIsWaitingToAction,
  isWaitingToAction,
}) => {
  return (callback) => {
    return () => {
      try {
        if (timeoutRef.current !== null) {
          clearTimeout(timeoutRef.current);
        }

        if (isWaitingToAction || typeof callback !== "function") return;

        setIsWaitingToAction(() => true);

        timeoutRef.current = setTimeout(() => {
          callback();
          setIsWaitingToAction(() => false);
        }, delay);
      } catch (error) {
        console.error("Failed to handle delayed action: ", error);
      }
    };
  };
};

type TUseDelayedActionProps = { delay?: number } | void;

const useDelayedAction = ({ delay = 300 }: TUseDelayedActionProps = {}) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isWaitingToAction, setIsWaitingToAction] = useState(false);

  useEffect(() => {
    const currentTimeout = timeoutRef.current;

    return () => {
      if (currentTimeout !== null) {
        clearTimeout(currentTimeout);
        timeoutRef.current = null;
      }
    };
  }, []);

  return {
    delayedAction: handleDelayedAction({
      timeoutRef,
      delay,
      setIsWaitingToAction,
      isWaitingToAction,
    }),
    isWaitingToAction,
  };
};

export default useDelayedAction;
