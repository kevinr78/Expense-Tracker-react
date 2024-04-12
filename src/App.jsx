import { useState } from 'react'
import Modal from './components/Modal/Modal.jsx'
import Home from './components/Home.jsx'
import TransactionProvider,{useTransactionContext} from './components/TransactionContext.jsx'
import TransactionHistory from './components/TransactionHistory.jsx'


function App() {
  const [manualEntryCTA, setManualEntryCTA] = useState(true)
  const [isHomeActive,setIsHomeActive] = useState(true)


  function onTabChange(){
    set
  }

  function handleChange(value){
  
    if(value==='manual-entry'){
      setManualEntryCTA(true);
    }else{
      setManualEntryCTA(false)
    }
  }

  return (
    <div className='h-screen'>
      <TransactionProvider >
       {isHomeActive && <Home onChange={onTabChange}/>}
       {!isHomeActive && <TransactionHistory />} 
        <Modal  CTA={manualEntryCTA} />
      </TransactionProvider>

    </div>
  )
}

export default App
