import Typography from "@/components/elements/texts/Typography";
import parse from "html-react-parser";

interface IDescriptionProps {
  description?: string | null;
}

const Description = ({ description }: IDescriptionProps) => (
  <Typography
    as="p"
    className="mb-6 text-center text-[12px] font-light text-theme-off-white text-opacity-80 md:text-lg"
  >
    {parse(description ?? "")}
  </Typography>
);

export default Description;
