export type TFetcher = <T>(
  url: string | URL | globalThis.Request,
  config?: RequestInit,
) => Promise<T>;

export type TNextFetchSetup = {
  baseUrl?: string;
  token?: {
    prefix?: string;
    token?: string;
  };
  headers?: HeadersInit;
} | void;

export const fetcher: TFetcher = async (url, config) => {
  const fetchResponse = await fetch(url, config);
  //  // console.log("🚀~ fetcher:TFetcher= ~ fetchResponse: ", url);
  if (!fetchResponse?.ok) {
    // console.log('FetchResponse', fetchResponse);
    // throw new Error("Network response was not ok");
  }

  const data = await fetchResponse.json();
  return data;
};

export const nextFetchSetup = ({
  baseUrl,
  headers,
  token,
}: TNextFetchSetup = {}): TFetcher => {
  const nextFetch: TFetcher = async (url, config) => {
    const finalUrl = baseUrl ? `${baseUrl}${url}` : url;
    const finalHeaders: HeadersInit = {
      "Content-Type": "application/json",
      ...(token
        ? { Authorization: `${token?.prefix || "Bearer"} ${token?.token}` }
        : {}),
      ...headers,
      ...(config?.headers || {}),
    };

    return fetcher(finalUrl, {
      ...(config || {}),
      headers: finalHeaders,
    });
  };

  return nextFetch;
};

export const nextFetch = nextFetchSetup({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  token: {
    prefix: "Bearer",
    token: process.env.NEXT_PUBLIC_API_TOKEN,
  },
});
