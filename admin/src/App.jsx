import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Route,Routes } from "react-router-dom"
import Home from "./pages/Home"
import Add from "./pages/Add"
import List from "./pages/List"
import Orders from "./pages/Orders"
import Login from './pages/Login'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export const backendUrl= import.meta.env.VITE_BACKEND_URL;


const App = () => {


  const [token,setToken]=useState(localStorage.getItem("token") ? localStorage.getItem("token") : "")

  useEffect(()=>{

      localStorage.setItem("token",token)

  },[token])

  return (
    <div className='bg-purple-50/20 min-h-screen'>
      <ToastContainer/>
     
     { token === "" ? (
       <Login setToken={setToken}/>
     ):(

      <>
      <Navbar setToken={setToken}/>
       <hr/>
       <div className='flex w-full'>
         <Sidebar/>
         <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>
 
            <Routes>
 
             <Route path='/' element={<Home token={token}/>}/>
             <Route path='/add-product' element={<Add token={token}/>}/>
             <Route path='/list-product' element={<List  token={token}/>}/>
             <Route path='/order-details' element={<Orders token={token}/>}/>
 
            </Routes>
 
         </div>
       </div>
       </>

     )}


    </div>
  )
}

export default App