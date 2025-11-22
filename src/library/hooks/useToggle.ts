import { useCallback, useMemo, useState } from "react";

interface UseToggleReturn {
  toggleState: boolean;
  setFalse: () => void;
  setTrue: () => void;
  toggle: () => void;
  set: (value: boolean) => () => void;
}

const useToggle = (initialState: boolean = false): UseToggleReturn => {
  const [toggleState, setToggleState] = useState<boolean>(initialState);

  const setFalse = useCallback(() => {
    setToggleState(false);
  }, []);

  const setTrue = useCallback(() => {
    setToggleState(true);
  }, []);

  const toggle = useCallback(() => {
    setToggleState((prevState) => !prevState);
  }, []);

  const set = useCallback(
    (value: boolean) => () => {
      setToggleState(value);
    },
    [],
  );

  const memoizedReturnObject = useMemo(() => {
    return { toggleState, setFalse, setTrue, toggle, set };
  }, [toggleState, setFalse, setTrue, toggle, set]);

  return memoizedReturnObject;
};

export default useToggle;
