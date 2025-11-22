"use client";
import { TCountry } from "@/api/get-countries";
import { TLanguageOptions } from "@/api/get-language-options";
import { TOptions } from "@/api/get-specialized-options";
import OutlineButton from "@/components/elements/buttons/OutlineButton";
import NextImage from "@/components/elements/images/NextImage";
import Select from "@/components/elements/inputs/Select";
import useManageSearchParams from "@/library/hooks/useManageSearchParams";
import { memo, useMemo } from "react";

interface IFiltersProps {
  className?: string;
}

const countryOptions = [
  { label: "India", value: "in" },
  { label: "Canada", value: "ca" },
  { label: "Dubai", value: "dubai" },
];

interface IFiltersProps {
  disabled?: boolean;
  country?: string;
  specializationOptions: TOptions;
  languageOptions: TLanguageOptions;
  countries: TCountry[] | null | undefined;
}

const Filters = ({
  disabled,
  country,
  languageOptions,
  specializationOptions,
  countries,
}: IFiltersProps) => {
  const { updateAParam, deleteAParam, getAllParamValue } =
    useManageSearchParams<{
      specialized: string;
      language: string;
      country: string;
      page: string;
      limit: string;
    }>();
  const { specialized, language } = getAllParamValue();
  const selectedSpecializationValue = useMemo(
    () =>
      specializationOptions?.find((option) => {
        return (
          !!option.value &&
          !!specialized &&
          String(option?.value) === String(specialized)
        );
      }),
    [specializationOptions, specialized],
  );

  const selectedLanguageValue = languageOptions?.find((option) => {
    return (
      !!option.value && !!language && String(option?.value) === String(language)
    );
  });

  const countryOptions: TOptions = useMemo(
    () =>
      countries?.map((country) => ({
        label: (
          <NextImage
            key={country?.id}
            src={country?.flag || ""}
            alt={country?.code || "country flag"}
            width={30}
            height={30}
            className="w-6"
            disableBlur
          />
        ) as any,
        value: country.code || "",
      })) ?? [],
    [countries],
  );

  const selectedCountryValue = countryOptions?.find((option) => {
    return (
      !!option.value && !!country && String(option?.value) === String(country)
    );
  });

  return (
    <div
      // className="mx-auto mb-9 grid w-full max-w-2xl gap-4 sm:grid-cols-2 md:grid-cols-4"
      className="mb-9 flex w-full flex-wrap justify-center gap-4"
    >
      <Select
        placeholder="Country"
        options={countryOptions}
        value={selectedCountryValue}
        onChange={(option) => {
          updateAParam({
            key: "country",
            value: option?.value,
          });
        }}
        isDisabled={disabled}
      />

      <Select
        placeholder="Specialization"
        options={specializationOptions}
        value={selectedSpecializationValue}
        onChange={(option) => {
          // console.log("🚀 ~ Filters ~ option: ", option);

          updateAParam({
            key: "specialized",
            value: option?.value,
          });
        }}
      />

      <Select
        placeholder="Language"
        options={languageOptions}
        value={selectedLanguageValue}
        onChange={(option) => {
          updateAParam({
            key: "language",
            value: option?.value,
          });
        }}
      />

      {(!!specialized || !!language || !!country) && (
        <OutlineButton
          onClick={() => {
            deleteAParam("specialized");
            deleteAParam("language");
            deleteAParam("country");
          }}
          className="text-sm sm:text-sm"
        >
          Clear Filters
        </OutlineButton>
      )}
      {/* <PrimaryButton>Search</PrimaryButton> */}
    </div>
  );
};

export default memo(Filters);
