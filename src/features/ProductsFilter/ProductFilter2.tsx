"use client";
import PrimaryButton from "@/components/elements/buttons/PrimaryButton";
import Select from "@/components/elements/inputs/Select";
import RangeInput from "./RangeInput";
import Tabs from "./Tabs";
import { ITabItem } from "./Tabs/Tab";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { nextFetch } from "@/library/utils/next-fetch";

export const filterData: ITabItem[] = [
  {
    id: "primary",
    title: "Primary",
    query: "primary",
    filterSuffix: "",
    value: 7,
  },
  {
    id: "secondary",
    title: "Secondary",
    query: "secondary",
    filterSuffix: "",
    value: 2,
  },
  {
    id: "rental",
    title: "Rental",
    query: "rental",
    filterSuffix: "",
    value: 3,
  },
];

export const InfilterData: ITabItem[] = [
  {
    id: "residential",
    title: "Residential",
    query: "residential",
    filterSuffix: "",
    value: 4,
  },
  {
    id: "commercial",
    title: "Commercial",
    query: "commercial",
    filterSuffix: "",
    value: 5,
  },
  {
    id: "resale",
    title: "Resale",
    query: "resale",
    filterSuffix: "",
    value: 6,
  },
  {
    id: "new-launch",
    title: "New Launch",
    query: "new-launch",
    filterSuffix: "",
    value: 6,
  },
  {
    id: "under-construction",
    title: "Under Construction",
    query: "under-construction",
    filterSuffix: "",
    value: 8,
  },
  {
    id: "ready-to-move",
    title: "Ready to Move",
    query: "ready-to-move",
    filterSuffix: "",
    value: 7,
  },
  {
    id: "upcoming",
    title: "Upcoming",
    query: "upcoming",
    filterSuffix: "",
    value: 9,
  },
];

interface ICountryProps {
  propertyType: {
    value: string;
    label: string;
  }[];
  country?: string;
}

