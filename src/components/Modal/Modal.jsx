import { useState } from "react";
import { useTransactionContext } from "../TransactionContext";
import ManualEntry from "./ManualEntry";
import ImageUpload from "./ImageUpload";


export default function Modal({CTA}) {
  const [activeTab, setActiveTab] = useState("income");
  const [expenseData, setExpenseData] = useState({
    amount: null,
    type: null,
    date: null,
    description: null,
    category: null,
    id: null,
  });


  let formToBeDisplayed =null;

  if(CTA){
    formToBeDisplayed= <ManualEntry   
    onDataInput={handleChange}
     onClick={handleClick}
     activeTab={activeTab}>
    <button className="btn mt-4" onClick={handleSave}>
      Save
    </button>
    <button className="btn mt-4" onClick={()=>{
      document.getElementById('my_modal_1').close()
    }}>Close</button>
  </ManualEntry>
  }else{
    formToBeDisplayed= <ImageUpload />
  }

  const { transactions, setTransactions } = useTransactionContext();

  function handleClick(e) {
    setActiveTab(e.target.name);
  }
  
  function handleChange(e) {
    setExpenseData((prevExpenseData) => {
      if(e.target.name==='amount'){
        return {
          ...prevExpenseData,
          [e.target.name]: Number(e.target.value),
          type: activeTab,
          id: (Math.random() * 10).toString(),
        };
      }

      return {
        ...prevExpenseData,
        [e.target.name]: e.target.value,
        type: activeTab,
        id: (Math.random() * 10).toString(),
      };
      
    });
  }

  function handleSave() {
    setTransactions((prevTrans) => {
      return [...prevTrans, expenseData];
    });
    clearData();
  }

  return (
    <>
      {/* Open the modal using document.getElementById('ID').showModal() method */}

      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">New Transaction</h3>
          <div className="">
              {formToBeDisplayed}
          </div>
        </div>
      </dialog>
    </>
  );
}
