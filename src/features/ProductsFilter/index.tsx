"use client";
import Button from "@/components/elements/buttons/Button";
import PrimaryButton from "@/components/elements/buttons/PrimaryButton";
import Dropdown from "@/components/elements/dropdown/Dropdown";
import NextImage from "@/components/elements/images/NextImage";
import Select from "@/components/elements/inputs/Select";
import Typography from "@/components/elements/texts/Typography";
import ToggleContextProvider from "@/library/contexts/ToggleContextProvider";
import { IFiltersProps } from "../Properties/Filters";
import RangeInput from "./RangeInput";
import Tabs from "./Tabs";
import { ITabItem } from "./Tabs/Tab";
import env from "@/config/env";
import {
  getPropertyTypes,
  TGetPropertyTypesArgs,
} from "@/api/get-property-types";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { nextFetch } from "@/library/utils/next-fetch";
import { filterData, InfilterData } from "./ProductFilter2";

interface ICountryProps {
  propertyType: {
    value: string;
    label: string;
  }[];
  country?: string;
  selectedPropertyType?: string | null;
  selectedBedrooms?: string | null;
  selectedMinPrice?: string | null;
  selectedMaxPrice?: string | null;
  selectedIsFrontSection?: string | null;
  selectedMinSize?: string | null;
  selectedMaxSize?: string | null;
  from_currency?: string | null;
}

