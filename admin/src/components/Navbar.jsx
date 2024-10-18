import React from 'react'
import {assets} from "../assets/assets"
import { FiSearch } from "react-icons/fi";


const Navbar = () => {
  return (
    <div className='flex items-center justify-between py-2 px-[4%]'>
      <img src={assets.logo} alt=''
       className='w-[max(10%,80px)]'
      />
      <span className="relative w-1/2 max-w-lg hidden md:block">
        <input type='text' placeholder='Search...' className="w-full px-4 py-2 text-sm rounded-2xl bg-transparent border-2 border-gray-400 outline-none focus:ring-1 focus:ring-gray-600"/>
        <FiSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
      </span>
      
      <button className='bg-gray-600 text-white px-5 py-1 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'>
         Logout
      </button>
    </div>
  )
}

export default Navbar