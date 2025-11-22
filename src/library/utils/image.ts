// dynamicBlurDataUrl.js
const baseUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/"
    : process.env.NEXT_PUBLIC_DOMAIN;

export const toBase64 = (str: string | null | undefined) => {
  try {
    if (!str) return "";
    return typeof window === "undefined"
      ? Buffer.from(str).toString("base64")
      : window.btoa(str);
  } catch (error) {
    //  // console.log("Error in toBase64: ", error);
    return "";
  }
};

export const blurBgUrlFallback =
  "data:image/webp;base64,UklGRgACAABXRUJQVlA4WAoAAAAgAAAAFgIASAEASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDhMEQAAAC8WAlIAB1CwfpWs/4GI6H8AAA==";

export const generateBlurDataUrl = async (
  url: string | undefined | null,
  externalUrl?: boolean,
) => {
  try {
    if (!url) {
      return blurBgUrlFallback;
    }
    const fetchUrl = externalUrl
      ? `${url}&w=16&q=75`
      : `${baseUrl}/_next/image?url=${url || ""}&w=16&q=75`;
    const response = await fetch(
      fetchUrl,
      { cache: "force-cache" },
      // `${baseUrl}/_next/image?url=${url || ""}&w=16&q=75`,
    );
    const arrayBuffer = await response?.arrayBuffer();
    const base64str = Buffer?.from(arrayBuffer)?.toString("base64");

    const blurSvg = `
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 5'>
          <filter id='b' color-interpolation-filters='sRGB'>
            <feGaussianBlur stdDeviation='1' />
          </filter>
    
          <image preserveAspectRatio='none' filter='url(#b)' x='0' y='0' height='100%' width='100%' 
          href='data:image/avif;base64,${base64str}' />
        </svg>
      `;

    return `data:image/svg+xml;base64,${toBase64(blurSvg) || ""}`;
  } catch (error) {
    console.error("dynamicBlurDataUrl error: ", error);
    return blurBgUrlFallback;
  }
};
