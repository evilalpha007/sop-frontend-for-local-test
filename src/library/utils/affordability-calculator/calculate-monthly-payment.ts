export const convertToValidNumber = (value: unknown): number => {
  try {
    if (!value) {
      return 0;
    }

    if (typeof value === "number") {
      if (Number.isNaN(value)) {
        console.warn("Value is NaN, returning 0");
        return 0;
      }

      return value;
    }

    if (typeof value === "string") {
      const parsedValue = Number(value);
      if (Number.isNaN(parsedValue)) {
        console.warn("Value is NaN, returning 0");
        return 0;
      }

      return parsedValue;
    }

    if (typeof value === "boolean") {
      return value ? 1 : 0;
    }

    console.warn(
      `Unsupported value type for conversion: ${value}. Returning 0`,
    );
    return 0;
  } catch (error) {
    console.error(
      `Error while converting value to number: ${error}. Returning 0`,
    );
    return 0;
  }
};

export const getIsNumberWithinPercentageRange = (
  value: unknown,
  mode: "0 to 1" | "0 to 100" = "0 to 1",
): boolean => {
  const validNumber = convertToValidNumber(value);
  if (mode === "0 to 100") {
    return validNumber >= 0 && validNumber <= 100;
  }

  return validNumber >= 0 && validNumber <= 1;
};

export const getValidParentage = (
  value: unknown,
  defaultValue: number = 0.5,
): {
  isValid: boolean;
  value: number;
} => {
  try {
    if (typeof value !== "number" && !value) {
      console.error(`Invalid percentage value: ${value} is empty`);
      return {
        isValid: false,
        value: defaultValue,
      };
    }

    if (typeof value === "number") {
      if (Number.isNaN(value)) {
        console.error(`Invalid percentage value: ${value} is not a number`);
        return {
          isValid: false,
          value: defaultValue,
        };
      }

      if (getIsNumberWithinPercentageRange(value, "0 to 1")) {
        return {
          isValid: true,
          value,
        };
      }

      if (getIsNumberWithinPercentageRange(value, "0 to 100")) {
        return {
          isValid: true,
          value: value / 100,
        };
      }

      return {
        isValid: false,
        value: defaultValue,
      };
    }

    if (typeof value === "string") {
      const hasPercentageInString = value.includes("%");
      // includes % symbol in the string
      if (!hasPercentageInString) {
        const numberValue = Number(value);

        if (Number.isNaN(numberValue)) {
          console.error(`Invalid percentage value: ${value} is not a number`);
          return {
            isValid: false,
            value: defaultValue,
          };
        }

        if (getIsNumberWithinPercentageRange(numberValue, "0 to 1")) {
          return {
            isValid: true,
            value: numberValue,
          };
        }

        if (getIsNumberWithinPercentageRange(numberValue, "0 to 100")) {
          return {
            isValid: true,
            value: numberValue / 100,
          };
        }

        console.warn(
          `Invalid percentage value: ${value} is not between 0 and 1 or 0 and 100 or 0% and 100%`,
          "Cannot convert to a valid percentage value automatically thus failing",
        );
        return {
          isValid: false,
          value: defaultValue,
        };
      }

      const numberValue = Number(value.replace("%", "").trim());
      const isParsablePercentage =
        hasPercentageInString && !Number.isNaN(numberValue);

      if (!isParsablePercentage) {
        console.error(
          `Invalid percentage value: ${value} is not parsable as a number`,
        );

        return {
          isValid: false,
          value: defaultValue,
        };
      }

      if (getIsNumberWithinPercentageRange(numberValue, "0 to 1")) {
        return {
          isValid: true,
          value: numberValue,
        };
      }

      if (getIsNumberWithinPercentageRange(numberValue, "0 to 100")) {
        return {
          isValid: true,
          value: numberValue / 100,
        };
      }

      return {
        isValid: false,
        value: defaultValue,
      };
    }

    return {
      isValid: false,
      value: defaultValue,
    };
  } catch (error) {
    console.error("Error while checking if value is a percentage:", error);
    return {
      isValid: false,
      value: defaultValue,
    };
  }
};

type TCalculateMonthlyPayment = (props: {
  monthlyIncome?: string | number | null;
  monthlyExpense?: string | number | null;
  incomeThreshold?: string | number | null;
  expenseLimitPercentage?: string | number | null;
  maxPossiblePaymentPercentage?: string | number | null;
  maxPaymentReductionRate?: string | number | null;
}) => {
  isAffordable: boolean;
  monthlyPayment: number;
  message?: string;
};

export const calculateMonthlyPayment: TCalculateMonthlyPayment = ({
  monthlyExpense = 0,
  monthlyIncome = 0,
  incomeThreshold = 10000,
  expenseLimitPercentage = 0.5,
  maxPossiblePaymentPercentage = 0.5,
  maxPaymentReductionRate = 0.5,
}) => {
  try {
    const valid = {
      monthlyIncome: convertToValidNumber(monthlyIncome),
      monthlyExpense: convertToValidNumber(monthlyExpense),
      incomeThreshold: convertToValidNumber(incomeThreshold),
      expenseLimitPercentage: getValidParentage(expenseLimitPercentage).value,
      maxPossiblePaymentPercentage: getValidParentage(
        maxPossiblePaymentPercentage,
      ).value,
      maxPaymentReductionRate: getValidParentage(maxPaymentReductionRate).value,
    };
    //  // console.log("🚀 ~ valid:", valid);

    const remainingIncome: number = valid.monthlyIncome - valid.monthlyExpense;
    const currentBalancePercentage: number = valid.monthlyIncome
      ? remainingIncome / valid.monthlyIncome
      : 0;
    //  // console.log("🚀 ~ currentExpensePercentage:", currentBalancePercentage);

    if (
      // safety checks
      valid.monthlyIncome <= 0 ||
      valid.monthlyExpense < 0 ||
      valid.maxPossiblePaymentPercentage < 0 ||
      valid.maxPossiblePaymentPercentage > 1 ||
      valid.expenseLimitPercentage < 0 ||
      valid.expenseLimitPercentage > 1 ||
      valid.maxPaymentReductionRate < 0 ||
      valid.maxPaymentReductionRate > 1
    ) {
      return {
        isAffordable: false,
        monthlyPayment: 0,
        message: "Invalid input values",
      };
    }

    if (
      // logical checks
      valid.monthlyIncome < valid.incomeThreshold ||
      currentBalancePercentage <= 0 ||
      currentBalancePercentage <= valid.expenseLimitPercentage
    ) {
      return {
        isAffordable: false,
        monthlyPayment: 0,
        message: "Income is below threshold or expense is too high",
      };
    }

    const maxPossibleMonthlyPayment: number =
      valid.monthlyIncome * valid.maxPossiblePaymentPercentage;
    const reductionOfPayment: number = Math.ceil(
      valid.monthlyExpense * valid.maxPaymentReductionRate,
    );
    const monthlyPayment: number =
      maxPossibleMonthlyPayment - reductionOfPayment;

    return {
      isAffordable: true,
      monthlyPayment,
    };
  } catch (error) {
    console.error("Error while calculating monthly payment:", error);
    return {
      isAffordable: false,
      monthlyPayment: 0,
      message: "Error while calculating monthly payment",
    };
  }
};

//  // console.log(
//   "calculateMonthlyPayment: ",
//   calculateMonthlyPayment({
//     monthlyIncome: 0,
//     monthlyExpense: 0,
//   }),
// );
