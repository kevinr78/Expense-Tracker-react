
import TransactionProvider, {useTransactionContext} from '../components/TransactionContext.jsx';

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


export default function DataVisualizer() {
  const { transactions, setTransactions } = useTransactionContext();
  const newArray =[]
  transactions.forEach(element => {
    newArray.push(element.amount)
})

console.log(newArray)
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  };

  const ee={
    datasets:{
      label: 'Dataset 1',
      data: newArray,
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    }
  }

  return (
    <div className='shadow-lg w-1/2 '>
      <Line
        data={ee}
/>
    </div>
  )
}
