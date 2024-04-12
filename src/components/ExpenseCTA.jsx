import {useState} from 'react'
import AddExpenseLogo from '../assets/add-expense.svg'
import RemoveExpenseLogo from '../assets/remove-expense.svg'

export default function ExpenseCTA({onChange}) {
  
  function handleCTAClick(e){
    console.log(e.target.closest('button').name)
    onChange(e.target.closest('button').name)
    document.getElementById('my_modal_1').showModal()
  }

  return (
      <>
        <div className=' flex justify-center '>
          <div  className='bg-gray-200 dark:bg-gray-800 flex flex-col justify-center items-center mx-10 my-10 py-4 px-4  rounded-2xl'>
          <button onClick={handleCTAClick} name="manual-entry" className="btn btn-circle btn-outline btn-accent">
            <img className='w-8' src={AddExpenseLogo} alt="" />
          </button>
            <p className='my-4'>Add Income</p> 
          </div>
          <div className=' bg-gray-200 dark:bg-gray-800 flex flex-col justify-center items-center  mx-10 my-10 py-4 px-4 rounded-2xl'>
            <button  onClick={handleCTAClick} name="image-entry"  className="btn btn-circle btn-outline btn-accent">
            <img className='w-8' src={RemoveExpenseLogo} alt="" />
          </button>
            <p className='my-4'>Add Expense</p> 
          </div>
        </div>
      </>
  )
}
