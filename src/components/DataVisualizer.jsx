
import TransactionProvider, {useTransactionContext} from '../components/TransactionContext.jsx';

import {Chart as ChartJS, scales,} from 'chart.js/auto';

import { Bar ,Doughnut} from 'react-chartjs-2';

ChartJS.register()
export default function DataVisualizer() {
  const { transactions, setTransactions } = useTransactionContext();
  const scalesOp = {x:{ticks:{maxTicksLimit:5}},y:{ticks:{maxTicksLimit:5}}}

  return (
    <div className='shadow-lg w-1/2 '>
      <Doughnut options={{scales:scalesOp}} 
      data={{
        labels: transactions.map(transaction => transaction.category) ,
        datasets:[
          {
            label:'Amount',
            data: transactions.map(transaction=>transaction.amount),
            backgroundColor:[
              "rgba(245, 40, 145, 0.8)",
             " rgba(39, 245, 152, 0.8)",
             "rgba(39, 192, 245, 0.8)",
             "rgba(192, 255, 57, 0.8)"
            ]
            
          }
        ]

      }} />
    </div>
  )
}
