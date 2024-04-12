import {useState,createContext,useContext} from 'react'

const TransactionContext = createContext(undefined)
const dummyExpenseData = [{
  "category": "Medicine",
  "amount": 994,
  "type": "expense",
  "date": "19/02/2024",
  "id": {
    "$oid": "6617c147fc13ae2b79ab8abd"
  },
  "description": "Office supplies"
}, {
  "category": "Groceries",
  "amount": 939,
  "type": "expense",
  "date": "27/08/2023",
  "id": {
    "$oid": "6617c147fc13ae2b79ab8abe"
  },
  "description": "Utilities bill"
}, {
  "category": "Travel",
  "amount": 867,
  "type": "expense",
  "date": "30/01/2024",
  "id": {
    "$oid": "6617c147fc13ae2b79ab8abf"
  },
  "description": "Printing services"
}, {
  "category": "Gas",
  "amount": 898,
  "type": "expense",
  "date": "26/05/2023",
  "id": {
    "$oid": "6617c147fc13ae2b79ab8ac0"
  },
  "description": "Team lunch"
}, {
  "category": "Miscellaneous",
  "amount": 864,
  "type": "income",
  "date": "25/02/2024",
  "id": {
    "$oid": "6617c147fc13ae2b79ab8ac1"
  },
  "description": "Travel expenses"
}, {
  "category": "Rent",
  "amount": 259,
  "type": "income",
  "date": "30/10/2023",
  "id": {
    "$oid": "6617c147fc13ae2b79ab8ac2"
  },
  "description": "Insurance premium"
}, {
  "category": "Medicine",
  "amount": 609,
  "type": "expense",
  "date": "20/02/2024",
  "id": {
    "$oid": "6617c147fc13ae2b79ab8ac3"
  },
  "description": "Consulting fees"
}, {
  "category": "Medicine",
  "amount": 382,
  "type": "income",
  "date": "15/02/2024",
  "id": {
    "$oid": "6617c147fc13ae2b79ab8ac4"
  },
  "description": "Conference fees"
}, {
  "category": "Books",
  "amount": 758,
  "type": "income",
  "date": "23/06/2023",
  "id": {
    "$oid": "6617c147fc13ae2b79ab8ac5"
  },
  "description": "Marketing materials"
}, {
  "category": "Miscellaneous",
  "amount": 567,
  "type": "expense",
  "date": "06/04/2024",
  "id": {
    "$oid": "6617c147fc13ae2b79ab8ac6"
  },
  "description": "Training materials"
}, {
  "category": "Gas",
  "amount": 181,
  "type": "income",
  "date": "05/08/2023",
  "id": {
    "$oid": "6617c147fc13ae2b79ab8ac7"
  },
  "description": "Printing services"
}, {
  "category": "Clothes",
  "amount": 794,
  "type": "income",
  "date": "12/01/2024",
  "id": {
    "$oid": "6617c147fc13ae2b79ab8ac8"
  },
  "description": "Travel expenses"
}, {
  "category": "Books",
  "amount": 960,
  "type": "expense",
  "date": "16/04/2023",
  "id": {
    "$oid": "6617c147fc13ae2b79ab8ac9"
  },
  "description": "Team lunch"
}, {
  "category": "Rent",
  "amount": 468,
  "type": "income",
  "date": "12/07/2023",
  "id": {
    "$oid": "6617c147fc13ae2b79ab8aca"
  },
  "description": "Advertising costs"
}, {
  "category": "Internet/Wi-Fi",
  "amount": 837,
  "type": "expense",
  "date": "06/04/2024",
  "id": {
    "$oid": "6617c147fc13ae2b79ab8acb"
  },
  "description": "Repair and maintenance"
}, {
  "category": "Clothes",
  "amount": 365,
  "type": "income",
  "date": "07/01/2024",
  "id": {
    "$oid": "6617c147fc13ae2b79ab8acc"
  },
  "description": "Printing services"
}, {
  "category": "Groceries",
  "amount": 330,
  "type": "expense",
  "date": "04/11/2023",
  "id": {
    "$oid": "6617c147fc13ae2b79ab8acd"
  },
  "description": "Office furniture"
}, {
  "category": "Books",
  "amount": 190,
  "type": "expense",
  "date": "13/10/2023",
  "id": {
    "$oid": "6617c147fc13ae2b79ab8ace"
  },
  "description": "Client gifts"
}, {
  "category": "Clothes",
  "amount": 155,
  "type": "income",
  "date": "14/03/2024",
  "id": {
    "$oid": "6617c147fc13ae2b79ab8acf"
  },
  "description": "Marketing materials"
}, {
  "category": "Miscellaneous",
  "amount": 258,
  "type": "expense",
  "date": "10/06/2023",
  "id": {
    "$oid": "6617c147fc13ae2b79ab8ad0"
  },
  "description": "Tax preparation services"
}]

export default function TransactionProvider({children}) {
    const [transactions,setTransactions] = useState(dummyExpenseData)
  return (
    <TransactionContext.Provider value={{ transactions, setTransactions }}>
        {children}
    </TransactionContext.Provider>
  )
}


export const useTransactionContext = ()=>{
    const tranasctionContext = useContext(TransactionContext)
    if (tranasctionContext === undefined) {
        throw new Error('useOnboardingContext must be inside a Provider');
    }
      return tranasctionContext;
}