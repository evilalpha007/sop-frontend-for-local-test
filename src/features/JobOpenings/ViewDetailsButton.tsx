import PrimaryButton from "@/components/elements/buttons/PrimaryButton";
import Link from "next/link";

interface IViewDetailsButtonProps {
  slug?: string;
  country?: string;
}

const ViewDetailsButton = ({ slug, country }: IViewDetailsButtonProps) => {
  return (
    <PrimaryButton
      className="h-full w-[90%] text-nowrap bg-theme-off-white bg-opacity-20 py-1.5 text-sm font-light text-white hover:bg-theme-off-white/30 sm:py-3 md:py-3"
      asChild
    >
      <Link href={country ? `/${country}/careers/${slug}` : `/careers/${slug}`}>
        View Job Details
      </Link>
    </PrimaryButton>
  );
};

export default ViewDetailsButton;
