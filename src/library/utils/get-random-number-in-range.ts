type TGetRandomInRangeProps = {
  min?: number;
  max?: number;
};
export const getRandomNumberInRange = ({
  min = 0,
  max = 0,
}: TGetRandomInRangeProps): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
