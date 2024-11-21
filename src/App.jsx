 import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
 import Overview from './components/Overview'
import Applayout from './Applayout'
import Addincome from './components/Addincome'
import Expenses from './components/Expenses'
import './App.css'
import AllTrans from './components/AllTrans'
  
 function App() {

 const router = createBrowserRouter([{
  path: '/',
  element: <Applayout/>,
  children: [
    {
      path: '/',
      element: <Overview/>
    },
    {
      path: '/income',
      element: <Addincome/>
    }, {
      path: '/spend',
      element: <Expenses/>
    },
    {
      path: '/trans',
      element: <AllTrans/>
    }]
}
 ])

   return ( 
     <div className='bg-gray-900 text-gray-200 ' >
      <RouterProvider router={router} >
    <Applayout/>
      </RouterProvider>
     </div>
   )
 }
 
 export default App;