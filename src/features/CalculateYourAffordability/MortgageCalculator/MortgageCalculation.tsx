"use client";
import Section from "@/components/blocks/Section";
import Hr from "@/components/elements/border/Hr";
import OutlineButton from "@/components/elements/buttons/OutlineButton";
import PrimaryButton from "@/components/elements/buttons/PrimaryButton";
import Input from "@/components/elements/inputs/Input";
import Typography from "@/components/elements/texts/Typography";
import { cn } from "@/library/utils/cn";
import { useCallback, useEffect, useState } from "react";
import { getTrackBackground, Range } from "react-range";
import Title from "../../TextBlock/Title";
import SubmitDialog from "./SubmitDialog";
import SubmitMortgageDialog from "./SubmitMortgageDialog";

const MIN_ADVANCE = 20;
const MAX_ADVANCE = 80;
const MIN_DURATION = 5;
const MAX_DURATION = 25;
const MIN_LOAN_AMOUNT = 0;
const MAX_LOAN_AMOUNT = 10000000000000000000000;
const MAX_INTEREST_RATE = 100;

const MortgageCalculation = () => {
  const [popup, setPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loanPrice, setLoanPrice] = useState<string>("1200000");
  const [interestRate, setInterestRate] = useState<string>("2.49");
  const [advancePayment, setAdvancePayment] = useState<number>(20);
  const [loanDuration, setLoanDuration] = useState<number>(5);

  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [annualPayment, setAnnualPayment] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);
  const [totalInstalments, setTotalInstalments] = useState<number>(0);
  const [loanAmount, setLoanAmount] = useState<number>(0);

  const [error, setError] = useState<string | null>(null);

  const calculateMortgage = useCallback(() => {
    const numericLoanPrice = parseFloat(loanPrice);
    const numericInterestRate = parseFloat(interestRate);

    if (
      isNaN(numericLoanPrice) ||
      numericLoanPrice < MIN_LOAN_AMOUNT ||
      numericLoanPrice > MAX_LOAN_AMOUNT
    ) {
      setError(
        `Loan amount must be between AED ${MIN_LOAN_AMOUNT} and AED ${MAX_LOAN_AMOUNT}`,
      );
      return;
    }

    if (
      isNaN(numericInterestRate) ||
      numericInterestRate < 0 ||
      numericInterestRate > MAX_INTEREST_RATE
    ) {
      setError(`Interest rate must be between 0% and ${MAX_INTEREST_RATE}%`);
      return;
    }

    setError(null); // Clear previous errors

    const principal =
      numericLoanPrice - (advancePayment / 100) * numericLoanPrice;
    const monthlyRate = numericInterestRate / 100 / 12;
    const totalMonths = loanDuration * 12;

    const monthly =
      monthlyRate === 0
        ? principal / totalMonths
        : (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
          (Math.pow(1 + monthlyRate, totalMonths) - 1);

    const totalPaid = monthly * totalMonths;
    const totalInterestPaid = totalPaid - principal;

    setLoanAmount(principal);
    setMonthlyPayment(monthly);
    setAnnualPayment(monthly * 12);
    setTotalPayment(totalPaid);
    setTotalInterest(totalInterestPaid);
    setTotalInstalments(totalMonths);
  }, [loanPrice, interestRate, advancePayment, loanDuration]);

  useEffect(() => {
    calculateMortgage();
  }, [calculateMortgage]);

  const handleLoanPriceChange = (value: string) => {
    const sanitizedValue = value.replace(/\D/g, "");

    if (sanitizedValue === "") {
      setLoanPrice("0");
    } else {
      setLoanPrice(sanitizedValue);
    }
  };

  const handleLoanPriceBlur = () => {
    const numericValue = parseInt(loanPrice, 10);
    if (isNaN(numericValue) || numericValue < MIN_LOAN_AMOUNT) {
      setLoanPrice(MIN_LOAN_AMOUNT.toString());
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

  const incrementLoanPrice = () => {
    setLoanPrice((prev) => String(Math.max(0, +prev + 10000)));
  };

  const decrementLoanPrice = () => {
    setLoanPrice((prev) => String(Math.max(0, +prev - 10000)));
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

  // handle click
  const handleConfirmSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setPopup(false);
    }, 2000);
  };

  return (
    <>
      <Section.Container>
        <div className="items-center# flex w-full flex-col justify-center bg-[#232122] px-6 py-8">
          <div className="mx-auto mb-5 w-full max-w-[700px] text-center">
            <Title className="text-center text-3xl font-medium text-theme-off-white">
              Helping you find the right mortgage
            </Title>
            <Typography className="text-center text-sm font-light text-theme-off-white">
              Buying property in the UAE has never been easier. Let our trusted
              mortgage partners guide you at every step of the way.
            </Typography>
          </div>

          <div className="mt-8 flex flex-col place-content-center gap-10 lg:flex-row">
            <div className="w-full space-y-7 md:space-y-10 lg:w-1/2">
              <div className="flex flex-row items-center justify-between gap-3">
                <Input
                  label={"Property Price (AED)"}
                  placeholder="AED 1,000,000"
                  type="text"
                  id="propertyPrice"
                  className="bg-[#232122] text-lg"
                  value={loanPrice}
                  onChange={(e) => handleLoanPriceChange(e.target.value)}
                  onBlur={handleLoanPriceBlur}
                />
                <div className="mt-[27px] flex items-center justify-end gap-3">
                  <OutlineButton
                    className="border-theme-off-white !py-1 !text-2xl sm:!py-1.5"
                    onClick={decrementLoanPrice}
                  >
                    -
                  </OutlineButton>
                  <OutlineButton
                    className="border-theme-off-white !py-1 !text-2xl sm:!py-1.5"
                    onClick={incrementLoanPrice}
                  >
                    +
                  </OutlineButton>
                </div>
              </div>

              <div>
                <div className="flex w-full flex-row items-center justify-between gap-3">
                  <label
                    className={cn(
                      "mb-3 inline-block text-[14px] font-medium text-theme-light-golden sm:mb-2 sm:text-sm",
                    )}
                  >
                    Advance Payment (%)
                  </label>
                  <span className="mb-3 inline-block text-[14px] font-medium text-theme-light-golden sm:mb-2 sm:text-sm">
                    {formatCurrency((advancePayment / 100) * +loanPrice)} AED
                  </span>
                </div>
                <div className="ml-3">
                  <Range
                    step={1}
                    min={MIN_ADVANCE}
                    max={MAX_ADVANCE}
                    values={[advancePayment]}
                    onChange={(values) => setAdvancePayment(values[0])}
                    renderTrack={({ props, children }) => (
                      <div
                        {...props}
                        style={{
                          ...props.style,
                          height: "6px",
                          width: "100%",
                          background: getTrackBackground({
                            values: [advancePayment],
                            colors: ["#ECECECB2", "#464545"],
                            min: MIN_ADVANCE,
                            max: MAX_ADVANCE,
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
                        {advancePayment}%
                      </div>
                    )}
                  />
                </div>
              </div>

              <div>
                <div className="flex w-full flex-row items-center justify-between gap-3">
                  <label
                    className={cn(
                      "mb-3 inline-block text-[14px] font-medium text-theme-light-golden sm:mb-2 sm:text-sm",
                    )}
                  >
                    Loan Duration (Years)
                  </label>
                  <span className="mb-3 inline-block text-[14px] font-medium text-theme-light-golden sm:mb-2 sm:text-sm">
                    {loanDuration} years
                  </span>
                </div>

                <div className="ml-3">
                  <Range
                    step={1}
                    min={MIN_DURATION}
                    max={MAX_DURATION}
                    values={[loanDuration]}
                    onChange={(values) => setLoanDuration(values[0])}
                    renderTrack={({ props, children }) => (
                      <div
                        {...props}
                        style={{
                          ...props.style,
                          height: "6px",
                          width: "100%",
                          background: getTrackBackground({
                            values: [loanDuration],
                            colors: ["#ECECECB2", "#464545"],
                            min: MIN_DURATION,
                            max: MAX_DURATION,
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
                        {`${loanDuration} year${loanDuration > 1 ? "s" : ""}`}
                      </div>
                    )}
                  />
                </div>
              </div>

              <div className="flex w-full flex-row items-center justify-between gap-3">
                <div className="w-full">
                  <Input
                    label="Interest Rate (%)"
                    placeholder="Enter interest rate"
                    type="text"
                    id="interestRate"
                    className="bg-[#232122] text-lg"
                    value={interestRate}
                    onChange={(e) => handleInterestRateChange(e.target.value)}
                    onBlur={handleInterestRateBlur}
                  />
                </div>
                <div className="mt-[27px] flex w-fit items-center justify-end gap-3">
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
            </div>
            <div className="hidden h-full min-h-[350px] border-r border-theme-gray px-1 lg:block"></div>
            <div className="w-full lg:w-1/2">
              {error && <p className="text-sm text-red-500">{error}</p>}

              <div>
                <div className="flex justify-between">
                  <h6 className="text-sm font-normal text-theme-off-white">
                    Principal Amount
                  </h6>
                  <p className="text-right text-sm font-medium text-theme-light-golden">
                    AED {formatCurrency(loanAmount)}
                  </p>
                </div>
              </div>

              <Hr className="my-3 mb-5" />

              <div className="mb-7 mt-3 lg:mt-8">
                <div className="flex justify-between">
                  <h6 className="text-sm font-normal text-theme-off-white">
                    Total Payment ({monthlyPayment.toFixed(2)} x{" "}
                    {totalInstalments} Instalments)
                  </h6>
                  <p className="text-right text-sm font-light text-theme-off-white">
                    AED {formatCurrency(totalPayment)}
                  </p>
                </div>
              </div>

              <div className="mb-7">
                <div className="flex justify-between">
                  <h6 className="text-sm font-normal text-theme-off-white">
                    Total Interest
                  </h6>
                  <p className="text-right text-sm font-light text-theme-off-white">
                    AED {formatCurrency(totalInterest)}
                  </p>
                </div>
              </div>

              <Hr className="my-5 mt-7 lg:mt-12" />

              <div className="mb-7">
                <div className="flex justify-between">
                  <h6 className="text-sm font-normal text-theme-off-white">
                    Monthly Payment
                  </h6>
                  <p className="text-right text-sm font-light text-theme-off-white">
                    AED {formatCurrency(monthlyPayment)}
                  </p>
                </div>
              </div>

              <div className="mb-7">
                <div className="flex justify-between">
                  <h6 className="text-sm font-normal text-theme-off-white">
                    Annual Payment
                  </h6>
                  <p className="text-right text-sm font-light text-theme-off-white">
                    AED {formatCurrency(annualPayment)}
                  </p>
                </div>
              </div>

              <PrimaryButton onClick={() => setPopup(true)} className="w-full">
                Apply for Mortgage
              </PrimaryButton>
            </div>
          </div>
        </div>
      </Section.Container>
      <SubmitMortgageDialog
        popup={popup}
        setPopup={setPopup}
        mortgageData={{
          propertyPrice: loanPrice,
          advancePayment,
          loanDuration,
          interestRate,
          loanAmount,
          totalPayment,
          totalInterest,
          monthlyPayment,
          annualPayment,
        }}
      />
    </>
  );
};

export default MortgageCalculation;
