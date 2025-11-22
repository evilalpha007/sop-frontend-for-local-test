import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export const getDistanceFromNow = (
  date: dayjs.ConfigType | undefined | null,
  withoutSuffix?: boolean,
): string => {
  const formattedDistanceToNow = dayjs(date).fromNow(withoutSuffix);
  return formattedDistanceToNow;
};

// console.log("🚀 ~ getDistanceFromNow: ", getDistanceFromNow(new Date()));
