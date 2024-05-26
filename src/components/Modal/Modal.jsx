import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useTransactionContext } from "../Providers/TransactionContext";
import ManualEntry from "./ManualEntry";
import ImageUpload from "./ImageUpload";
import { useAuthContext } from "../Providers/AuthProvider";

export default function Modal({ CTA, toastData }) {
  const [activeTab, setActiveTab] = useState("income");
  const { user } = useAuthContext();
  const [expenseData, setExpenseData] = useState({
    amount: null,
    type: null,
    date: null,
    description: null,
    category: null,
    id: null,
  });

  let formToBeDisplayed = null;

  if (CTA) {
    formToBeDisplayed = (
      <ManualEntry
        onDataInput={handleChange}
        onClick={handleClick}
        activeTab={activeTab}
      >
        <button className="btn mt-4" onClick={handleSave}>
          Save
        </button>
        <button
          className="btn mt-4"
          onClick={() => {
            document.getElementById("my_modal_1").close();
          }}
        >
          Close
        </button>
      </ManualEntry>
    );
  } else {
    formToBeDisplayed = <ImageUpload />;
  }

  const { transactions, setTransactions } = useTransactionContext();

  function handleClick(e) {
    setActiveTab(e.target.name);
  }

  function handleChange(e) {
    setExpenseData((prevExpenseData) => {
      const targetEle = e.target.name,
        targetValue = e.target.value;

      if (targetEle === "amount") {
        return {
          ...prevExpenseData,
          [targetEle]: Number(targetValue),
          type: activeTab,
          id: (Math.random() * 10).toString(),
        };
      }

      return {
        ...prevExpenseData,
        [targetEle]:
          targetEle === "category" ? targetValue.split(" ")[1] : targetValue,
        type: activeTab,
        id: (Math.random() * 10).toString(),
      };
    });
  }

  async function handleSave() {
    const token = JSON.parse(localStorage.getItem("token"));
    const result = await fetch(`http://localhost:3000/insertTransaction`, {
      method: "POST",
      body: JSON.stringify(expenseData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await result.json();
    if (!data.ok) {
      console.error(data.message);
    } else {
      setTransactions((prevTrans) => {
        return [...prevTrans, expenseData];
      });
      toastData("success", "Data Saved Successfully");
    }
  }

  return createPortal(
    <>
      {/* Open the modal using document.getElementById('ID').showModal() method */}

      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">New Transaction</h3>
          <div className="">{formToBeDisplayed}</div>
        </div>
      </dialog>
    </>,
    document.getElementById("modal-root")
  );
}
