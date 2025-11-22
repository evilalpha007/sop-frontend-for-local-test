import LocationItem, { ILocationItemProps } from "./LocationItem";

// const data: Omit<ILocationItemProps, "index">[] = [
//   {
//     title: "Dubai Marina Mall – 10 minutes",
//   },
//   {
//     title: "Dubai Marina Mall – 10 minutes",
//   },
//   {
//     title: "Dubai Marina Mall – 10 minutes",
//   },
//   {
//     title: "Dubai Marina Mall – 10 minutes",
//   },
//   {
//     title: "Dubai Marina Mall – 10 minutes",
//   },
//   {
//     title: "Dubai Marina Mall – 10 minutes",
//   },
//   {
//     title: "Dubai Marina Mall – 10 minutes",
//   },
//   // {
//   //   title: "Dubai Marina Mall – 10 minutes",
//   // },
//   // {
//   //   title: "Dubai Marina Mall – 10 minutes",
//   // },
//   // {
//   //   title: "Dubai Marina Mall – 10 minutes",
//   // },
// ];

interface ILocationsProps {
  data?: Omit<ILocationItemProps, "index">[] | null;
}

const Locations = ({ data }: ILocationsProps) => {
  return (
    <ul className="h-full max-h-[80%] space-y-2 overflow-y-auto md:max-h-[80%]">
      {data?.map((item, index) => (
        <LocationItem key={index} index={index} title={item?.title} />
      ))}
    </ul>
  );
};

export default Locations;
