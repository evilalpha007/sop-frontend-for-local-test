import PrimaryButton from "@/components/elements/buttons/PrimaryButton";
import NextImage from "@/components/elements/images/NextImage";
import { headers } from "next/headers";
import Link from "next/link";

const NotFound = () => {
  const headersList = headers();
  const pathname = headersList.get("x-invoke-path") || "";
  console.log("pathname", pathname);
  return (
    <div className="flex h-full min-h-screen w-full items-center justify-center bg-theme-black p-20">
      <div>
        <NextImage
          src="/svg-icons/not-found/404.svg"
          alt="404"
          width={743}
          height={395}
          className="mx-auto mb-[60px] h-full w-full max-w-[743px]"
        />

        <h1 className="mb-3 text-center text-[40px] font-semibold capitalize not-italic leading-[120%] text-white">
          Ops! Page Not 
        </h1>

        <p className="mx-auto mb-7 w-full max-w-[458px] text-center text-base font-light not-italic leading-6 text-white">
          The page you are looking for might have been removed had its name
          changed or is temporarily unavailable.
        </p>

        <div className="flex w-full flex-col items-center">
          <PrimaryButton type="button" color="primary" asChild>
            <Link href="/">Back To Homepage</Link>
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
