import {
  convertToValidNumber,
  getValidParentage,
} from "./calculate-monthly-payment";

type TMonthlyLoanRepaymentResponse = {
  isAffordable: boolean;
  monthlyPayment: number;
  message: string;
};

export const getMonthlyLoanRepayment = ({
  expenseLimitPercentage = 0.5,
  monthlyExpenses,
  monthlyIncome,
  incomeThreshold = 10000,
}: {
  monthlyIncome: number | string;
  monthlyExpenses: number | string;
  expenseLimitPercentage?: number | string;
  incomeThreshold?: string | number | null;
}): TMonthlyLoanRepaymentResponse => {
  const valid = {
    monthlyIncome: convertToValidNumber(monthlyIncome),
    monthlyExpenses: convertToValidNumber(monthlyExpenses),
    expenseLimitPercentage: getValidParentage(expenseLimitPercentage)?.value,
    incomeThreshold: convertToValidNumber(incomeThreshold),
  };

  if (
    valid.monthlyIncome <= 0 ||
    valid.monthlyExpenses < 0 ||
    valid.expenseLimitPercentage < 0 ||
    valid.expenseLimitPercentage > 1 ||
    valid.monthlyIncome < valid.incomeThreshold
  ) {
    return {
      isAffordable: false,
      monthlyPayment: 0,
      message: "You are not eligible for a loan",
    };
  }

  return {
    isAffordable: true,
    monthlyPayment: Math.ceil(
      valid?.monthlyIncome * valid?.expenseLimitPercentage -
        valid?.monthlyExpenses,
    ),
    message: "You are eligible for a loan",
  };
};

export const getMonthlyInterestRate = ({
  interest = "7.3%",
}: {
  interest: number | string;
}): number => {
  const validInterest = getValidParentage(interest)?.value;
  return validInterest / 12;
};

export const getLoanPeriodInMonth = ({
  numberOfYears = 25,
}: {
  numberOfYears: number | string;
}): number => {
  const validNumberOfYears = convertToValidNumber(numberOfYears);
  return validNumberOfYears * 12;
};

type TMaximumLoanAmountResponse = {
  isValid: boolean;
  maximumLoanAmount: number;
  message?: string;
};

export const getMaximumLoanAmount = ({
  monthlyInterestRate,
  monthlyLoanRepayment,
  loanPeriodInMonth,
}: {
  monthlyInterestRate: number | string;
  monthlyLoanRepayment: number | string;
  loanPeriodInMonth: number | string;
}): TMaximumLoanAmountResponse => {
  const valid = {
    monthlyInterestRate: getValidParentage(monthlyInterestRate)?.value,
    monthlyLoanRepayment: convertToValidNumber(monthlyLoanRepayment),
    loanPeriodInMonth: convertToValidNumber(loanPeriodInMonth),
  };
  // const tempMaxLoan = valid?.monthlyLoanRepayment / valid?.monthlyInterestRate;
  // const maximumLoanAmount = Math.floor(
  //   tempMaxLoan *
  //     (1 - Math.pow(1 + valid?.monthlyInterestRate, -loanPeriodInMonth)),
  // );

  const interestConstant = Math.pow(
    1 + valid?.monthlyInterestRate,
    valid?.loanPeriodInMonth,
  );

  const maximumLoanAmount = Math.ceil(
    (valid?.monthlyLoanRepayment * (interestConstant - 1)) /
      (valid?.monthlyInterestRate * interestConstant),
  );

  if (maximumLoanAmount <= 0) {
    return {
      isValid: false,
      maximumLoanAmount: 0,
      message: "You are not eligible for a loan",
    };
  }

  return {
    isValid: true,
    maximumLoanAmount,
    message: "You are eligible for a loan",
  };
};

type TPropertyValueReturn = {
  isValid: boolean;
  propertyValue: number;
  downPayment: number;
  message: string;
};

export const getPropertyValue = ({
  maximumLoanAmount,
  taxPercentage = "20%",
}: {
  taxPercentage?: number | string;
  maximumLoanAmount: number | string;
}): TPropertyValueReturn => {
  const valid = {
    maximumLoanAmount: convertToValidNumber(maximumLoanAmount),
    taxPercentage: getValidParentage(taxPercentage)?.value,
  };

  const propertyValue = Math.floor(
    valid?.maximumLoanAmount / (1 - valid?.taxPercentage),
  );

  const downPayment = Math.ceil(propertyValue - valid?.maximumLoanAmount);

  if (propertyValue <= 0) {
    return {
      isValid: false,
      propertyValue: 0,
      downPayment: 0,
      message: "You are not eligible for a loan",
    };
  }

  if (downPayment <= 0) {
    return {
      isValid: false,
      propertyValue: 0,
      downPayment: 0,
      message: "You are not eligible for a loan",
    };
  }

  return {
    isValid: true,
    propertyValue,
    downPayment,
    message: "You are eligible for a loan",
  };
};

export const getFees = ({
  maximumLoanAmount,
  propertyValue,
  valuationFee = 3000,
}: {
  propertyValue: number | string;
  maximumLoanAmount: number | string;
  valuationFee?: number | string;
}) => {
  const valid = {
    propertyValue: convertToValidNumber(propertyValue),
    maximumLoanAmount: convertToValidNumber(maximumLoanAmount),
    valuationFee: convertToValidNumber(valuationFee),
  };

  // const dldFee = valid?.propertyValue * getValidParentage("4%")?.value;
  // const mortgageRegistrationFee =
  //   valid?.maximumLoanAmount * getValidParentage("0.25%")?.value;
  // const bankProcessingFee =
  //   valid?.maximumLoanAmount * getValidParentage("1%")?.value;
  // const finalValuationFee = valid?.valuationFee;
  // const agencyCommission =
  //   valid?.propertyValue * getValidParentage("2%")?.value;

  if (valid.maximumLoanAmount <= 0 || valid.propertyValue <= 0) {
    return {
      totalFees: 0,
    };
  }

  // const totalFees = Math.ceil(
  //   dldFee +
  //     mortgageRegistrationFee +
  //     bankProcessingFee +
  //     finalValuationFee +
  //     agencyCommission,
  // );

  const totalFees = Math.ceil(0.06 * valid.maximumLoanAmount);
  return { totalFees };
};

export const getUpFrontCost = ({
  downPayment,
  totalFees,
}: {
  downPayment: number | string;
  totalFees: number | string;
}) => {
  const valid = {
    downPayment: convertToValidNumber(downPayment),
    totalFees: convertToValidNumber(totalFees),
  };

  return {
    upFrontCost: Math.ceil(valid?.downPayment + valid?.totalFees),
  };
};
