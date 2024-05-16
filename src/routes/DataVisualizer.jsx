import TransactionProvider, {
  useTransactionContext,
} from "../components/TransactionContext.jsx";

import React, { useState, useRef, useEffect } from "react";
import { Chart as ChartJS, scales } from "chart.js/auto";

import { Bar, Doughnut } from "react-chartjs-2";

ChartJS.register();
export default function DataVisualizer({ activeTab }) {
  const { transactions, setTransactions } = useTransactionContext();
  const containerRef = useRef(null);

  return (
    <div
      className={activeTab === "home" ? "w-1/2" : "" + "flex flex-col h-full"}
      style={{ height: `calc(100vh - 100px)` }}
    >
      <h1 className="text-4xl font-bold mb-4">Transaction Chart</h1>
      {transactions.length <= 0 && "Please enter transactions to visualize"}
      <div className="w-full ">
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
                    " rgba(39, 245, 152, 0.8)",
                    "rgba(39, 192, 245, 0.8)",
                    "rgba(192, 255, 57, 0.8)",
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