const ProductsFilter = ({
  propertyType,
  country = "uae",
  selectedPropertyType: paramsSelectedPropertyType,
  selectedBedrooms: paramsSelectedBedrooms,
  selectedMinPrice,
  selectedMaxPrice,
  selectedIsFrontSection,
  selectedMinSize,
  selectedMaxSize,
  from_currency: selectedCurrency,
}: ICountryProps) => {
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
            revalidate: env.NEXT_PUBLIC_API_CACHE_TIME_IN_SECONDS,
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

  const router = useRouter();
  const bedroomOptions = Array.from({ length: 10 }, (_, i) => ({
    value: (i + 1).toString() ?? "",
    label: (i + 1).toString() ?? "",
  }));

  const [minimumPriceInCurrency, setMinimumPriceInCurrency] = useState<
    number | null
  >(selectedMinPrice ? parseFloat(selectedMinPrice) : null);
  const [maximumPriceInCurrency, setMaximumPriceInCurrency] = useState<
    number | null
  >(selectedMaxPrice ? parseFloat(selectedMaxPrice) : null);

  const activeFilterData = country == "in" ? InfilterData : filterData;

  const [activeTab, setActiveTab] = useState<string | number>(
    activeFilterData.find((item) => item.value == selectedIsFrontSection)
      ?.value ?? "all",
  );
  const [selectedPropertyType, setSelectedPropertyType] = useState<{
    label: string;
    value: string;
  } | null>(
    propertyType.find((item) => item.value == paramsSelectedPropertyType) ??
      null,
  );
  const [selectedBedrooms, setSelectedBedrooms] = useState<{
    label: string;
    value: string;
  } | null>(
    bedroomOptions.find((item) => item.value == paramsSelectedBedrooms) ?? null,
  );
  const [minimumArea, setMinimumArea] = useState<number | null>(
    selectedMinSize ? parseFloat(selectedMinSize) : null,
  );
  const [maximumArea, setMaximumArea] = useState<number | null>(
    selectedMaxSize ? parseFloat(selectedMaxSize) : null,
  );

  const [minimumPrice, setMinimumPrice] = useState<number | null>(
    selectedMinPrice ? parseFloat(selectedMinPrice) : 0,
  );
  const [maximumPrice, setMaximumPrice] = useState<number | null>(
    selectedMaxPrice ? parseFloat(selectedMaxPrice) : null,
  );

  const [currency, setCurrency] = useState<string>(
    selectedCurrency ?? (country == "in" ? "INR" : "AED"),
  );

  const handleTabClick = (data?: ITabItem) => {
    if (!data) return;
    if (data.value !== undefined) {
      // console.log("Tab clicked:", data.title, "| Value:", data.value);
      setActiveTab(data.value);
      
      const newUrl = `?is_front_section=${data.value}&propertyType=${selectedPropertyType?.value ?? ""}&bedrooms=${
        selectedBedrooms?.value ?? ""
      }&min_price=${minimumPrice ?? ""}&max_price=${
        maximumPrice ?? ""
      }&min_area=${minimumArea ?? ""}&max_area=${
        maximumArea ?? ""
      }&from_currency=${currency}`;
      
      // console.log(" Navigating to:", newUrl);
      
      // Immediately navigate with the new is_front_section value
      router.push(newUrl);
    }
  };

  return (
    <div className="px-4 md:px-0">
      <div>
        <div className="relative !z-0 mb-4">
          <Tabs
            activeTab={activeTab}
            data={activeFilterData}
            onTabClick={handleTabClick}
          />
        </div>

        <div className="flex w-full flex-wrap items-center gap-3 md:gap-4 lg:flex-nowrap lg:items-end">
          <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:w-full">
            <Select
              label="Property type"
              options={propertyType}
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

          <div className="grid w-full grid-cols-2 lg:w-full">
            <RangeInput>
              <RangeInput.Label title="Square Size" />
              <RangeInput.Input
                prefix="Min"
                placeholder="0"
                value={minimumArea ?? 0}
                onChange={(e) => setMinimumArea(parseInt(e.target.value))}
              />
            </RangeInput>

            <RangeInput>
              <RangeInput.Tabs align="right">
                <RangeInput.Tabs.Tab label="SQFT" />
              </RangeInput.Tabs>

              <RangeInput.Input
                prefix="Max"
                placeholder="0"
                containerClassName="border-l-0"
                value={maximumArea ?? 0}
                onChange={(e) => setMaximumArea(parseInt(e.target.value))}
              />
            </RangeInput>
          </div>

          <div className="grid w-full grid-cols-2 gap-0 md:grid-cols-2 lg:w-full">
            <RangeInput>
              <RangeInput.Label title="Currency" />
              <RangeInput.Input
                prefix="Min"
                placeholder="0"
                value={
                  country == "in"
                    ? currency == "INR"
                      ? (minimumPriceInCurrency ?? undefined)
                      : (minimumPrice ?? undefined)
                    : currency == "AED"
                      ? (minimumPriceInCurrency ?? undefined)
                      : (minimumPrice ?? undefined)
                }
                onChange={(e) => {
                  setMinimumPrice(parseInt(e.target.value));

                  if (
                    (country == "in" && currency == "INR") ||
                    (country == "uae" && currency == "AED")
                  ) {
                    setMinimumPriceInCurrency(Number(e.target.value));
                  }
                }}
                readonly={
                  country == "in" ? currency !== "INR" : currency !== "AED"
                }
              />
            </RangeInput>

            <RangeInput>
              <div className="w-full max-w-full overflow-x-scroll md:overflow-hidden">
                <RangeInput.Tabs className="w-full min-w-fit" align="right">
                  {country == "in" ? (
                    <>
                      <RangeInput.Tabs.Tab
                        label="INR"
                        value="INR"
                        currentValue={currency}
                        onClick={() => {
                          fetchConvertedPrice(
                            "INR",
                            "INR",
                            minimumPriceInCurrency ?? 0,
                            setMinimumPrice,
                          );
                          fetchConvertedPrice(
                            "INR",
                            "INR",
                            maximumPriceInCurrency ?? 0,
                            setMaximumPrice,
                          );
                          setCurrency("INR");
                        }}
                      />
                      <RangeInput.Tabs.Tab
                        label="AED"
                        value="AED"
                        currentValue={currency}
                        onClick={() => {
                          fetchConvertedPrice(
                            "INR",
                            "AED",
                            minimumPriceInCurrency ?? 0,
                            setMinimumPrice,
                          );
                          fetchConvertedPrice(
                            "INR",
                            "AED",
                            maximumPriceInCurrency ?? 0,
                            setMaximumPrice,
                          );
                          setCurrency("AED");
                        }}
                      />
                      <RangeInput.Tabs.Tab
                        label="USD"
                        value="USD"
                        currentValue={currency}
                        onClick={() => {
                          fetchConvertedPrice(
                            "INR",
                            "USD",
                            minimumPriceInCurrency ?? 0,
                            setMinimumPrice,
                          );
                          fetchConvertedPrice(
                            "INR",
                            "USD",
                            maximumPriceInCurrency ?? 0,
                            setMaximumPrice,
                          );
                          setCurrency("USD");
                        }}
                      />
                    </>
                  ) : (
                    <>
                      <RangeInput.Tabs.Tab
                        label="AED"
                        value="AED"
                        currentValue={currency}
                        onClick={() => {
                          fetchConvertedPrice(
                            "AED",
                            "AED",
                            minimumPriceInCurrency ?? 0,
                            setMinimumPrice,
                          );
                          fetchConvertedPrice(
                            "AED",
                            "AED",
                            maximumPriceInCurrency ?? 0,
                            setMaximumPrice,
                          );
                          setCurrency("AED");
                        }}
                      />
                      <RangeInput.Tabs.Tab
                        label="USD"
                        value="USD"
                        currentValue={currency}
                        onClick={() => {
                          fetchConvertedPrice(
                            "AED",
                            "USD",
                            minimumPriceInCurrency ?? 0,
                            setMinimumPrice,
                          );
                          fetchConvertedPrice(
                            "AED",
                            "USD",
                            maximumPriceInCurrency ?? 0,
                            setMaximumPrice,
                          );
                          setCurrency("USD");
                        }}
                      />
                      <RangeInput.Tabs.Tab
                        label="INR"
                        value="INR"
                        currentValue={currency}
                        onClick={() => {
                          fetchConvertedPrice(
                            "AED",
                            "INR",
                            minimumPriceInCurrency ?? 0,
                            setMinimumPrice,
                          );
                          fetchConvertedPrice(
                            "AED",
                            "INR",
                            maximumPriceInCurrency ?? 0,
                            setMaximumPrice,
                          );
                          setCurrency("INR");
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
                    ? currency == "INR"
                      ? (maximumPriceInCurrency ?? undefined)
                      : (maximumPrice ?? undefined)
                    : currency == "AED"
                      ? (maximumPriceInCurrency ?? undefined)
                      : (maximumPrice ?? undefined)
                }
                onChange={(e) => {
                  setMaximumPrice(parseInt(e.target.value));
                  console.log(country, currency, e.target.value);
                  if (
                    (country == "in" && currency == "INR") ||
                    (country == "uae" && currency == "AED")
                  ) {
                    console.log("here");
                    setMaximumPriceInCurrency(Number(e.target.value));
                  }
                }}
                readonly={
                  country == "in" ? currency !== "INR" : currency !== "AED"
                }
              />
            </RangeInput>
          </div>

          <div className="mt-1 flex w-full shrink-0 gap-2 lg:mt-8 lg:w-auto">
            <PrimaryButton
              className="!w-full !py-2.5 text-sm md:w-auto"
              onClick={() =>
                router.push(
                  `?is_front_section=${
                    activeFilterData.find((item) => item.value == activeTab)
                      ?.value
                  }&propertyType=${selectedPropertyType?.value ?? ""}&bedrooms=${
                    selectedBedrooms?.value ?? ""
                  }&min_price=${minimumPrice ?? ""}&max_price=${
                    maximumPrice ?? ""
                  }&min_area=${minimumArea ?? ""}&max_area=${
                    maximumArea ?? ""
                  }&from_currency=${currency}`,
                )
              }
            >
              Show Projects
            </PrimaryButton>
            <Button
              className="transition-linear flex w-fit flex-col items-center justify-center border border-theme-off-white p-2.5 !ease-in-out active:scale-95 md:w-fit"
              onClick={() => {
                setSelectedPropertyType(null);
                setSelectedBedrooms(null);
                setMinimumArea(null);
                setMaximumArea(null);
                setMinimumPrice(null);
                setMaximumPrice(null);
                router.push(`?is_front_section=0`);
              }}
            >
              <NextImage
                src="/svg-icons/property-details/anti-clockwise.svg"
                alt="Anti clockwise icon"
                width={18}
                height={19}
                className="size-[17.2px] cursor-pointer"
                disableBlur
              />
            </Button>
          </div>
        </div>
      </div>

      <div className="mb-6 mt-[70px] flex flex-col items-center gap-[30px] md:flex-row"></div>
    </div>
  );
};

export default ProductsFilter;
