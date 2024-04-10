import { useState } from 'react'
import Header from './components/Header.jsx'
import ExpenseCTA from './components/ExpenseCTA.jsx'
import SummaryContainer from './components/Summary/SummaryContainer.jsx'
import TransactionHistory from './components/TransactionHistory.jsx'
import DataVisualizer from './components/DataVisualizer.jsx'
import Modal from './components/Modal/Modal.jsx'
import TransactionProvider,{useTransactionContext} from './components/TransactionContext.jsx'

function App() {
  const [clickedCTA, setClickedCTA] = useState("manual-entry")


  function handleChange(value){
    setClickedCTA(value)
    console.log(clickedCTA)
  }
  return (
    <div className='h-screen'>
      <Header />
      <TransactionProvider >
        <ExpenseCTA onChange={handleChange} />
        <div className='flex justify-center '>
          <SummaryContainer />
    
        </div>
        <div className='flex justify-around gap-10 mt-10 px-10 h-auto '>
          <TransactionHistory />
          <DataVisualizer />
        </div>
        <Modal  CTA={clickedCTA} />
      </TransactionProvider>

    </div>
  )
}

export default App
