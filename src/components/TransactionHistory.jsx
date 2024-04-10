import React from 'react'
import { useTransactionContext } from './TransactionContext'

export default function TransactionHistory() {

  const {transactions,setTransactions} = useTransactionContext()

  return (
    <div className='shadow-lg w-1/2 hover:shadow-lg'>
        <h1 className='text-4xl font-bold mb-4'>Transaction History</h1>
        <div className="overflow-x-auto">
            <table className="table">    
            <tbody>
              {transactions.map((transaction,idx)=>{
                if(idx===5){
                  return
                }
                return <tr key={transaction.id}>
                          <th>{transaction.description}</th>
                          <td>{transaction.category}</td>
                          <td>{transaction.type==='income'?'➕':'➖'}</td>
                          <td>{transaction.date}</td>
                          <td>{transaction.amount}</td>
                        </tr>
              })}
            </tbody>
            </table>
        </div>
    </div>
  )
}
