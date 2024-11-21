import React from 'react'

function Header({heading}) {
  return (
    <header>
     
        <h1 className='font-semibold text-2xl md:text-3xl text-gray-100 flex justify-center py-3 '>
         {heading}
        </h1>
  
    </header>
  )
}

export default Header