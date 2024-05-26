import TransactionProvider, {
  useTransactionContext,
} from "../components/Providers/TransactionContext.jsx";

import React, { useState, useRef, useEffect } from "react";
import { Chart as ChartJS, scales } from "chart.js/auto";

import { Bar, Doughnut } from "react-chartjs-2";

ChartJS.register();
export default function DataVisualizer({ activeTab }) {
  const { transactions, setTransactions } = useTransactionContext();
  const containerRef = useRef(null);
  const URL = window.location.href;
  let isTransactionChartTab =
    URL.slice(URL.lastIndexOf("/") + 1) === "transactionCharts";

  const styleOption = isTransactionChartTab
    ? "w-full h-[40rem]"
    : "w-full  h-[20rem]";

  return (
    <div className=" flex flex-col w-full ">
      <h1 className="text-4xl font-bold mb-10">Transaction Chart</h1>
      {transactions.length <= 0 && "Please enter transactions to visualize"}
      <div className={styleOption}>
        {transactions.length > 0 && (
          <Doughnut
            options={{ responsive: true, maintainAspectRatio: false }}
            data={{
              labels: transactions.map((transaction) => transaction.category),
              datasets: [
                {
                  label: "Amount",
                  data: transactions.map((transaction) => transaction.amount),
                  backgroundColor: [
                    "rgba(245, 40, 145, 0.8)",
                    "rgba(39, 245, 152, 0.8)",
                    "rgba(39, 192, 245, 0.8)",
                    "rgba(192, 255, 57, 0.8)",
                    "rgba(255, 151, 112,0.8)",
                    "rgba(233, 255, 112,0.8)",
                    "rgba(255, 214, 112,0.8)",
                  ],
                },
              ],
            }}
          />
        )}
      </div>
    </div>
  );
}
