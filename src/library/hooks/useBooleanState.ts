import { useState } from "react";

export type TExternalState = {
  open: boolean;
  onOpenChange?: React.Dispatch<React.SetStateAction<boolean>>;
  beforeExecute?: () => void;
  afterExecute?: () => void;
};

const processSetOpen = (
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  return ({
    onOpenChange,
    beforeExecute,
    afterExecute,
  }: Partial<TExternalState> | void = {}) => {
    return () => {
      beforeExecute?.();
      onOpenChange?.(true);
      if (!onOpenChange) setIsOpen(true);
      afterExecute?.();
    };
  };
};

const processSetClose = (
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  return ({
    onOpenChange,
    beforeExecute,
    afterExecute,
  }: Partial<TExternalState> | void = {}) => {
    return () => {
      beforeExecute?.();
      onOpenChange?.(false);
      if (!onOpenChange) setIsOpen(false);
      afterExecute?.();
    };
  };
};

const processToggle = (
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  return ({
    onOpenChange,
    beforeExecute,
    afterExecute,
  }: Partial<TExternalState> | void = {}) => {
    return () => {
      beforeExecute?.();
      onOpenChange?.((prev) => !prev);
      if (!onOpenChange) setIsOpen((prev) => !prev);
      afterExecute?.();
    };
  };
};

const processSetValue = (
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  return ({
    onOpenChange,
    beforeExecute,
    afterExecute,
  }: Partial<TExternalState> | void = {}) => {
    return (value: boolean | void | undefined) => {
      // const { onOpenChange, beforeExecute, afterExecute } = props || {};
      beforeExecute?.();
      onOpenChange?.(() => !!value);
      if (!onOpenChange) setIsOpen(() => !!value);
      afterExecute?.();
    };
  };
};

export type TUseBooleanState = {
  mode?: "externalState";
  defaultValue?: boolean;
  externalStateValue?: boolean;
} | void;

const useBooleanState = (props: TUseBooleanState) => {
  const { defaultValue, externalStateValue, mode } = props || {};
  const [isOpen, setIsOpen] = useState<boolean>(!!defaultValue);

  return {
    state: mode === "externalState" ? !!externalStateValue : !!isOpen,
    setOpen: processSetOpen(setIsOpen),
    setClose: processSetClose(setIsOpen),
    toggle: processToggle(setIsOpen),
    setValue: processSetValue(setIsOpen),
    setState: setIsOpen,
  };
};

export default useBooleanState;
