import Button from "@/components/elements/buttons/Button";
import Typography from "@/components/elements/texts/Typography";

interface ICloseProps {
  className?: string;
}

const Close = () => {
  return (
    <div className="absolute right-0 top-0 !z-[4] bg-theme-black bg-opacity-50 px-1.5">
      <div className="flex items-center justify-center gap-1.5">
        <Typography
          as="p"
          className="!m-0 !p-0 text-xs font-light !leading-[normal] text-white"
        >
          Ad
        </Typography>

        <Button>
          <Typography
            as="p"
            className="!m-0 !p-0 text-xs font-normal !leading-[normal] text-white"
          >
            x
          </Typography>
        </Button>
      </div>
    </div>
  );
};

export default Close;
