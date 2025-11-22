import PrimaryButton from "@/components/elements/buttons/PrimaryButton";
import Select from "@/components/elements/inputs/Select";
import React from "react";

interface IFiltersProps {
  className?: string;
}

const Filters = () => {
  return (
    <div className="mx-auto mb-9 grid w-full max-w-xl gap-4 sm:grid-cols-2">
      <Select placeholder="Specialization" />
      <PrimaryButton>Search</PrimaryButton>
    </div>
  );
};

export default Filters;
