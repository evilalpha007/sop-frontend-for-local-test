import Section from "@/components/blocks/Section";
import OutlineButton from "@/components/elements/buttons/OutlineButton";
import NextImage from "@/components/elements/images/NextImage";
import Typography from "@/components/elements/texts/Typography";
import Link from "next/link";
import DubaiMarinaSlider from "./DubaiMarinaSlider";
import parse from "html-react-parser";

const DubaiMarina = ({ developerSection }: { developerSection: any }) => {
  return (
    <Section.Container>
      <div className="grid grid-cols-1 items-center justify-center gap-7 md:grid-cols-2">
        {/* info */}
        <div className="order-2 flex w-full flex-col items-start justify-start md:order-2">
          <Typography className="max-w-[400px border-b-2 border-theme-light-golden pb-5 text-2xl font-light text-theme-off-white lg:text-4xl">
            {developerSection?.developer_section_title}
          </Typography>
          <Typography as="div" className="mt-5 text-sm font-light text-theme-off-white/80 md:text-[16px]">
            {parse(developerSection?.developer_section_description ?? "")}
          </Typography>
          <br />
          <OutlineButton className="w-full max-w-full px-16 md:w-fit">
            <Link href={`${developerSection?.developer_button_link}`}>
              {developerSection?.developer_button_text ?? "Explore"}
            </Link>
          </OutlineButton>
        </div>
        {/* slider */}
        <div className="order-1 mb-5 flex w-full flex-col items-center justify-center md:order-2 md:mb-0 md:px-5">
          <DubaiMarinaSlider
            images={developerSection?.developer_slider_images}
          />
        </div>
      </div>
    </Section.Container>
  );
};

export default DubaiMarina;
