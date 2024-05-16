import { useState, createContext, useContext, useEffect } from "react";

const TransactionContext = createContext(undefined);

export default function TransactionProvider({ children }) {
  const [transactions, setTransactions] = useState([]);
  const url = "http://localhost:3000/getAllTransactions";

  const fetchData = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setTransactions(data);
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
