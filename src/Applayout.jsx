import React, { createContext, useEffect, useState } from 'react'
import SideBar from './SideBar'
import { Outlet } from 'react-router-dom'
import { db } from '../firebase.config';
import { getDoc,doc,getDocs } from 'firebase/firestore';
import { collection } from 'firebase/firestore';

export const totalAmountGlobal = createContext();

function Applayout() {

  const[totalIncome, setTotalIncome] = useState(0);
  const[totalExpense, setTotalExpense] = useState(0);
  const[allTransaction, setAllTransactions] = useState([])


  const globalContext = {
    totalIncome,
    setTotalIncome,
    totalExpense,
    setTotalExpense,
    allTransaction,
    setAllTransactions
  }

  useEffect(()=>{
   async function getIntitalIncome() {
    
    const totalIncomeCollection = doc(db, 'totalincometrans', 'totalIncomeId')
    const getTotalIncome = await getDoc(totalIncomeCollection)
   if(getTotalIncome.exists()){
     setTotalIncome(getTotalIncome.data().totalIncome)
   }else{
     setTotalIncome(0)
   }

   const totalExpenseCollection = doc(db, 'totalExpensetrans', 'totalExpenseId')
   const getTotalExpense = await getDoc(totalExpenseCollection)
   if (getTotalExpense.exists()) {
           setTotalExpense(getTotalExpense.data().totalExpense)
   }else{
    setTotalExpense(0)
   }

   const getAllTrans = await getDocs(collection(db, 'alltrans'));
   const allTransData = getAllTrans.docs.map(doc=>({
    id:doc.id,
    ...doc.data()
   }))
 
   setAllTransactions(allTransData)
  
  }

  getIntitalIncome()
     
  },[])


  return (
    <div className='md:flex' >
      <totalAmountGlobal.Provider value={globalContext}  >
         <SideBar/> 
         <Outlet />
      </totalAmountGlobal.Provider>
    </div>
  )
}

export default Applayout