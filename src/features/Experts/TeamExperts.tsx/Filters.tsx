import React from "react";
import ExpertList from "../ExpertList";
import { getSpecializedOptions } from "@/api/get-specialized-options";
import { getLanguageOptions } from "@/api/get-language-options";
import { getCountries } from "@/api/get-countries";

const Filters = async ({ country, disabled }: { country?: string, disabled?: boolean }) => {
  const specializationOptions = await getSpecializedOptions();
  const languageOptions = await getLanguageOptions();
  const { countries } = await getCountries();

  return (
    <ExpertList.Filters
      languageOptions={languageOptions}
      specializationOptions={specializationOptions}
      countries={countries}
      country={country}
      disabled={disabled}
    />
  );
};

export default Filters;
