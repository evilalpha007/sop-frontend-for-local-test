import Typography from "@/components/elements/texts/Typography";

interface ITitleProps {
  title?: string | number | null;
}

const Title = ({ title }: ITitleProps) => (
  <Typography
    as="h2"
    className="mb-2 text-center text-xl font-light text-theme-light-golden md:text-3xl"
  >
    {title}
  </Typography>
);

export default Title;
