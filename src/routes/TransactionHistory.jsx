import { useState, useEffect, useContext } from "react";
import FilterComponent from "../components/FilterComponent";
import { useTransactionContext } from "../components/Providers/TransactionContext";
import { Outlet, Link, useNavigate, Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export default function TransactionHistory() {
  const URL = window.location.href;

  let isTransactionTab =
    URL.slice(URL.lastIndexOf("/") + 1) === "transactionHistory";

  const filterCriteria = {
    type: null,
    startDate: null,
    endDate: null,
    category: null,
    filterFlag: null,
  };

  const { transactions, setTransactions } = useTransactionContext();
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  function getFilterCriteria(e) {
    filterCriteria[e.target.name] = e.target.value;
    filterCriteria.filterFlag = true;
    console.log(filterCriteria);
  }

  async function filterTransactionByCriteria() {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const result = await fetch(" http://localhost:3000/filterTranasctions", {
        method: "POST",
        body: JSON.stringify(filterCriteria),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await result.json();

      if (!data.ok) {
        toast.warn(dataFromServer.message, { theme: "dark" });
      }

      setFilteredTransactions(data.result);
      resetFilters();
    } catch (error) {
      throw new Response("Not Found", { status: 404 });
    }
  }
  function resetFilters() {
    setFilteredTransactions([]);
    returnTransactions();
  }
  function returnTransactions() {
    if (filteredTransactions.length > 0) {
      return filteredTransactions.map((transaction, idx) => {
        return (
          <tr key={transaction.t_id}>
            <th>{transaction.description}</th>
            <td>{transaction.category}</td>
            <td>{transaction.type === "income" ? "➕" : "➖"}</td>
            <td>{new Date(transaction.date).toLocaleDateString()}</td>
            <td>{transaction.amount}</td>
          </tr>
        );
      });
    } else {
      if (transactions.length <= 0) {
        return (
          <tr>
            <td>No Transactions Found</td>
          </tr>
        );
      }

      return transactions.map((transaction, idx) => {
        return (
          <tr key={transaction.t_id}>
            <th>{transaction.description}</th>
            <td>{transaction.category}</td>
            <td>{transaction.type === "income" ? "➕" : "➖"}</td>
            <td>{new Date(transaction.date).toLocaleDateString()}</td>
            <td>{transaction.amount}</td>
          </tr>
        );
      });
    }
  }

  return (
    <>
      {isTransactionTab && (
        <FilterComponent
          onFilter={getFilterCriteria}
          onClick={filterTransactionByCriteria}
          resetPage={resetFilters}
        />
      )}
      <div className="w-full ">
        <h1 className="text-4xl font-bold mb-4 ">
          Transaction History
          {!isTransactionTab && (
            <span className="relative left-10">
              <Link to={"transactionHistory"} className="btn">
                View All
              </Link>
            </span>
          )}
        </h1>
        <div className="overflow-x-auto grow ">
          <table className="table table-zebra overflow-scroll w-full ">
            <thead>
              <tr>
                <th>Description</th>
                <th>Category</th>
                <th>Type</th>
                <th>Date</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>{returnTransactions()}</tbody>
          </table>
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
      />
    </>
  );
}
