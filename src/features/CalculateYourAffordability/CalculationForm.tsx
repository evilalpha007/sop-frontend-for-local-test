"use client";
import Input from "@/components/elements/inputs/Input";
import Select from "@/components/elements/inputs/Select";
import Typography from "@/components/elements/texts/Typography";
import { useCalculationContext } from "./CalculationContext";
import { IFilterItem } from "./Filter";
import FilterTab from "./FilterTab";

const filterTabOptions: IFilterItem[] = [
  { id: crypto.randomUUID(), title: "UAE Resident", value: "25%" },
  { id: crypto.randomUUID(), title: "UAE National", value: "20%" },
  { id: crypto.randomUUID(), title: "Non Resident", value: "40%" },
];

const employeeTypeOptions = [
  { label: "Salaried", value: "Salaried" },
  { label: "Self Employed", value: "Self Employed" },
];

const CalculationForm = () => {
  const {
    employeeType,
    monthlyDebt,
    monthlyIncome,
    setEmployeeType,
    setMonthlyDebt,
    setMonthlyIncome,
    citizenType,
    setCitizenType,
  } = useCalculationContext();

  return (
    <div className="w-full flex-[100%] flex-grow p-2 sm:w-[40%] sm:flex-[40%] sm:p-0">
      <Typography
        as="p"
        className="!mb-[5px] text-[12px] font-medium text-theme-light-golden sm:!mb-[9px] sm:text-sm sm:text-theme-green-gray"
      >
        Residency Status
      </Typography>

      <div className="relative mb-3.5 w-full text-nowrap sm:mb-8">
        <FilterTab
          data={filterTabOptions}
          onFilterClick={(tabData) => {
            setCitizenType(tabData?.value ?? "20%");
          }}
          activeTab={citizenType}
        />
      </div>

      <div>
        <Select
          label="Employment Type"
          labelClassName="text-theme-light-golden inline-block sm:text-theme-green-gray text-[12px] font-medium"
          options={employeeTypeOptions}
          value={employeeType}
          onChange={(value) =>
            setEmployeeType(
              value
                ? {
                    label: value?.value ?? "",
                    value: value?.value ?? "",
                  }
                : undefined,
            )
          }
        />

        <div className="mt-2 grid grid-cols-2 gap-x-3 gap-y-[9px] sm:mt-8 sm:gap-x-4 sm:gap-y-8">
          <Input
            label="Monthly Income"
            placeholder="AED 2000"
            labelClassName="text-theme-light-golden inline-block sm:text-theme-green-gray text-[12px] font-medium"
            className="bg-transparent"
            value={monthlyIncome}
            onChange={(e) => setMonthlyIncome(e.target.value)}
          />

          <Input
            label="Monthly Debt"
            placeholder="AED 0"
            labelClassName="text-theme-light-golden inline-block sm:text-theme-green-gray text-[12px] font-medium"
            className="bg-transparent"
            value={monthlyDebt}
            onChange={(e) => setMonthlyDebt(e.target.value)}
          />
        </div>
      </div>

      <Typography
        as="p"
        className="mt-3.5 text-[12px] font-normal leading-[21px] text-theme-off-white text-opacity-90 sm:mt-[43px] md:text-[12px]"
      >
        In order to estimate your eligibility, each bank refers to a Stress Test
        Rate, currently averaging across banks about 7.3% (the rate used in the
        calculator). The rate varies between 6.4% and 8.5% depending on the Bank
        and its policy.
      </Typography>
    </div>
  );
};

export default CalculationForm;
