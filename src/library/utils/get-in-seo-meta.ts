import { Metadata } from "next";

type TGetSeoMetaProps = Metadata | void;

export const getInSeoMeta = (props: TGetSeoMetaProps): Metadata => {
  const {
    title = "Silver Oak Real Estate INDIA | Exclusive Homes & Investment Opportunities",
    applicationName = "Silver Oak Properties",
    description = "Silver Oak Properties India - Your trusted partner for luxury real estate, buying, selling, and investing in prime properties across INDIA.",
    manifest = "/assets/fav-icon/site.webmanifest",
    icons = {
      icon: "/assets/fav-icon/favicon-32x32.png",
      apple: "/assets/fav-icon/apple-touch-icon.png",
    },
    ...restProps
  } = props || {};
  const finalTitle = title ? `${title} ` : "Silver Oak Real Estate INDIA | Exclusive Homes & Investment Opportunities";

  return {
    title: finalTitle,
    applicationName,
    description,
    icons,
    manifest,
    ...restProps,
  };
};
