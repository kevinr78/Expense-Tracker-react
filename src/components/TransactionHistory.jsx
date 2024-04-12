import React from 'react'
import { useTransactionContext } from './TransactionContext'

export default function TransactionHistory() {

  const {transactions,setTransactions} = useTransactionContext()
  
  const mappedTransactions  =transactions.map((transaction,idx)=>{      
    return <tr key={transaction.id}>
              <th>{transaction.description}</th>
              <td>{transaction.category}</td>
              <td>{transaction.type==='income'?'➕':'➖'}</td>
              <td>{transaction.date}</td>
              <td>{transaction.amount}</td>
            </tr>
  })

  return (
    <div className='shadow-lg w-1/2 hover:shadow-lg'>
        <h1 className='text-4xl font-bold mb-4'>
          Transaction History
          <span className='ml-20'>
            <button className="btn btn-sm">View All</button>
          </span>
        </h1>
        <div className="overflow-x-auto">
            <table className="table">    
            <tbody>
              {mappedTransactions[0]}
              {mappedTransactions[1]}
              {mappedTransactions[2]}
              {mappedTransactions[3]}
              {mappedTransactions[4]}
            </tbody>
            </table>
        </div>
    </div>
  )
}
