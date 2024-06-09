import { useState, createContext, useContext, useEffect } from "react";

const TransactionContext = createContext(undefined);

export default function TransactionProvider({ children }) {
  const [transactions, setTransactions] = useState([]);
  const token = localStorage.getItem("token");

  const url = `http://localhost:3000/getAllTransactions`;

  const fetchData = async () => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
        body: null,
      });
      const data = await response.json();
    } catch (error) {
      console.log("error", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <TransactionContext.Provider value={{ transactions, setTransactions }}>
      {children}
    </TransactionContext.Provider>
  );
}

export const useTransactionContext = () => {
  const transactionContext = useContext(TransactionContext);
  if (transactionContext === undefined) {
    throw new Error("useTransactionContext must be inside a Provider");
  }

  return transactionContext;
};
