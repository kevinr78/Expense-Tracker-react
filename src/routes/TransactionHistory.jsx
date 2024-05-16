import { useState, useEffect, useContext } from "react";
import FilterComponent from "../components/FilterComponent";
import { useTransactionContext } from "../components/TransactionContext";
import { Outlet, Link } from "react-router-dom";

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
  }

  async function filterTransactionByCriteria() {
    const result = await fetch(" http://localhost:3000/filterTranasctions", {
      method: "POST",
      body: JSON.stringify(filterCriteria),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await result.json();
    setFilteredTransactions(data);
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
    <div>
      {isTransactionTab && (
        <FilterComponent
          onFilter={getFilterCriteria}
          onClick={filterTransactionByCriteria}
          resetPage={resetFilters}
        />
      )}
      <div className="">
        <h1 className="text-4xl font-bold mb-4">Transaction History</h1>
      </div>
      <div className="overflow-x-auto h-full grow ">
        <table className="table table-zebra overflow-scroll w-full ">
          <tbody>{returnTransactions()}</tbody>
        </table>
      </div>
    </div>
  );
}
