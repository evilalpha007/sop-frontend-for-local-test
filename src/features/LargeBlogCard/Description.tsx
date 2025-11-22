import Typography from "@/components/elements/texts/Typography";
import { cn } from "@/library/utils/cn";
import Link from "next/link";

interface IDescriptionProps {
  description?: string;
  link?: string | null;
}

const Description = ({ description, link }: IDescriptionProps) => {
  return (
    <div>
      <div className="relative mt-3">
        <Typography
          as="p"
          className="text-xs font-normal not-italic leading-5 text-white"
        >
          {description}
        </Typography>

        <div className="absolute bottom-0 right-3 flex items-center">
          {/* <span className="h-5 w-12 bg-[linear-gradient(270deg,#232223_23.26%,rgba(35,34,35,0.00)_142.86%)]" /> */}
          <span className="h-5 w-12 bg-theme-black" />

          <Link
            href={link || "#"}
            className={cn(
              "bg-[#232122]# z-[1] bg-theme-black text-[9px] font-medium text-theme-light-golden sm:text-xs",
            )}
          >
            Read All
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Description;
