import React, { useState } from 'react'
 
function StateCard({heading, price, buttonName}) {

 

  return (
    <div className='flex flex-col gap-1 md:w-full w-80 h-28 p-2 bg-gray-800 border-gray-600  border-x border-y rounded'>
    <h1 className='text-center font-semibold' >{heading}</h1>
      <p className='text-center'>₹{price}</p>
      <button  className='bg-blue-600' >{buttonName}</button>
    </div>    
)

}

export default StateCard;