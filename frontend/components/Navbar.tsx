"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation'; 
import { FiSearch } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa6";
import { IoCartOutline } from "react-icons/io5";


export const Navbar = () => {

  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <div className='flex items-center justify-between py-5 font-medium'>
      <img src='/logo.png' className='w-28' alt='Logo' />

      <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
        <Link href="/" className='flex flex-col items-center gap-1'>
          <span className={isActive('/') ? 'text-gray-900' : ''}>HOME</span>
          <hr className={`w-2/4 border-none h-[1.5px] bg-gray-700 ${isActive('/') ? 'block' : 'hidden'}`} />
        </Link>

        <Link href="/collection" className='flex flex-col items-center gap-1'>
          <span className={isActive('/collection') ? 'text-gray-900' : ''}>COLLECTION</span>
          <hr className={`w-2/4 border-none h-[1.5px] bg-gray-700 ${isActive('/collection') ? 'block' : 'hidden'}`} />
        </Link>

        <Link href="/about" className='flex flex-col items-center gap-1'>
          <span className={isActive('/about') ? 'text-gray-900' : ''}>ABOUT</span>
          <hr className={`w-2/4 border-none h-[1.5px] bg-gray-700 ${isActive('/about') ? 'block' : 'hidden'}`} />
        </Link>

        <Link href="/contact" className='flex flex-col items-center gap-1'>
          <span className={isActive('/contact') ? 'text-gray-900' : ''}>CONTACT</span>
          <hr className={`w-2/4 border-none h-[1.5px] bg-gray-700 ${isActive('/contact') ? 'block' : 'hidden'}`} />
        </Link>
      </ul>


      <div className='flex items-center gap-6'>
         <span>
         <FiSearch  className='cursor-pointer text-gray-700'size={18}/>
         </span>
         <div className='group relative'>
            <span>
           <FaRegUser className='cursor-pointer text-gray-700' size={16}/>
            </span>
            <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                      <p className='cursor-pointer hover:text-black'>My Profile</p>
                      <p className='cursor-pointer hover:text-black'>Orders</p>
                      <p className='cursor-pointer hover:text-black'>Logout</p>
                </div>
            </div>
         </div>

          <Link href='/cart' className='relative'>
             <span>
             <IoCartOutline className='cursor-pointer text-gray-700' size={22}/>
              <p className='absolute right-[-5px] bottom-[-2px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[7px]'>10</p>
             </span>
          </Link>



      </div>
    </div>
  );
};
