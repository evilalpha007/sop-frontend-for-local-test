import Typography from "@/components/elements/texts/Typography";
import Title from "./Title";

const getProcessedPercentage = async (
  percentage: number | string | null | undefined,
): Promise<number> => {
  return new Promise<number>((resolve, reject) => {
    try {
      let numberPercentage: number = Number(percentage);
      if (Number.isNaN(numberPercentage)) {
        const stringPercentage = String(percentage ?? "");
        const percentageArray = stringPercentage?.split("%");
        const percentageArrayTrimmed =
          percentageArray
            ?.map((item) => {
              const trimmedString = item.trim();
              const percentageNumber = Number(trimmedString);
              const isNotNumber = Number.isNaN(percentageNumber);
              return isNotNumber ? null : percentageNumber;
            })
            ?.filter((item) => {
              return item !== null;
            }) ?? [];
        numberPercentage = percentageArrayTrimmed?.[0] || 0;
      }

      numberPercentage = Number.isNaN(numberPercentage) ? 0 : numberPercentage;
      if (numberPercentage > 100) {
        numberPercentage = 100;
      }
      if (numberPercentage < 0) {
        numberPercentage = 0;
      }

      return resolve(numberPercentage);
    } catch (error) {
      return reject(0);
    }
  });
};

interface IGraphFeatureProps {
  title?: string;
  description?: string;
  percentage?: number | string | null;
}

const GraphFeature = async ({
  description,
  percentage,
  title,
}: IGraphFeatureProps) => {
  return (
    <div>
      <Title title={title} />

      {/* Display the percentage in a larger font with golden color */}
      <Typography className="text-4xl font-bold text-theme-light-golden">
        {percentage}
      </Typography>

      <Typography className="mt-2 text-[11px] font-light text-theme-off-white text-opacity-80 md:text-sm md:text-opacity-100">
        {description}
      </Typography>
    </div>
  );
};

export default GraphFeature;
