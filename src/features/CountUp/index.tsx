import { getExperience } from "@/api/get-experience";
import Section from "@/components/blocks/Section/index";
import Typography from "@/components/elements/texts/Typography";
import Card from "./Card";

interface ICountUpProps {
  className?: string;
  apiQuery?: {
    country?: string;
  };
}
const CountUpSection = async ({ className, apiQuery }: ICountUpProps) => {
  const countData = await getExperience(apiQuery);

  // if (country === "in") {
  //   return null;
  // }

  //  // console.log("🚀 ~ countData", countData);
  // console.log("apiQuery", apiQuery);

  return (
    <Section.Container className={className}>
      <div className="grid gap-x-5 gap-y-6 lg:grid-cols-2">
        {countData?.map((item) => <Card key={item.id} item={item} />)}
      </div>
      <div className="text-end">
        <Typography as="p" className="mt-8 text-end text-sm italic">
          Source - Dubai Land Department (DLD)
        </Typography>
      </div>
    </Section.Container>
  );
};

export default CountUpSection;
