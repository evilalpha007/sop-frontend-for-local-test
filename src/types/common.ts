export type TMeta = {
  from: number | undefined | null;
  last_page: number | undefined | null;
  to: number | undefined | null;
  total: number | undefined | null;
  per_page: number | undefined | null;
  current_page: number | undefined | null;
};

export type TResponse<T> =
  | {
      status?: string;
      message?: string;
      response_code?: number;
      data?: T | null | undefined;
    }
  | null
  | undefined;

export type TPaginationResponse<T> =
  | {
      status?: string;
      message?: string;
      response_code?: number;
      data?:
        | ({
            data: T | null | undefined;
          } & TMeta)
        | null
        | undefined;
    }
  | null
  | undefined;
