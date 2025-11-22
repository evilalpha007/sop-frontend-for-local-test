import Typography from "@/components/elements/texts/Typography";

const ActiveOl = () => {
  return (
    <div className="flex items-end gap-3.5">
      <Typography
        as="h4"
        className="text-[65px] font-light text-theme-off-white text-opacity-20 md:text-[63px]"
      >
        1.
      </Typography>

      <div>
        <Typography
          as="h5"
          className="mb-2 text-sm font-normal text-theme-light-golden md:mb-2.5 md:text-xl"
        >
          Speak to our mortgage experts
        </Typography>

        <Typography
          as="p"
          className="text-[11px] font-light text-theme-off-white md:text-sm"
        >
          We take time to understand your home buying goals and financial needs
          to identify the best mortgage options for you.
        </Typography>
      </div>
    </div>
  );
};

export default ActiveOl;
