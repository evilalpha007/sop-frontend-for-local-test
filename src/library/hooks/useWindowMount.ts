import { useEffect, useState } from "react";

const useWindowMount = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  return { isMounted };
};

export default useWindowMount;
