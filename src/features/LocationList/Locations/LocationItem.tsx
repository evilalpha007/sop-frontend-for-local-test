import NextImage from "@/components/elements/images/NextImage";

export interface ILocationItemProps {
  title?: string;
  index: number;
}

const LocationItem = ({ index, title }: ILocationItemProps) => {
  return (
    <li className="flex items-center gap-4">
      <NextImage
        src="/svg-icons/property-details/location-pointer-map.svg"
        alt="location-pointer-map"
        width={17}
        height={18}
        className="size-[10px] shrink-0 md:size-[16.33px]"
        disableBlur
      />

      <span className="text-wrap break-words font-raleway text-[10px] font-light text-white md:text-lg">
        {title}
      </span>
    </li>
  );
};

export default LocationItem;
