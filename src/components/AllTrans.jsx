import React, { useEffect, useContext } from 'react'
import { db } from '../../firebase.config'; 
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { RiDeleteBin5Line } from "react-icons/ri";
import { totalAmountGlobal } from '../Applayout';




function AllTrans() {

    const {allTransaction, setAllTransactions} = useContext(totalAmountGlobal) 


  useEffect(()=>{
      async function getAlltransaction() {
        const getAllTrans = await getDocs(collection(db, 'alltrans'));
         const allTransData = getAllTrans.docs.map(doc=>({
          id:doc.id,
          ...doc.data()
         }))
       
         setAllTransactions(allTransData)
        }

        getAlltransaction();
  },[handleDelete])


  async function handleDelete(id){

    const storedData = doc(db, 'alltrans', id);
    await deleteDoc(storedData)

    setAllTransactions(prev=>prev.filter((_,i)=> id!==i))
  }

  return (
    <div className='w-full px-4 pt-3 p-2 bg-gray-900'>
    <h1 className='text-center text-sm md:text-md p-1 bg-blue-600 font-semibold rounded'>Transaction History</h1>

    { allTransaction.length>0 ?
     allTransaction.map((f,i) =>
    <ul key={i} className={`${f.Boolean? 'text-green-500':'text-red-500' } grid grid-cols-5 p-1 gap-2 bg-gray-700 `}>
    <li className='overflow-scroll scrollbar-hide'>{f.name}</li>
    <li className='overflow-scroll  scrollbar-hide'>{f.amount}</li>
    <li className='overflow-scroll scrollbar-hide'>{f.date}</li>
    <li className='overflow-scroll scrollbar-hide'>{f.tag}</li>
    
    <RiDeleteBin5Line onClick={()=>handleDelete(f.id)} className='cursor-pointer' />
    </ul>
  ): <div className=' h-80 flex justify-center items-center font-semibold text-2xl'>No Transactions...</div>
}
  </div>
  )
}

export default AllTrans