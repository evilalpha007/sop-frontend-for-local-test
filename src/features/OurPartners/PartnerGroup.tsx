import Partner from "./Partner";

const data = [
  {
    id: crypto.randomUUID(),
    image: "/images/our-partners/1.svg",
  },
  {
    id: crypto.randomUUID(),
    image: "/images/our-partners/2.svg",
  },
  {
    id: crypto.randomUUID(),
    image: "/images/our-partners/3.svg",
  },
  {
    id: crypto.randomUUID(),
    image: "/images/our-partners/4.svg",
  },
  {
    id: crypto.randomUUID(),
    image: "/images/our-partners/5.svg",
  },
  {
    id: crypto.randomUUID(),
    image: "/images/our-partners/6.svg",
  },
  {
    id: crypto.randomUUID(),
    image: "/images/our-partners/7.svg",
  },
  {
    id: crypto.randomUUID(),
    image: "/images/our-partners/8.svg",
  },
];

const PartnerGroup = () => {
  return (
    <div>
      <div className="hidden sm:block">
        <div className="!grid !grid-cols-3 gap-1.5 sm:!grid-cols-4 sm:!gap-4">
          {data?.map((partner) => (
            <Partner
              key={partner?.id}
              id={partner?.id}
              image={partner?.image}
            />
          ))}
        </div>
      </div>

      <div className="block sm:hidden">
        <div className="!grid !grid-cols-3 gap-1.5 sm:!grid-cols-4 sm:!gap-4">
          {data
            ?.slice(0, 6)
            ?.map((partner) => (
              <Partner
                key={partner?.id}
                id={partner?.id}
                image={partner?.image}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default PartnerGroup;
