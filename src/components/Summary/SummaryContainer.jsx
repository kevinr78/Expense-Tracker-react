import React, { useState, useEffect } from "react";
import Summary from "./Summary.jsx";
import TransactionProvider, {
  useTransactionContext,
} from "../Providers/TransactionContext.jsx";
import calculateExpenses from "../Summary/calculateExpense.js";

export default function SummaryContainer() {
  const { transactions, setTransactions } = useTransactionContext();

  const [summary, setSummary] = useState([]);
  const url = "http://localhost:3000/getExpenseSummary";

  const fetchData = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setSummary(data.result);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [transactions]);

  /* const expenseSummary = calculateExpenses(transactions) ?? null; */

  return (
    <div>
      <>
        <Summary
          title={"Total Income"}
          value={summary[0]?.Summary}
          desc={"Total Income"}
        />
        <Summary
          title={"Total Expense"}
          value={summary[1]?.Summary}
          desc={"Total Income"}
        />
        <Summary
          title={"Net Value"}
          value={
            summary[0]?.Summary > summary[1]?.Summary
              ? summary[0]?.Summary - summary[1]?.Summary
              : summary[1]?.Summary - summary[0]?.Summary
          }
          desc={"Net Value"}
        />
      </>
      {/*   )} */}
    </div>
  );
}
