"use client";
import PrimaryButton from "@/components/elements/buttons/PrimaryButton";
import {
  getFees,
  getLoanPeriodInMonth,
  getMaximumLoanAmount,
  getMonthlyInterestRate,
  getPropertyValue,
  getUpFrontCost,
} from "@/library/utils/affordability-calculator";
import { calculateMonthlyPayment } from "@/library/utils/affordability-calculator/calculate-monthly-payment";
import { useState } from "react";
import { useCalculationContext } from "./CalculationContext";
import SubmitDialog from "./MortgageCalculator/SubmitDialog";
import TextHeadRow from "./TextHeadRow";
import TextInfoRow from "./TextInfoRow";

const Summary = ({}) => {
  const [popup, setPopup] = useState(false);
  const {  monthlyDebt, monthlyIncome, citizenType } =
    useCalculationContext();

  const { isAffordable, monthlyPayment } = calculateMonthlyPayment({
    monthlyIncome,
    monthlyExpense: monthlyDebt,
  });
  const loanPeriodInMonth = getLoanPeriodInMonth({ numberOfYears: 25 });
  const monthlyInterestRate = getMonthlyInterestRate({ interest: "7.3%" });
  const { maximumLoanAmount } = getMaximumLoanAmount({
    loanPeriodInMonth,
    monthlyInterestRate,
    monthlyLoanRepayment: monthlyPayment,
  });
  const { propertyValue, downPayment } = getPropertyValue({
    maximumLoanAmount,
    taxPercentage: citizenType,
  });
  const { totalFees } = getFees({
    maximumLoanAmount,
    propertyValue,
  });
  const { upFrontCost } = getUpFrontCost({
    downPayment,
    totalFees,
  });
  //  // console.log("🚀 ~ Summary ~ monthlyPayment:", { propertyValue, downPayment });

  if (!isAffordable && monthlyIncome !== "") {
    return (
      <div className="w-full !flex-[100%] flex-grow p-2 sm:p-0 md:!flex-[40%]">
        <h3 className="px-[45px] text-center font-raleway text-sm font-medium not-italic leading-[17px] text-white sm:text-[22px] sm:leading-[26px]">
          Unfortunately, you haven&apos;t met the eligibility critaia
        </h3>

        <p className="mt-4 px-6 pb-[35px] text-center font-raleway text-[12px] font-medium not-italic leading-5 text-white opacity-50 sm:text-sm">
          The UAE&apos;s minimum salary requirement of AED 10,000 is not met.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="w-full !flex-[100%] flex-grow p-2 sm:p-0 md:!flex-[40%]">
        <div>
          <TextHeadRow
            title="Home Affordability"
            description={`AED ${propertyValue?.toLocaleString()}`}
            className="sm:mt-[18px]"
          />

          <div className="w-full border-b border-b-theme-off-white border-opacity-70" />
        </div>

        <div>
          <TextInfoRow
            title="Upfront cost"
            description={`AED ${upFrontCost?.toLocaleString()}`}
            className="sm:mt-[25px]"
          />
          <TextInfoRow
            title="+ Downpayment"
            description={`AED ${downPayment?.toLocaleString()}`}
            className="pl-6"
          />
          <TextInfoRow
            title="+ Fee"
            description={`AED ${totalFees?.toLocaleString()}`}
            className="pl-6"
          />

          <div className="mt-[11px] h-0 w-full border-b border-b-theme-off-white border-opacity-70 sm:mt-[20px]" />

          <div className="mt-[13px] space-y-3.5 sm:mt-6">
            <TextInfoRow
              title="Maximum eligibility financing"
              description={`AED ${maximumLoanAmount?.toLocaleString()}`}
            />

            <TextInfoRow
              title="Monthly payment"
              description={`AED ${monthlyPayment?.toLocaleString()}`}
            />

            <PrimaryButton
              onClick={() => setPopup(true)}
              className="mt-7 w-full sm:text-sm"
            >
              {"Let's get started"}
            </PrimaryButton>
          </div>
        </div>
      </div>
      <SubmitDialog popup={popup} setPopup={setPopup} />
    </>
  );
};

export default Summary;
// (1+r)^n= 6.16853536171
// (1+r)^n -1 = 5.16853536171
