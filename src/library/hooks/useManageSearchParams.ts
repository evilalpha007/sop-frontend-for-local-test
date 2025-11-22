import { NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

type TState = {
  [key: string]: any;
};

const handleReplace = ({
  replace,
  options,
  pathName,
  query,
}: {
  replace?: (href: string, options?: NavigateOptions) => void;
  options?: NavigateOptions | null | undefined | void;
  pathName?: string | null | undefined;
  query?: string;
}): void => {
  try {
    if (!pathName) {
      throw new Error("PathName is required, it is missing");
    }
    const { scroll = false, ...restOptions }: NavigateOptions = options || {};
    const newOptions = { ...restOptions, scroll };
    const queryStr = query ? `?${query}` : "";

    return replace?.(`${pathName}${queryStr}`, newOptions);
  } catch (error) {
    console.info("Failed to replace error: ", error);
  }
};

interface ICallbackProps {
  params?: URLSearchParams;
  replace?: (href: string, options?: NavigateOptions) => void;
  pathName?: string | null;
}

const handleDeleteAParam = <T>({
  params,
  replace,
  pathName,
}: ICallbackProps) => {
  return (
    paramName: keyof T,
    options?: NavigateOptions | null | undefined | void,
  ): void => {
    try {
      if (paramName === undefined || paramName === null || paramName === "") {
        throw new Error("ParamName is required, it is missing");
      }

      params?.delete?.(String(paramName));
      handleReplace?.({
        replace,
        options,
        pathName,
        query: params?.toString?.(),
      });
    } catch (error) {
      console.info("Failed to delete a param by key error: ", error);
    }
  };
};

const handleRemoveAllParam = ({
  params,
  replace,
  pathName,
}: ICallbackProps) => {
  return (options?: NavigateOptions | void | undefined): void => {
    try {
      params?.forEach((_, key) => {
        try {
          if (key === undefined || key === null || key === "") {
            throw new Error("Key is required, it is missing");
          }

          params?.delete?.(key);
        } catch (error) {
          console.info("Failed to remove a param of all params error: ", error);
        }
      });

      handleReplace?.({
        replace,
        options,
        pathName,
        query: params?.toString?.(),
      });
    } catch (error) {
      console.info("Failed to remove all params error: ", error);
    }
  };
};

const handleGetAParamValue = <T>({ params }: ICallbackProps) => {
  return <U extends keyof T>(key: U): Partial<T>[U] | undefined => {
    try {
      if (
        key === undefined ||
        key === null ||
        key === "" ||
        !params?.has(String(key))
      ) {
        throw new Error("Key is required, it is missing or param is not found");
      }

      const value = params?.get(String(key));
      const parsedValue = JSON.parse(value ?? "") as Partial<T>[U];
      return parsedValue;
    } catch (error) {
      console.info("Failed to get a value by key error: ", error);
      return undefined;
    }
  };
};

const handleGetAllParamValue = <T>({ params }: ICallbackProps) => {
  return (): Partial<T> => {
    try {
      const paramsObject: Partial<T> = {};

      params?.forEach((value, key) => {
        if (key === undefined || key === null || key === "") return;

        paramsObject[key as keyof T] = handleGetAParamValue<T>({ params })(
          key as keyof T,
        );
      });

      return paramsObject;
    } catch (error) {
      console.info("Failed to get all values error: ", error);
      return {};
    }
  };
};

const handleUpdateAParam = <T>({
  params,
  replace,
  pathName,
}: ICallbackProps) => {
  return ({
    key,
    value,
    options,
  }: {
    key: keyof T;
    value: any;
    options?: NavigateOptions | void | undefined | null;
  }) => {
    try {
      if (key === undefined || key === null || key === "") {
        throw new Error("Key is required, it is missing");
      }

      if (value === undefined) {
        handleDeleteAParam<T>({ params, replace, pathName })(key, options);
        return;
      }

      let stringifyValue: string = "";
      try {
        stringifyValue = JSON.stringify(value);
      } catch (error) {
        console.info("Failed to stringify a value error: ", error);
        return;
      }

      params?.set?.(String(key), stringifyValue);
      // replace?.(`${pathName}?${params?.toString()}`, options);
      handleReplace({
        replace,
        options,
        pathName,
        query: params?.toString?.(),
      });
    } catch (error) {
      console.info("Failed to update a param by key error: ", error);
    }
  };
};

const handleUpdateMultipleParam = <T>({
  params,
  replace,
  pathName,
}: ICallbackProps) => {
  return (
    paramsToUpdate: Partial<T>,
    options?: void | NavigateOptions | null | undefined,
  ): void => {
    try {
      Object.entries(paramsToUpdate ?? {})?.forEach(([key, value]) => {
        try {
          if (key === undefined || key === null || key === "") {
            throw new Error("Key is required, it is missing");
          }

          if (value === undefined) {
            handleDeleteAParam<T>({ params, replace, pathName })(
              key as keyof T,
              options,
            );
            return;
          }

          let stringifyValue: string = "";
          try {
            stringifyValue = JSON.stringify(value);
          } catch (error) {
            console.info("Failed to stringify a value error: ", error);
            return;
          }

          params?.set?.(String(key), stringifyValue);
        } catch (error) {
          console.info("Failed to manage a query param error: ", error);
        }
      });

      handleReplace?.({
        replace,
        options,
        pathName,
        query: params?.toString?.(),
      });
    } catch (error) {
      console.info("Failed to manage all query params error: ", error);
    }
  };
};

const useManageSearchParams = <T extends TState>() => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();

  const params = useMemo(
    () => new URLSearchParams(searchParams ?? ""),
    [searchParams],
  );

  return {
    getAParamValue: handleGetAParamValue<T>({ params, replace, pathName }),
    getAllParamValue: handleGetAllParamValue<T>({ params, replace, pathName }),

    deleteAParam: handleDeleteAParam<T>({
      params,
      replace,
      pathName,
    }),
    removeAllParam: handleRemoveAllParam({
      params,
      replace,
      pathName,
    }),

    updateAParam: handleUpdateAParam<T>({
      params,
      replace,
      pathName,
    }),
    updateMultipleParam: handleUpdateMultipleParam<T>({
      params,
      replace,
      pathName,
    }),
  };
};

export default useManageSearchParams;
