import { useState } from 'react'
import Header from '../components/Header.jsx'
import ExpenseCTA from '../components/ExpenseCTA.jsx'
import SummaryContainer from '../components/Summary/SummaryContainer.jsx'
import TransactionHistory from '../components/TransactionHistory.jsx'
import DataVisualizer from '../components/DataVisualizer.jsx'

export default function Home({onChange,onTabChange}) {
    
  return (
    <>
        <Header  activeTab={onTabChange}/>
        <ExpenseCTA onChange={onChange} />
        <div className='flex justify-center '>
          <SummaryContainer />
        </div>
        <div className='flex justify-around gap-10 mt-10 px-10 h-auto '>
          <TransactionHistory />
          <DataVisualizer />
        </div>
    </>
  )
}
