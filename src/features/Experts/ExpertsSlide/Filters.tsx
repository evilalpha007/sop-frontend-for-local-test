"use client";
import { TLanguageOptions } from "@/api/get-language-options";
import { TOptions } from "@/api/get-specialized-options";
import OutlineButton from "@/components/elements/buttons/OutlineButton";
import Select from "@/components/elements/inputs/Select";
import useManageSearchParams from "@/library/hooks/useManageSearchParams";

interface IFiltersProps {
  specializationOptions: TOptions;
  languageOptions: TLanguageOptions;
}

const Filters = ({ specializationOptions, languageOptions }: IFiltersProps) => {
  const { updateAParam, deleteAParam, getAllParamValue } =
    useManageSearchParams<{
      specialized: string;
      language: string;
    }>();
  const { specialized, language } = getAllParamValue();

  const selectedSpecializationValue = specializationOptions?.find((option) => {
    return (
      !!option.value &&
      !!specialized &&
      String(option?.value) === String(specialized)
    );
  });

  const selectedLanguageValue = languageOptions?.find((option) => {
    return (
      !!option.value && !!language && String(option?.value) === String(language)
    );
  });

  return (
    <>
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

      {(!!specialized || !!language) && (
        <OutlineButton
          onClick={() => {
            deleteAParam("specialized");
            deleteAParam("language");
          }}
          className="sm:text-sm"
        >
          Clear Filters
        </OutlineButton>
      )}
    </>
  );
};

export default Filters;
