let apiCacheTime: number = Number(
  process.env.NEXT_PUBLIC_API_CACHE_TIME_IN_SECONDS,
);
apiCacheTime = Number.isNaN(apiCacheTime) ? 3600 : apiCacheTime;

const env = {
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_DOMAIN: process.env.NEXT_PUBLIC_DOMAIN,
  NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  NEXT_PUBLIC_API_TOKEN: process.env.NEXT_PUBLIC_API_TOKEN,
  NEXT_PUBLIC_API_CACHE_TIME_IN_SECONDS: apiCacheTime,
} as const;

export default env;
