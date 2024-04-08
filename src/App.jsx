import { useState } from 'react'
import Header from './components/Header.jsx'
import ExpenseCTA from './components/ExpenseCTA.jsx'
import Summary from './components/Summary.jsx'
import TransactionHistory from './components/TransactionHistory.jsx'
import DataVisualizer from './components/DataVisualizer.jsx'
import Modal from './components/Modal.jsx'


function App() {
  
  return (
    <div className='h-screen'>
      <Header />
      <ExpenseCTA />
      <div className='flex justify-center '>
        <Summary title="Income" value="21,000" desc="Total income"/>
        <Summary title="Expense" value="23,000" desc="Total Expense"/>
        <Summary title="Saving" value="2,000" desc="Total Saving"/>
      </div>
      <div className='flex justify-around gap-10 mt-10 px-10 h-auto '>
        <TransactionHistory />
        <DataVisualizer />
      </div>
      <Modal />
      
    </div>
  )
}

export default App
