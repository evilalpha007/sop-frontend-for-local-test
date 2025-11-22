import qs from "query-string";

type TGenerateQueryString = <T extends {} | null | undefined | void>(
  args: T | null | undefined | void,
  options?: qs.StringifyOptions,
) => {
  queryString: string;
};

export const generateQueryString: TGenerateQueryString = (args, options) => {
  if (!args) {
    return { queryString: "" };
  }

  let queryString = qs.stringify(args, options);
  queryString = queryString ? `?${queryString}` : "";

  return { queryString };
};
