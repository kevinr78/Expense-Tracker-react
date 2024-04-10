import React from 'react'
import Summary from './Summary.jsx';
import TransactionProvider, {useTransactionContext} from '../TransactionContext.jsx';
import calculateExpenses from '../Summary/calculateExpense.js'

export default function SummaryContainer() {
    const { transactions, setTransactions } = useTransactionContext();
    const expenseSummary = calculateExpenses(transactions)


  return (
    <div>
        {
            Object.entries(expenseSummary).map((expense,idx)=>{       
             const formattedString =    expense[0].slice(0,1).toUpperCase()+expense[0].slice(1)
             return <Summary key={idx} title={formattedString}
                        value={expense[1]} 
                        desc={"Total "+formattedString}/> 
            })
        }
    </div>
  )
}
