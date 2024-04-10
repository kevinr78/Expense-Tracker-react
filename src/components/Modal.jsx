import { useState } from "react";
import { CATEGORIES } from "../expenseCategories";
import { useTransactionContext } from "./TransactionContext";

export default function Modal() {
  const [activeTab, setActiveTab] = useState("income");
  const [expenseData, setExpenseData] = useState({
    amount: null,
    type: null,
    date: null,
    description: null,
    category: null,
    id: null,
  });

  const { transactions, setTransactions } = useTransactionContext();

  function handleClick(e) {
    setActiveTab(e.target.name);
  }
  function clearData() {}
  function handleChange(e) {
    setExpenseData((prevExpenseData) => {
      if(e.target.name==='amount'){
        return {
          ...prevExpenseData,
          [e.target.name]: Number(e.target.value),
          type: activeTab,
          id: (Math.random() * 10).toString(),
        };
      }

      return {
        ...prevExpenseData,
        [e.target.name]: e.target.value,
        type: activeTab,
        id: (Math.random() * 10).toString(),
      };
      
    });
  }

  function handleSave() {
    setTransactions((prevTrans) => {
      return [...prevTrans, expenseData];
    });
    clearData();
  }

  return (
    <>
      {/* Open the modal using document.getElementById('ID').showModal() method */}

      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">New Transaction</h3>
          <div className="">
            <form method="dialog">
              <input
                type="number"
                required
                placeholder="Amount"
                name="amount"
                className="input input-bordered input-lg w-full border-b-8 my-10"
                onChange={handleChange}
              />

              <div className="flex flex-col gap-4">
                <div role="tablist" className="tabs tabs-boxed">
                  <a
                    role="tab"
                    onClick={handleClick}
                    name="income"
                    className={`tab ${
                      activeTab === "income" ? "tab-active" : null
                    }`}
                  >
                    Income
                  </a>
                  <a
                    role="tab"
                    onClick={handleClick}
                    name="expense"
                    className={`tab ${
                      activeTab === "expense" ? "tab-active" : null
                    }`}
                  >
                    Expense
                  </a>
                </div>
                <input
                  type="date"
                  className="input input-bordered w-full"
                  name="date"
                  required
                  onChange={handleChange}
                />
                <input
                  type="text"
                  placeholder="Description"
                  name="description"
                  className="input input-bordered w-full"
                  required
                  onChange={handleChange}
                />
                <select
                  className="select select-bordered "
                  required
                  name="category"
                  onChange={handleChange}
                >
                  <option disabled selected>
                    Category
                  </option>
                  {CATEGORIES.map((category, idx) => {
                    return (
                      <option
                        key={idx}
                      >{`${category.emoji} ${category.name}`}</option>
                    );
                  })}
                </select>
              </div>
              <button className="btn mt-4" onClick={handleSave}>
                Save
              </button>
              <button className="btn mt-4">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
