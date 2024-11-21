import React, { useContext, useEffect, useState } from 'react'
import Header from '../Header'
import { RiDeleteBin5Line } from "react-icons/ri";
import { addDoc, collection, deleteDoc, getDocs,doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase.config';
import { totalAmountGlobal } from '../Applayout';
import '../App.css'

function Addincome() {

  const {totalIncome, setTotalIncome} = useContext(totalAmountGlobal)

  const[name, setName] = useState('');
  const[amount, setAmount] = useState('');
  const[date, setDate] = useState('');
  const[tag, setTag] = useState('');
 
  const[incomeTrans, setIncomeTrans] = useState([])

  async function handleallTrans(e) {
    e.preventDefault()

    const incomeTransCollection = collection(db, 'incometrans')
     await addDoc(incomeTransCollection,{
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
      Boolean: true
     })

     const totalIncomeCollection = doc(db, 'totalincometrans', 'totalIncomeId');
     const getTotalIncome = await getDoc(totalIncomeCollection)

     if (getTotalIncome.exists()) {
      await updateDoc(totalIncomeCollection,{
        totalIncome: totalIncome + Number(amount)
       })
     }else{
      setDoc(totalIncomeCollection,{
        totalIncome: Number(amount)
      } )
     }
      
    
 
    setName('')
    setAmount('')
    setDate('')
    setTag('')
  }


 useEffect(()=>{

    async function getIncomeTrans() {
        const   getIncomeTrans = await getDocs(collection(db, 'incometrans'));
        const incomeTransdata = getIncomeTrans.docs.map(doc => ({
          id:doc.id,
          ...doc.data()
        }))
        setIncomeTrans(incomeTransdata);

      const totalIncomeCollection = doc(db, 'totalincometrans', 'totalIncomeId')
     const getTotalIncome = await getDoc(totalIncomeCollection)
    if(getTotalIncome.exists()){
      setTotalIncome(getTotalIncome.data().totalIncome)
    }else{
      setTotalIncome(0)
    }
      }



      getIncomeTrans();


  },[handleallTrans])

 
  async function handleDelete(id, amount) {
     const storedData = doc(db, 'incometrans', id)
     await deleteDoc(storedData)

     setIncomeTrans(prev=>prev.filter((_, i)=> i!=id))

    
     const totalIncomeCollection = doc(db, 'totalincometrans', 'totalIncomeId');
     if (totalIncome!==0) {
      await updateDoc(totalIncomeCollection,{
          totalIncome: totalIncome - Number(amount)
        
       })
      }

    } 
 
  return (
    <div className='w-full h-16 bg-gray-800 border-gray-600 border-y '>
    <Header heading= 'Total Income' />


    <div className='md:flex bg-gray-900 border-gray-600 border-t' >
      <div>
    <div className='md:ml-4  mt-3 space-y-2'>
        <div className='flex flex-col gap-1 w-80 mx-auto p-2 bg-gray-800 border-gray-600  border-x border-y rounded'> 
        <h1 className='text-center font-semibold text-green-500 ' >Total Income</h1>
      <p className='text-center'>₹{totalIncome}</p>
      </div> 

         
    <form onSubmit={handleallTrans} className= 'flex flex-col w-80 gap-4 mx-auto text-white bg-gray-800 p-3 rounded' >
  
        <h1 className='font-semibold' >Add Income</h1>

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
      

       <div className='md:p-5 p-3 w-full bg-gray-900'>
        <h1 className='text-center p-1 bg-green-600 font-semibold rounded'  >Income History</h1>
      {incomeTrans.map((f,i) => 
      <ul key={i} className='text-white text-sm md:text-md grid grid-cols-5 p-1 gap-2 bg-gray-700' >
      <li className='overflow-scroll scrollbar-hide'>{f.name}</li>
      <li className='overflow-scroll scrollbar-hide'>₹{f.amount}</li>
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

export default Addincome