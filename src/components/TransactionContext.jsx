import {useState,createContext,useContext} from 'react'

const TransactionContext = createContext(undefined)


export default function TransactionProvider({children}) {
    const [transactions,setTransactions] = useState([])
  return (
    <TransactionContext.Provider value={{ transactions, setTransactions }}>
        {children}
    </TransactionContext.Provider>
  )
}


export const useTransactionContext = ()=>{
    const tranasctionContext = useContext(TransactionContext)
    if (tranasctionContext === undefined) {
        throw new Error('useOnboardingContext must be inside a Provider');
    }
      return tranasctionContext;
}