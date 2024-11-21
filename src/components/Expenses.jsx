import React, { useContext, useEffect, useState } from 'react'
import Header from '../Header';
import { RiDeleteBin5Line } from "react-icons/ri";
import { addDoc, collection, deleteDoc, getDocs,doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase.config';
import { totalAmountGlobal } from '../Applayout';
import '../App.css'


function  Expenses() {

const[name, setName] = useState('');
const[amount, setAmount] = useState('');
const[date, setDate] = useState('');
const[tag, setTag] = useState('');

 const {totalExpense, setTotalExpense} = useContext(totalAmountGlobal) 

  const[expenseTrans, setExpenseTrans] = useState([])


  async function handleallTrans(e) {
    e.preventDefault()

    const expenseTransCollection = collection(db, 'expensetrans');
    await addDoc(expenseTransCollection,{
      name: name,
      amount: Number(amount),
      date: date,
      tag: tag,
    })

    const allTransCollection = collection(db, 'alltrans')
     await addDoc(allTransCollection,{
      name: name,
      amount: Number(amount),
      date: date,
      tag: tag,
      Boolean:false
     })
    
    const totalExpenseCollection = doc(db, 'totalExpensetrans', 'totalExpenseId');
     const getTotalExpense = await getDoc(totalExpenseCollection)

     if (getTotalExpense.exists()) {
      await updateDoc(totalExpenseCollection,{
        totalExpense: totalExpense + Number(amount)
       })
     }else{
      setDoc(totalExpenseCollection,{
        totalExpense: Number(amount)
      } )
     }



    setName('')
    setAmount('')
    setDate('')
    setTag('')
  }

  useEffect(()=>{
    async function getExpenseTrans(){
         const getExpenseTrans = await getDocs(collection(db, 'expensetrans'));
         const expenseTransdata = getExpenseTrans.docs.map(doc=>({
          id:doc.id,
          ...doc.data()
         }))

         setExpenseTrans(expenseTransdata);

         const totalExpenseCollection = doc(db, 'totalExpensetrans', 'totalExpenseId')
         const getTotalExpense = await getDoc(totalExpenseCollection)
        if(getTotalExpense.exists()){
          setTotalExpense(getTotalExpense.data().totalExpense)
        }else{
          setTotalExpense(0)
        }
          
     }

     getExpenseTrans();

  },[handleallTrans])


  async function handleDelete(id,amount){

    const storedData = doc(db, 'expensetrans', id);
    await deleteDoc(storedData)

    setExpenseTrans(prev=>prev.filter((_,i)=> id!=i))

    const totalExpenseCollection = doc(db, 'totalExpensetrans', 'totalExpenseId');
    if (totalExpense!==0) {
     await updateDoc(totalExpenseCollection,{
      totalExpense: totalExpense - Number(amount)
       
      })
     }
  }

  
  return (
    <div className='w-full h-16 bg-gray-800 border-gray-600 border-y'>
    <Header heading= 'Total Expenses' />


    <div className='md:flex bg-gray-900 border-gray-600 border-t' >
      <div>
    <div className='md:ml-4 mt-3 space-y-2'>
    <div className='flex flex-col gap-1 w-80 mx-auto p-2 bg-gray-800 border-gray-600  border-x border-y rounded'> 
        <h1 className='text-center font-semibold text-red-500' >Total Expenses</h1>
      <p className='text-center'>₹{totalExpense}</p>
      </div> 

    <form onSubmit={handleallTrans} className= 'flex flex-col w-80 gap-4 mx-auto  text-white bg-gray-800 p-3 rounded' >
  
        <h1 className='font-semibold' >Add Expense</h1>

        <div className='flex flex-col'>
         <span>Name</span>
        <input onChange={(e)=>setName(e.target.value)} className='w-full p-1 outline-none bg-transparent focus:bg-transparent shadow-gray-600 shadow-sm' value={name} type="text"   placeholder='Add' required/>
        </div>

        <div className='flex flex-col'>
         <span>Amount</span> 
        <input onChange={(e)=>setAmount(e.target.value)}   className='w-full p-1 outline-none bg-transparent focus:bg-transparent shadow-gray-600 shadow-sm' value={amount} type="number"   placeholder='Add' required/>
        </div>

        <div className='flex flex-col'>
         <span>Date</span>
         <input onChange={(e)=>setDate(e.target.value)} className='w-full p-1 outline-none bg-transparent focus:bg-transparent shadow-gray-600 shadow-sm' value={date} type="date"   placeholder='Add' required/>
        </div>

        <div className='flex flex-col'>
         <span>Tag</span>
         <input onChange={(e)=>setTag(e.target.value)} className='w-full p-1 outline-none bg-transparent focus:bg-transparent shadow-gray-600 shadow-sm' value={tag} type="text"  placeholder='Add' required/>
        </div>

        <button type='submit' className='bg-blue-500  text-white cursor-pointer px-8 py-1 rounded'>Add</button>

      </form>
      </div>
      </div>
      
   <div className='w-full px-4 pt-3 p-2 bg-gray-900'>
      <h1 className='text-center text-sm md:text-md p-1 bg-red-600 font-semibold rounded'>Expense History</h1>
      {expenseTrans.map((f,i) =>
      <ul key={i} className= 'text-white grid grid-cols-5 p-1 gap-2 bg-gray-700' >
      <li className='overflow-scroll scrollbar-hide'>{f.name}</li>
      <li className='overflow-scroll scrollbar-hide'>{f.amount}</li>
      <li className='overflow-scroll scrollbar-hide'>{f.date}</li>
      <li className='overflow-scroll scrollbar-hide'>{f.tag}</li>
      <RiDeleteBin5Line onClick={()=>handleDelete(f.id, f.amount)} className='cursor-pointer' />
      </ul>
    )}
    </div>
    </div>
    </div>
  )

}

export default Expenses;