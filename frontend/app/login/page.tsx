"use client"
import axios from 'axios'
import { backendUrl } from '../page'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import {
  setName,
  setEmail,
  setPassword,
  setCurrentState,
} from '@/features/userSlice';
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { useState } from 'react'


 const loginpage = () => {
  const [loading,setLoading]=useState(false)
  const router=useRouter()
  const dispatch=useDispatch()
  const { name, email, password, currentState } = useSelector((state: RootState) => state.user);

    const OnSubmitHandler= async(e:React.FormEvent<HTMLFormElement>)=>{
      e.preventDefault();

      try {

        if(currentState === 'Sign Up'){

          const res=await axios.post(backendUrl+'/api/user/register',{ name,email,password},{
            withCredentials: true 
          });

          if(res.data.success){
            setLoading(true)
            dispatch(setName(''))
            dispatch(setEmail(''))
            dispatch(setPassword(''))
            router.push("/")
          }else{
            toast.error(res.data.message)
          }
        
        
        }else{
         
          const res=await axios.post(backendUrl+'/api/user/login',{email,password},{
            withCredentials: true 
          });
           
          console.log(res.data);
          
          if(res.data.success){
            setLoading(true)
            dispatch(setEmail(''))
            dispatch(setPassword(''))
            router.push("/")
          }else{
            toast.error(res.data.message)
          }

        }
        
      } catch (error) {
        
      } finally {
       setLoading(false)
      }
    }

  return (
    <form onSubmit={OnSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
        <div className='inline-flex items-center gap-2 mb-2 mt-10'>
            <p className='font-prata text-3xl'>{currentState}</p>
            <hr className='border-none h-[1.5px] w-8 bg-gray-800 '/>
        </div>

        {currentState === "Login" ? "" : 
            <input type='text'placeholder='Name'
            onChange={(e) => dispatch(setName(e.target.value))} value={name}
            className='w-full px-3 py-2 border border-gray-800' required
           />
        }
      
         <input type='email'placeholder='Email'
         className='w-full px-3 py-2 border border-gray-800' required
         onChange={(e) => dispatch(setEmail(e.target.value))}  value={email}
        />
         <input type='password'placeholder='Password'
         className='w-full px-3 py-2 border border-gray-800' required
         onChange={(e) => dispatch(setPassword(e.target.value))} value={password}

        />

        <div className='w-full flex justify-between text-sm mt-[-8px] '>
           <p className='cursor-pointer '>Forgot your password?</p>
           {
            currentState === "Login" ? (
              <p className='cursor-pointer' onClick={() => dispatch(setCurrentState())}>Create account</p>
            ): (
              <p className='cursor-pointer' onClick={() => dispatch(setCurrentState())}>Login Here</p>
            )
           }
        </div>

        <button className='bg-black text-white font-light px-8 py-2 mt-4'>
         {loading ? "Submitting..." : (currentState === "Login" ? "Sign In" : "Sign Up")}
        </button>
    </form>
  )
}


export default loginpage