import { TSlideGroupArr } from "@/api/get-our-partners";
import Partner from "./Partner";
// const data = new Array(8).fill(null);

const PartnerGroupList = ({
  data,
  mode,
}: {
  data?: TSlideGroupArr | null;
  mode: "mobile" | "desktop";
}) => {
  return (
    <>
      {/* <>{data?.map((partner, idx) => <PartnerGroup key={idx} />)}</> */}
      {mode === "mobile" &&
        data?.map((partner, idx) => {
          return (
            <div
              className="!grid !grid-cols-3 gap-1.5 md:!grid-cols-4 md:!gap-4"
              key={`mobile-${idx}`}
            >
              {partner?.map((partner) => (
                <Partner
                  key={partner?.id}
                  id={partner?.id}
                  image={partner?.image}
                  alt={partner?.alt_text}
                />
              ))}
            </div>
          );
        })}

      {mode === "desktop" &&
        data?.map((partner, idx) => {
          return (
            <div
              className="!grid !grid-cols-3 gap-1.5 md:!grid-cols-4 md:!gap-4"
              key={`desktop-${idx}`}
            >
              {partner?.map((aPartner) => {
                return (
                  <Partner
                    key={aPartner?.id}
                    id={aPartner?.id}
                    image={aPartner?.image}
                    alt={aPartner?.alt_text}
                  />
                );
              })}
            </div>
          );
        })}
    </>
  );
};

export default PartnerGroupList;
