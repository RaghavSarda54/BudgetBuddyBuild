//CUSTOM HOOK
// import { useContext } from "react";

import {
  incomeCategories,
  expenseCategories,
  resetCategories,
} from "./constants/categories";

const useTransactions = (title) => {
  resetCategories();
  const categories = title === "Income" ? incomeCategories : expenseCategories;

  //filtering the categories whose amount is less than 0:
  const filteredCategories = categories.filter((c) => c.amount > 0);

  const total = 50; //for now

  const chartData = {
    datasets: [
      {
        data: filteredCategories.map((c) => c.amount),
        backgroundColor: filteredCategories.map((c) => c.color),
      },
    ],
    labels: filteredCategories.map((c) => c.type),
  };

  return { filteredCategories, total, chartData };
};

export default useTransactions;
