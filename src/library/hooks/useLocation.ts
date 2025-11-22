// import { useIsomorphicEffect } from "@mantine/hooks";
import { useState } from "react";
import useIsomorphicLayoutEffect from "./useIsomorphicLayoutEffect";

export default function useLocation() {
  const [locationData, setLocationData] = useState<URL | undefined>();

  const [location, setLocation] = useState(
    typeof window !== "undefined" ? window.location.pathname : "",
  );
  const [oldLocation, setOldLocation] = useState(location);

  useIsomorphicLayoutEffect(() => {
    const observable = () => document.location.pathname;

    let oldValue = observable();
    const observer = new MutationObserver(() => {
      const newValue = observable();
      const href = window?.location?.href;
      const url = new URL(href);
      setLocationData(url);

      if (oldValue !== newValue) {
        setLocation(newValue);
        setOldLocation(oldValue);

        oldValue = newValue;
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
    };
  }, []);

  return { location, oldLocation, locationData };
}
