import React, { useContext, useEffect, useState } from 'react'
import Header from '../Header'
import StateCard from './StateCard'
import { totalAmountGlobal } from '../Applayout'
import { NavLink } from 'react-router-dom'
 import FinanceChart from './FInanceChart'
 
function Overview() {

 const{totalIncome} = useContext(totalAmountGlobal)
 const{totalExpense} = useContext(totalAmountGlobal)
 const {allTransaction} = useContext(totalAmountGlobal) 
 
  
 
  return (
    <>
    <div className='flex flex-col w-full h-16 bg-gray-800 border-gray-600 border-y md:border-b' > 
      <Header heading='Overview' />
    <div className='grid md:grid-flow-col max-w-full gap-2 mx-auto md:mx-0 p-2 mt-5'>
    <NavLink to='/trans' ><StateCard heading='Current Balance' price={totalIncome-totalExpense} buttonName='Review Balance'  /></NavLink>  
      <NavLink to='/income' ><StateCard heading='Total Income' price={totalIncome} buttonName='Add Income'  /></NavLink>  
   <NavLink to='/spend' ><StateCard heading='Total Expenses' price={totalExpense} buttonName='Add Expenses'  /></NavLink>  
    </div>

    <div className='md:flex w-full justify-between '>
    
    <div className='md:hidden w-[80%] mx-auto h-36 my-2'>
    <FinanceChart/>
    </div>

 
    <div className='hidden md:block w-full'><FinanceChart /> </div>

 <div className='md:w-[30%] w-full max-h-[350px] px-10 pt-3  bg-gray-900 mr-10 mt-10'>
   <h1 className='text-center text-sm md:text-md p-1 bg-[#6366f1] font-semibold rounded'>Recent History</h1>
   {allTransaction.map((f,i) =>
   <ul key={i} className='flex justify-between gap-2 bg-gray-700 px-2' >
   <li className='overflow-scroll text-white scrollbar-hide'>{f.tag}</li>
   <li className={`${f.Boolean? 'text-green-500':'text-red-600'} overflow-scroll scrollbar-hide`}>₹{f.amount}</li>
    </ul>
 )}
 </div>
 </div>
    </div>
    </>
  )
}

export default Overview