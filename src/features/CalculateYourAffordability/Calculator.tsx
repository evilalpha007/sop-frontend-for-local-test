"use client";
import { CalculationProvider } from "./CalculationContext";
import CalculationForm from "./CalculationForm";
import Summary from "./Summary";

const Calculator = () => {
  return (
    <CalculationProvider>
      <div className="mt-5 flex h-full flex-col items-center justify-between !gap-[25px] sm:gap-[30px] md:mt-12 lg:!flex-row">
        <CalculationForm />
        <div className="w-full border-b border-b-theme-off-white border-opacity-50 lg:h-[360px] lg:w-0 lg:border-b-0 lg:border-r lg:border-r-theme-off-white" />
        <Summary />
      </div>
    </CalculationProvider>
  );
};

export default Calculator;