const ProductsFilter2 = ({ propertyType, country = "uae" }: ICountryProps) => {
  const router = useRouter();
  const activeFilterData = country === "in" ? InfilterData : filterData;

  const [activeTab, setActiveTab] = useState<string | number>("primary");
  const [selectedPropertyType, setSelectedPropertyType] = useState<{
    label: string;
    value: string;
  } | null>(null);
  const [selectedBedrooms, setSelectedBedrooms] = useState<{
    label: string;
    value: string;
  } | null>(null);
  const [minimumPrice, setMinimumPrice] = useState<number | null>(0);
  const [maximumPrice, setMaximumPrice] = useState<number | null>(null);

  const [selectedCurrency, setSelectedCurrency] = useState<string>(
    country == "in" ? "INR" : "AED",
  );

  const [minimumPriceInCurrency, setMinimumPriceInCurrency] = useState<
    number | null
  >(null);
  const [maximumPriceInCurrency, setMaximumPriceInCurrency] = useState<
    number | null
  >(null);

  const fetchConvertedPrice = async (
    from: string,
    to: string,
    amount: number,
    setConvertedPrice: (value: number | null) => void,
  ) => {
    try {
      const res = await nextFetch<any>(
        `v1/auth/convert-currency?from=${from}&to=${to}&amount=${amount}`,
        {
          next: {
            revalidate: 60, // Cache for 60 seconds
          },
        },
      );
      if (res?.converted_amount) {
        setConvertedPrice(res.converted_amount);
      } else {
        setConvertedPrice(null);
      }
    } catch (error) {
      console.error("Failed to fetch converted price:", error);
      setConvertedPrice(null);
    }
  };

  const handleTabClick = (data?: ITabItem) => {
    if (!data) return;
    setActiveTab(data.id);
  };

  const bedroomOptions = Array.from({ length: 10 }, (_, i) => ({
    value: (i + 1).toString(),
    label: (i + 1).toString() ?? "",
  }));

  return (
    <div className="rounded-md border border-theme-gray p-5">
      <div>
        <div className="relative !z-0 mb-4">
          <Tabs
            activeTab={activeTab}
            onTabClick={handleTabClick}
            data={activeFilterData}
          />
        </div>

        <div className="flex w-full flex-wrap items-center gap-3 md:gap-4 lg:flex-nowrap lg:items-end">
          <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:w-full">
            <Select
              label="Property type"
              options={[{ value: "", label: "Show All" }, ...propertyType]}
              labelClassName="text-theme-light-golden"
              containerClassName="w-full lg:w-full shrink-0"
              value={selectedPropertyType}
              onChange={(option) => setSelectedPropertyType(option)}
            />

            <Select
              label="Bedrooms"
              labelClassName="text-theme-light-golden"
              containerClassName="w-full lg:w-full shrink-0"
              options={[{ value: "", label: "Show All" }, ...bedroomOptions]}
              value={selectedBedrooms}
              onChange={(option) => setSelectedBedrooms(option)}
            />
          </div>

          <div className="grid w-full grid-cols-2 gap-0 md:grid-cols-2 lg:w-full">
            <RangeInput>
              <RangeInput.Label title="Currency" />
              <RangeInput.Input
                prefix="Min"
                placeholder="0"
                value={
                  country == "in"
                    ? selectedCurrency === "INR"
                      ? (minimumPriceInCurrency ?? undefined)
                      : (minimumPrice ?? undefined)
                    : selectedCurrency === "AED"
                      ? (minimumPriceInCurrency ?? undefined)
                      : (minimumPrice ?? undefined)
                }
                onChange={(e) => {
                  setMinimumPrice(Number(e.target.value));
                  if (
                    (country == "in" && selectedCurrency === "INR") ||
                    (country == "uae" && selectedCurrency === "AED")
                  ) {
                    setMinimumPriceInCurrency(Number(e.target.value));
                  }
                }}
              />
            </RangeInput>

            <RangeInput>
              <div className="w-full max-w-full overflow-x-scroll md:overflow-hidden">
                <RangeInput.Tabs className="w-full min-w-fit" align="right">
                  {country == "in" ? (
                    <>
                      <RangeInput.Tabs.Tab
                        label="INR"
                        value={"INR"}
                        currentValue={selectedCurrency}
                        onClick={() => setSelectedCurrency("INR")}
                      />
                      <RangeInput.Tabs.Tab
                        label="AED"
                        value={"AED"}
                        currentValue={selectedCurrency}
                        onClick={() => {
                          fetchConvertedPrice(
                            country == "in" ? "INR" : "AED",
                            "AED",
                            minimumPriceInCurrency ?? 0,
                            setMinimumPrice,
                          );
                          fetchConvertedPrice(
                            country == "in" ? "INR" : "AED",
                            "AED",
                            maximumPriceInCurrency ?? 0,
                            setMaximumPrice,
                          );
                          setSelectedCurrency("AED");
                        }}
                      />
                      <RangeInput.Tabs.Tab
                        label="USD"
                        value="USD"
                        currentValue={selectedCurrency}
                        onClick={() => {
                          fetchConvertedPrice(
                            country == "in" ? "INR" : "AED",
                            "USD",
                            minimumPriceInCurrency ?? 0,
                            setMinimumPrice,
                          );

                          fetchConvertedPrice(
                            country == "in" ? "INR" : "AED",
                            "USD",
                            maximumPriceInCurrency ?? 0,
                            setMaximumPrice,
                          );

                          setSelectedCurrency("USD");
                        }}
                      />
                    </>
                  ) : (
                    <>
                      <RangeInput.Tabs.Tab
                        label="AED"
                        value="AED"
                        currentValue={selectedCurrency}
                        onClick={() => {
                          fetchConvertedPrice(
                            country == "in" ? "INR" : "AED",
                            "AED",
                            minimumPriceInCurrency ?? 0,
                            setMinimumPrice,
                          );

                          fetchConvertedPrice(
                            country == "in" ? "INR" : "AED",
                            "AED",
                            maximumPriceInCurrency ?? 0,
                            setMaximumPrice,
                          );

                          setSelectedCurrency("AED");
                        }}
                      />
                      <RangeInput.Tabs.Tab
                        label="USD"
                        value="USD"
                        currentValue={selectedCurrency}
                        onClick={() => {
                          fetchConvertedPrice(
                            country == "in" ? "INR" : "AED",
                            "USD",
                            minimumPriceInCurrency ?? 0,
                            setMinimumPrice,
                          );

                          fetchConvertedPrice(
                            country == "in" ? "INR" : "AED",
                            "USD",
                            maximumPriceInCurrency ?? 0,
                            setMaximumPrice,
                          );

                          setSelectedCurrency("USD");
                        }}
                      />
                      <RangeInput.Tabs.Tab
                        label="INR"
                        value="INR"
                        currentValue={selectedCurrency}
                        onClick={() => {
                          fetchConvertedPrice(
                            country == "in" ? "INR" : "AED",
                            "INR",
                            minimumPriceInCurrency ?? 0,
                            setMinimumPrice,
                          );
                          fetchConvertedPrice(
                            country == "in" ? "INR" : "AED",
                            "INR",
                            maximumPriceInCurrency ?? 0,
                            setMaximumPrice,
                          );

                          setSelectedCurrency("INR");
                        }}
                      />
                    </>
                  )}
                </RangeInput.Tabs>
              </div>

              <RangeInput.Input
                prefix="Max"
                placeholder="0"
                containerClassName="border-l-0"
                value={
                  country == "in"
                    ? selectedCurrency === "INR"
                      ? (maximumPriceInCurrency ?? undefined)
                      : (maximumPrice ?? undefined)
                    : selectedCurrency === "AED"
                      ? (maximumPriceInCurrency ?? undefined)
                      : (maximumPrice ?? undefined)
                }
                onChange={(e) => {
                  setMaximumPrice(Number(e.target.value));
                  if (
                    (country == "in" && selectedCurrency === "INR") ||
                    (country == "uae" && selectedCurrency === "AED")
                  ) {
                    setMaximumPriceInCurrency(Number(e.target.value));
                  }
                }}
              />
            </RangeInput>
          </div>

          <div className="mt-1 flex w-full shrink-0 flex-col gap-4 md:flex-row lg:mt-8 lg:w-auto">
            <PrimaryButton
              className="!w-full !py-[11px] !text-sm !font-normal md:w-auto"
              onClick={() =>
                router.push(
                  `${country == "uae" ? "" : country + "/"}properties?is_front_section=${
                    activeFilterData.find((item) => item.id === activeTab)
                      ?.value ?? ""
                  }&propertyType=${selectedPropertyType?.value ?? ""}&bedrooms=${
                    selectedBedrooms?.value ?? ""
                  }&min_price=${minimumPrice ?? ""}&max_price=${
                    maximumPrice ?? ""
                  }&from_currency=${selectedCurrency}`,
                )
              }
            >
              Show Projects
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsFilter2;
