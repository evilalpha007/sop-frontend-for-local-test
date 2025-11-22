import Section from "@/components/blocks/Section";
import Typography from "@/components/elements/texts/Typography";
import Locations from "./Locations";
import { ILocationItemProps } from "./Locations/LocationItem";

interface ILocationListProps {
  locations?: Omit<ILocationItemProps, "index">[] | null;
  title?: string | null;
  subtitle?: string | null;
  locationListTitle?: string | null;
  locationMapUrl?: string | null;
}

const LocationList = ({
  title,
  subtitle,
  locationListTitle,
  locations,
  locationMapUrl,
}: ILocationListProps) => {
  return (
    <Section.Container className="bg-theme-dark-blue py-12 md:py-16">
      <div className="mb-10 text-center">
        <Typography
          as="h2"
          className="mb-3 text-xl font-light text-theme-light-golden md:text-4xl lg:text-3xl"
        >
          {title}
        </Typography>
        <Typography
          as="p"
          className="mx-auto max-w-2xl text-[17px] font-light text-theme-off-white/80 md:text-base"
        >
          {subtitle}
        </Typography>
      </div>

      <div className="flex flex-col overflow-hidden rounded-xl bg-theme-black/80 shadow-lg md:flex-row">
        {/* Locations List */}
        <div className="flex-1 p-6 md:p-8 lg:p-10">
          <Typography
            as="h3"
            className="mb-6 font-raleway text-xl font-medium text-theme-light-golden md:text-2xl"
          >
            {locationListTitle}
          </Typography>
          
          <div className="divide-y divide-theme-dark-golden/30">
            <Locations data={locations} />
          </div>
        </div>

        {/* Map Container */}
        <div className="flex-1">
          <div className="h-full w-full">
            <iframe
              className="h-80 w-full md:h-full"
              src={
                locationMapUrl ??
                "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.3960139561837!2d55.284438200000004!3d25.1898642!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f69c9bf7c6f77%3A0xf31d6e658d6e649f!2sSilver%20Oak%20Properties!5e0!3m2!1sen!2sbd!4v1737053494135!5m2!1sen!2sbd"
              }
              loading="lazy"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </Section.Container>
  );
};

export default LocationList;