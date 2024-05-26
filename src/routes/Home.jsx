import { useState } from "react";
import { Outlet } from "react-router-dom";

import ExpenseCTA from "../components/ExpenseCTA.jsx";
import SummaryContainer from "../components/Summary/SummaryContainer.jsx";
import TransactionHistory from "./TransactionHistory.jsx";
import DataVisualizer from "./DataVisualizer.jsx";

export default function Home({ activeTab }) {
  return (
    <>
      <div className="flex justify-center items-center">
        <SummaryContainer />
        <ExpenseCTA />
      </div>
      <div className="flex justify-evenly  mt-10 px-10 ">
        <TransactionHistory activeTab={activeTab} />
        <DataVisualizer activeTab={activeTab} />
      </div>
    </>
  );
}
