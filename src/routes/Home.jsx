import { useState } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import AddExpenseLogo from "../assets/add-expense.svg";
import AddAccountLogo from "../assets/add-account.svg";
import CTA from "../components/CTA.jsx";
import SummaryContainer from "../components/Summary/SummaryContainer.jsx";
import TransactionHistory from "./TransactionHistory.jsx";
import DataVisualizer from "./DataVisualizer.jsx";

export default function Home({ activeTab }) {
  const [activeModal, setActiveModal] = useOutletContext();
  function showCTAmodal(e) {
    let calledModal = e.target.closest("div").dataset.id;
    window.history.replaceState(
      null,
      "New Page Title",
      `/home?cta=${calledModal}`
    );
    setActiveModal(calledModal);
    document.getElementById("my_modal_1").showModal();
  }

  return (
    <>
      <div className="flex justify-center items-center">
        <SummaryContainer />
        <CTA text="Add Account" onClick={showCTAmodal} name="add-account">
          <img className="w-8" src={AddAccountLogo} alt="" />
        </CTA>
        <CTA
          text="Add Transaction"
          onClick={showCTAmodal}
          name="add-transaction"
        >
          <img className="w-8" src={AddExpenseLogo} alt="" />
        </CTA>
        {/* <ExpenseCTA /> */}
      </div>
      <div className="flex justify-evenly  mt-10 px-10 ">
        <TransactionHistory activeTab={activeTab} />
        <DataVisualizer activeTab={activeTab} />
      </div>
    </>
  );
}
