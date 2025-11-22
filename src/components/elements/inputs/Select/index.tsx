"use client";
import useWindowMount from "@/library/hooks/useWindowMount";
import { cn } from "@/library/utils/cn";
import { FocusEventHandler, useId, useRef } from "react";
import type {
  ActionMeta,
  GroupBase,
  MultiValue,
  OptionsOrGroups,
  SingleValue,
} from "react-select";
import SelectComponent from "react-select";

interface ISelectProps {
  options?:
    | OptionsOrGroups<
        | {
            label: string;
            value: string;
          }
        | {
            label: string;
            value: string;
          },
        GroupBase<
          | {
              label: string;
              value: string;
            }
          | {
              label: string;
              value: string;
            }
        >
      >
    | undefined;
  value?:
    | {
        label: string;
        value: string;
      }
    | MultiValue<{
        label: string;
        value: string;
      }>
    | {
        label: string;
        value: string;
      }
    | MultiValue<{
        label: string;
        value: string;
      }>
    | null
    | undefined;
  onChange?:
    | ((
        newValue: SingleValue<{
          label: string;
          value: string;
        }>,
        actionMeta: ActionMeta<{
          label: string;
          value: string;
        }>,
      ) => void)
    | undefined;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  isDisabled?: boolean;
  isLoading?: boolean;
  isMulti?: boolean;
  label?: string;
  placeholder?: React.ReactNode;
  labelClassName?: string;
  containerClassName?: string;
}

const handleFocus = (selectRef: React.MutableRefObject<any>) => () =>
  selectRef.current?.focus();

const Select = ({
  label,
  labelClassName,
  containerClassName,
  isMulti,
  placeholder = "Select an option",
  ...restProps
}: ISelectProps) => {
  const { isMounted } = useWindowMount();
  const selectRef = useRef<any>(null);
  const formId = useId();

  return (
    <div className={cn(containerClassName)}>
      {!!label && (
        <label
          className={cn(
            "mb-1 inline-block text-[12px] font-medium text-theme-off-white sm:mb-2 sm:text-sm",
            labelClassName,
          )}
          htmlFor={formId}
          onClick={handleFocus(selectRef)}
        >
          {label}
        </label>
      )}

      {isMounted && (
        <SelectComponent
          {...restProps}
          id={formId}
          ref={selectRef}
          placeholder={placeholder}
          classNames={{
            control(props) {
              return `!bg-transparent text-nowrap !p-0.5 !text-sm !text-theme-off-white !font-normal !font-raleway !rounded-none w-full !border-theme-off-white ${props.isFocused ? "!ring-0 !outline-none" : ""}`;
            },
            menu() {
              return `!text-sm !text-theme-off-white !font-normal !font-raleway !rounded-none !border-theme-off-white !bg-theme-black`;
            },
            option(props) {
              return `!text-sm !text-theme-off-white !font-normal !font-raleway !bg-transparent hover:!text-theme-off-white hover:!bg-theme-light-golden/50 ${props.isSelected ? "!bg-theme-off-golden" : ""}`;
            },
            input(props) {
              return `!text-sm !text-theme-off-white !font-normal !font-raleway placeholder:!text-theme-off-white`;
            },
            placeholder(props) {
              return `!text-sm !text-theme-off-white !font-normal !font-raleway`;
            },
            singleValue(props) {
              return `!text-sm !text-theme-off-white !font-normal !font-raleway`;
            },

            indicatorSeparator() {
              return "hidden";
            },
            dropdownIndicator(props) {
              return `!text-sm !text-theme-off-white !font-normal !font-raleway [&_svg]:!w-4`;
            },
            loadingIndicator(props) {
              return `!text-sm !text-theme-off-white !font-normal !font-raleway`;
            },
          }}
        />
      )}
    </div>
  );
};

export default Select;
