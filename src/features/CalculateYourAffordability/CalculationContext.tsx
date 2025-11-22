"use client";
import React, { createContext, ReactNode, useContext, useState } from "react";

interface EmployeeType {
  label: string;
  value: string;
}

interface CalculationContextType {
  employeeType: EmployeeType | undefined;
  setEmployeeType: React.Dispatch<
    React.SetStateAction<EmployeeType | undefined>
  >;
  monthlyIncome: string;
  setMonthlyIncome: React.Dispatch<React.SetStateAction<string>>;
  monthlyDebt: string;
  setMonthlyDebt: React.Dispatch<React.SetStateAction<string>>;
  citizenType: string;
  setCitizenType: React.Dispatch<React.SetStateAction<string>>;
}

const CalculationContext = createContext<CalculationContextType>(
  {} as CalculationContextType,
);

export const CalculationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [employeeType, setEmployeeType] = React.useState<EmployeeType>();
  const [monthlyIncome, setMonthlyIncome] = React.useState<string>("");
  const [monthlyDebt, setMonthlyDebt] = React.useState<string>("");
  const [citizenType, setCitizenType] = React.useState<string>("20%");

  const value = {
    employeeType,
    setEmployeeType,
    monthlyIncome,
    setMonthlyIncome,
    monthlyDebt,
    setMonthlyDebt,
    citizenType,
    setCitizenType,
  };

  return (
    <CalculationContext.Provider value={value}>
      {children}
    </CalculationContext.Provider>
  );
};

export const useCalculationContext = () => {
  return useContext(CalculationContext);
};
