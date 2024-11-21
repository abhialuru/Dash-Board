import React, { useState } from 'react'
 import { NavLink } from 'react-router-dom';
import { CiMenuBurger } from "react-icons/ci";
 import { BarChart2, IndianRupee, ArrowLeftRight } from 'lucide-react';
 import { RxCross1 } from "react-icons/rx";
 

 

const sideIcons = [
	{
		name: "Overview",
		icon: BarChart2,
		color: "#6366f1",
		href: "/",
	},
	{ name: "Total Income", icon: IndianRupee, color: "#10B981", href: "/income" },
	{ name: "Total Expenses", icon: IndianRupee, color: "#EC4899", href: "/spend" },
  { name: "Transactions", icon: ArrowLeftRight, color: "#3B82F6", href: "/trans" },

];



function SideBar() {

const [sideOpen, setSideOpen] = useState(false);

  return (
    <div className='md:h-screen md:w-1/6 w-full h-20 bg-gray-800 border-gray-400 md:border-r border-b'>
      <div className='flex justify-around md:justify-center font-semibold underline underline-offset-4 text-xl py-5 mb-4' >
      <NavLink to='/' ><h1 >DASHBOARD</h1></NavLink>  
      <CiMenuBurger  onClick={()=>setSideOpen(true)} size={24} className='flex items-center md:hidden' />
       
         
      </div>
      {sideIcons.map((item, i) => (
        <NavLink key={i} to={item.href} className={({isActive})=>isActive?'bg-gray-700 hidden md:flex items-center p-4 hover:bg-gray-700 rounded-md':'hidden md:flex items-center p-4 hover:bg-gray-700 rounded-md'} >
          <item.icon style={{ color: item.color }} />
          <p className="ml-4 text-white text-sm">{item.name}</p>
        </NavLink>
      ))}

      <div className={`md:hidden ${sideOpen?'fixed w-60 border-slate-50 border-r':'w-0 h-0'}  top-0  left-0-0 bottom-0 bg-gray-800 overflow-hidden transition-all`}>
        <div className='flex justify-end p-4'>
        <RxCross1 onClick={()=>setSideOpen(!sideOpen)} className='text-2xl '/>
        </div>
      {sideIcons.map((item, i) => (
        <NavLink key={i} to={item.href} onClick={()=>setSideOpen(!sideOpen)} className='w-full flex ml-6 items-center p-5 '>
          <item.icon style={{ color: item.color }} />
          <p className="ml-4 text-white text-sm">{item.name}</p>
        </NavLink>
      ))}
      </div>
    </div>
   
  ) 
}

export default SideBar