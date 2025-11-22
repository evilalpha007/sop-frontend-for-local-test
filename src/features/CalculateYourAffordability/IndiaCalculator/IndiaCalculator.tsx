"use client";
import Section from "@/components/blocks/Section";
import OutlineButton from "@/components/elements/buttons/OutlineButton";
import PrimaryButton from "@/components/elements/buttons/PrimaryButton";
import Input from "@/components/elements/inputs/Input";
import Typography from "@/components/elements/texts/Typography";
import { useCallback, useEffect, useState } from "react";
import { getTrackBackground, Range } from "react-range";
import SubmitDialog from "../MortgageCalculator/SubmitDialog";

const MIN_INCOME = 100;
const MAX_INCOME = 100000000000;
const MIN_LOAN_TENURE = 1;
const MAX_LOAN_TENURE = 30;
const MAX_INTEREST_RATE = 25;
const MAX_EMI_PERCENTAGE = 0.6;

const IndiaCalculator = () => {
  const [popup, setPopup] = useState<boolean>(false);
  const [monthlyIncome, setMonthlyIncome] = useState<string>("10000");
  const [interestRate, setInterestRate] = useState<string>("5.00");
  const [loanTenure, setLoanTenure] = useState<number>(1);
  const [otherEmiObligations, setOtherEmiObligations] = useState<number>(0);

  const [maximumEmi, setMaximumEmi] = useState<number>(0);
  const [maximumLoanAmount, setMaximumLoanAmount] = useState<number>(0);
  const [downPaymentRequired, setDownPaymentRequired] = useState<number>(0);
  const [processingFee, setProcessingFee] = useState<number>(6000);

  const [error, setError] = useState<string | null>(null);

  const calculateLoan = useCallback(() => {
    const numericIncome = parseFloat(monthlyIncome);
    const numericInterestRate = parseFloat(interestRate);

    // Validation for monthly income
    if (
      isNaN(numericIncome) ||
      numericIncome < MIN_INCOME ||
      numericIncome > MAX_INCOME
    ) {
      setError(
        `Monthly income must be between ₹${MIN_INCOME} and ₹${MAX_INCOME}`,
      );
      return;
    }

    // Validation for interest rate
    if (
      isNaN(numericInterestRate) ||
      numericInterestRate < 0 ||
      numericInterestRate > MAX_INTEREST_RATE
    ) {
      setError(`Interest rate must be between 0% and ${MAX_INTEREST_RATE}%`);
      return;
    }

    // Check if the existing EMIs exceed 60% of monthly income
    const totalEmiLimit = numericIncome * MAX_EMI_PERCENTAGE; // 60% of monthly income
    if (otherEmiObligations > totalEmiLimit) {
      setError("Your existing EMIs exceed 60% of your monthly income.");
      return;
    }

    setError(null); // Clear previous errors

    // Maximum EMI calculation (60% of monthly income minus existing obligations)
    const maxEmi = totalEmiLimit - otherEmiObligations;

    // Calculate the loan amount based on max EMI
    const monthlyRate = numericInterestRate / 100 / 12;
    const totalMonths = loanTenure * 12;

    const loanAmount =
      (maxEmi * (Math.pow(1 + monthlyRate, totalMonths) - 1)) /
      (monthlyRate * Math.pow(1 + monthlyRate, totalMonths));

    // Down payment required (10% of loan amount)
    const downPayment = loanAmount * 0.1;

    setMaximumEmi(maxEmi);
    setMaximumLoanAmount(loanAmount);
    setDownPaymentRequired(downPayment);
  }, [monthlyIncome, interestRate, loanTenure, otherEmiObligations]);

  useEffect(() => {
    calculateLoan();
  }, [calculateLoan]);

  const handleIncomeChange = (value: string) => {
    const sanitizedValue = value.replace(/\D/g, "");

    if (sanitizedValue === "") {
      setMonthlyIncome("0");
    } else {
      setMonthlyIncome(sanitizedValue);
    }
  };

  const handleIncomeBlur = () => {
    const numericValue = parseInt(monthlyIncome, 10);
    if (isNaN(numericValue) || numericValue < MIN_INCOME) {
      setMonthlyIncome(MIN_INCOME.toString());
    }
  };

  const handleInterestRateChange = (value: string) => {
    if (value.trim() === "") {
      setInterestRate("0");
      return;
    }

    const sanitizedValue = value
      .replace(/^0+(?!\.)/, "")
      .replace(/[^0-9.]/g, "")
      .match(/^(\d{1,3})(\.\d{0,3})?$/);

    if (sanitizedValue) {
      const numericValue = parseFloat(sanitizedValue[0]);
      if (!isNaN(numericValue)) {
        setInterestRate(
          numericValue > MAX_INTEREST_RATE
            ? MAX_INTEREST_RATE.toFixed(3)
            : sanitizedValue[0],
        );
      } else {
        setInterestRate("0");
      }
    }
  };

  const handleInterestRateBlur = () => {
    const numericValue = parseFloat(interestRate);
    if (isNaN(numericValue) || numericValue < 0) {
      setInterestRate("0");
    }
  };

  const handleOtherEmiObligationsChange = (value: string) => {
    const sanitizedValue = value.replace(/\D/g, "");
    setOtherEmiObligations(
      sanitizedValue === "" ? 0 : parseInt(sanitizedValue, 10),
    );
  };

  const incrementIncome = () => {
    setMonthlyIncome((prev) => String(Math.max(0, +prev + 1000)));
  };

  const decrementIncome = () => {
    setMonthlyIncome((prev) => String(Math.max(0, +prev - 1000)));
  };

  const incrementInterestRate = () => {
    setInterestRate((prev) =>
      Math.min(MAX_INTEREST_RATE, parseFloat(prev) + 0.1).toFixed(3),
    );
  };

  const decrementInterestRate = () => {
    setInterestRate((prev) => Math.max(0, parseFloat(prev) - 0.1).toFixed(3));
  };

  const formatCurrency = (value: number) => {
    return value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
  };

  return (
    <>
      <Section.Container>
        <div className="flex w-full flex-col items-center justify-center bg-[#232122] px-6 py-8 pb-10">
          <div className="mx-auto mb-5 w-full max-w-[700px] text-center">
            <Typography className="text-center text-3xl font-medium text-theme-off-white">
              Home Loan Calculator
            </Typography>
            <Typography className="mt-2 text-center text-sm font-light text-theme-off-white">
              Take the first step towards smart investment!
            </Typography>
          </div>
          <div className="mt-8 flex flex-col gap-10 lg:flex-row">
            <div className="w-full space-y-7 md:space-y-5 lg:w-1/2">
              <div className="flex flex-row items-center justify-between gap-4">
                <Input
                  label={"Monthly Income (₹)"}
                  placeholder="₹10,000"
                  type="text"
                  id="monthlyIncome"
                  className="bg-[#232122] text-lg"
                  value={monthlyIncome}
                  onChange={(e) => handleIncomeChange(e.target.value)}
                  onBlur={handleIncomeBlur}
                />
                <div className="mt-6 flex items-center justify-between gap-3 md:mt-8">
                  <OutlineButton
                    className="border-theme-off-white !py-1 !text-2xl sm:!py-1.5"
                    onClick={decrementIncome}
                  >
                    -
                  </OutlineButton>
                  <OutlineButton
                    className="border-theme-off-white !py-1 !text-2xl sm:!py-1.5"
                    onClick={incrementIncome}
                  >
                    +
                  </OutlineButton>
                </div>
              </div>

              <div className="flex flex-row items-center justify-between gap-4">
                <Input
                  label={"Interest Rate (%)"}
                  placeholder="Enter interest rate"
                  type="text"
                  id="interestRate"
                  className="bg-[#232122] text-lg"
                  value={interestRate}
                  onChange={(e) => handleInterestRateChange(e.target.value)}
                  onBlur={handleInterestRateBlur}
                />
                <div className="mt-6 flex items-center justify-between gap-3 md:mt-8">
                  <OutlineButton
                    className="border-theme-off-white !py-1 !text-2xl sm:!py-1.5"
                    onClick={decrementInterestRate}
                  >
                    -
                  </OutlineButton>
                  <OutlineButton
                    className="border-theme-off-white !py-1 !text-2xl sm:!py-1.5"
                    onClick={incrementInterestRate}
                  >
                    +
                  </OutlineButton>
                </div>
              </div>

              <div>
                <label className="mb-5 block text-[14px] font-medium text-theme-light-golden sm:mb-2 sm:text-sm">
                  Loan Tenure (Years)
                </label>
                <span className="mb-3 inline-block w-full text-right text-[14px] font-medium text-theme-light-golden sm:mb-2 sm:text-sm">
                  {loanTenure} years
                </span>
                <div className="ml-3">
                  <Range
                    step={1}
                    min={MIN_LOAN_TENURE}
                    max={MAX_LOAN_TENURE}
                    values={[loanTenure]}
                    onChange={(values) => setLoanTenure(values[0])}
                    renderTrack={({ props, children }) => (
                      <div
                        {...props}
                        style={{
                          ...props.style,
                          height: "6px",
                          width: "100%",
                          background: getTrackBackground({
                            values: [loanTenure],
                            colors: ["#ECECECB2", "#464545"],
                            min: MIN_LOAN_TENURE,
                            max: MAX_LOAN_TENURE,
                            rtl: false,
                          }),
                        }}
                      >
                        {children}
                      </div>
                    )}
                    renderThumb={({ props: { key, ...restProps } }) => (
                      <div
                        key={key}
                        {...restProps}
                        className="mx-[33px] flex h-4 w-fit min-w-[22px] items-center justify-center overflow-hidden bg-[#D9D9D9] px-0.5 text-[12px] text-theme-black"
                      >
                        {`${loanTenure} year${loanTenure > 1 ? "s" : ""}`}
                      </div>
                    )}
                  />
                </div>
              </div>
              <div className="flex flex-row items-center justify-between gap-4">
                <Input
                  label={"Other EMI Obligations (₹)"}
                  placeholder="₹0"
                  type="text"
                  id="otherEmiObligations"
                  className="bg-[#232122] text-lg"
                  value={otherEmiObligations.toString()}
                  onChange={(e) =>
                    handleOtherEmiObligationsChange(e.target.value)
                  }
                />
                {/* increase and decrease button */}
                <div className="mt-6 flex items-center justify-between gap-3 md:mt-8">
                  <OutlineButton
                    className="border-theme-off-white !py-1 !text-2xl sm:!py-1.5"
                    onClick={() =>
                      setOtherEmiObligations((prev) => Math.max(0, prev - 100))
                    }
                  >
                    -
                  </OutlineButton>
                  <OutlineButton
                    className="border-theme-off-white !py-1 !text-2xl sm:!py-1.5"
                    onClick={() =>
                      setOtherEmiObligations((prev) => Math.max(0, prev + 100))
                    }
                  >
                    +
                  </OutlineButton>
                </div>
              </div>
            </div>

            <div className="hidden h-full min-h-[320px] border-r border-theme-gray px-1 md:mt-4 lg:block"></div>
            {error ? (
              <div className="w-full space-y-7 md:mt-4 md:space-y-12 lg:w-1/2">
                <div className="flex min-h-[300px] w-full !flex-[100%] flex-grow flex-col items-center justify-center">
                  <h3 className="text-center font-raleway text-sm font-medium not-italic leading-[17px] text-white sm:text-[22px] sm:leading-[26px]">
                    Unfortunately, you haven&apos;t met the eligibility criteria
                    for a home loan
                  </h3>

                  <p className="mt-4 text-center font-raleway text-[12px] font-medium not-italic leading-5 text-white opacity-50 sm:text-sm">
                    Your existing EMIs exceed 60% of your monthly income.
                  </p>
                </div>
              </div>
            ) : (
              <div className="w-full space-y-7 md:mt-4 md:space-y-12 lg:w-1/2">
                <div className="flex flex-row justify-between gap-6">
                  <Typography className="text-sm font-normal text-theme-off-white">
                    Maximum EMI You Can Afford
                  </Typography>
                  <Typography className="text-sm font-semibold text-theme-off-white">
                    <span className="inline-block min-w-[120px] text-right">
                      ₹{formatCurrency(maximumEmi)}
                    </span>
                  </Typography>
                </div>

                <div className="flex flex-row items-start justify-between gap-6">
                  <Typography className="text-sm font-normal text-theme-off-white">
                    Maximum Loan Amount You Can Avail
                  </Typography>
                  <Typography className="text-sm font-semibold text-theme-off-white">
                    <span className="inline-block min-w-[120px] text-right">
                      ₹{formatCurrency(maximumLoanAmount)}
                    </span>
                  </Typography>
                </div>

                <div className="flex flex-row items-start justify-between gap-6">
                  <Typography className="text-sm font-normal text-theme-off-white">
                    Down Payment Required (10%)
                  </Typography>
                  <Typography className="text-sm font-semibold text-theme-off-white">
                    <span className="inline-block min-w-[120px] text-right">
                      ₹{formatCurrency(downPaymentRequired)}
                    </span>
                  </Typography>
                </div>

                <div className="flex flex-row items-start justify-between gap-6">
                  <Typography className="text-sm text-theme-light-golden">
                    Fixed Processing Fee
                  </Typography>
                  <Typography className="text-sm font-semibold text-theme-off-white">
                    <span className="inline-block min-w-[120px] text-right">
                      ₹{formatCurrency(processingFee)}
                    </span>
                  </Typography>
                </div>

                <PrimaryButton
                  onClick={() => setPopup(true)}
                  className="w-full"
                >
                  Apply for a Home Loan
                </PrimaryButton>
              </div>
            )}
          </div>
        </div>
      </Section.Container>

      <SubmitDialog popup={popup} setPopup={setPopup} />
    </>
  );
};

export default IndiaCalculator;
