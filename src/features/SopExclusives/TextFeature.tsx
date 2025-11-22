import Typography from "@/components/elements/texts/Typography";
import Title from "./Title";

interface ITextFeatureProps {
  title?: string;
  description?: string;
}

const TextFeature = ({ title, description }: ITextFeatureProps) => {
  return (
    <div>
      <Title title={title} />

      <Typography className="text-[11px] font-light text-theme-off-white text-opacity-80 md:text-base md:text-opacity-100">
        {description}
      </Typography>
    </div>
  );
};

export default TextFeature;
