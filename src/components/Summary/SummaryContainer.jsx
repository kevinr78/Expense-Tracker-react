import React, { useState, useEffect } from "react";
import Summary from "./Summary.jsx";
import TransactionProvider, {
  useTransactionContext,
} from "../TransactionContext.jsx";
import calculateExpenses from "../Summary/calculateExpense.js";

export default function SummaryContainer() {
  const { transactions, setTransactions } = useTransactionContext();

  const [summary, setSummary] = useState([]);
  const url = "http://localhost:3000/getExpenseSummary";

  const fetchData = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();

      setSummary(data);
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
      </>
      {/*   )} */}
    </div>
  );
}
