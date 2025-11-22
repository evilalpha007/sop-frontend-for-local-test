"use client";
import Typography from "@/components/elements/texts/Typography";
import { usePathname } from "next/navigation";

export default function TruncatedName({ name }: { name?: string }) {
  const truncated = (text: string, length: number) => {
    if (text.length > length) {
      return `${text.slice(0, length)}...`;
    }
    return text;
  };

  const pathName = usePathname();

  if (pathName.includes("our-team")) {
    return (
      <>
        <Typography
          as="h3"
          className="mb-1 hidden text-2xl font-light text-theme-light-golden md:block"
        >
          {truncated(name || "", 12)}
        </Typography>
        <Typography
          as="h3"
          className="mb-1 block text-2xl font-light text-theme-light-golden md:hidden"
        >
          {truncated(name || "", 15)}
        </Typography>
      </>
    );
  }

  return (
    <>
      <Typography
        as="h3"
        className="mb-1 block text-2xl font-light text-theme-light-golden"
      >
        {truncated(name || "", 20)}
      </Typography>
    </>
  );
}
