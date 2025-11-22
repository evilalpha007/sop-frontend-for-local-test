import { useEffect, useRef, useState } from "react";

interface UseSlideIntervalOptions {
  pauseOnHover?: boolean; // Pause on hover
  interval?: number; // Interval duration in milliseconds
  onInterval?: () => void; // Callback at the end of the interval
  play?: boolean;
}

type TMouseEventHandler = (props: {
  setIsPaused: React.Dispatch<React.SetStateAction<boolean>>;
  mode: "enter" | "leave";
}) => React.MouseEventHandler<HTMLElement>;

const onMouseEventHandler: TMouseEventHandler = ({ setIsPaused, mode }) => {
  return (e) => {
    // console.log(`mouse ${mode}`);
    setIsPaused(() => mode === "enter");
  };
};

const useInterval = ({
  interval = 3000,
  onInterval,
  pauseOnHover,
  play = true,
}: UseSlideIntervalOptions) => {
  const [isPaused, setIsPaused] = useState(() => false);
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!play || (pauseOnHover && isPaused)) {
      if (intervalIdRef.current !== null) clearInterval(intervalIdRef.current);
    } else {
      if (intervalIdRef.current !== null) clearInterval(intervalIdRef.current);
      intervalIdRef.current = setInterval(() => {
        if (onInterval && typeof onInterval === "function") onInterval();
      }, interval);
    }

    const intervalId = intervalIdRef.current;
    return () => {
      if (intervalId !== null) {
        clearInterval(intervalId);
        intervalIdRef.current = null;
      }
    };
  }, [interval, onInterval, pauseOnHover, play, isPaused]);

  return {
    isPaused,

    eventHandlers: {
      onMouseEnter: onMouseEventHandler({
        setIsPaused,
        mode: "enter",
      }),
      onMouseLeave: onMouseEventHandler({
        setIsPaused,
        mode: "leave",
      }),
    },
  };
};

export default useInterval;
