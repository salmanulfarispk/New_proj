import React from 'react'

const Login = () => {
  return (
    <div className='min-h-screen flex items-center justify-center w-full'>
        <div className='bg-white shadow-md  rounded-lg px-8 py-6 max-w-md'>
            <h1 className='text-2xl font-bold mb-4'>Admin Panel</h1>
            <form>
                <div className='mb-3 min-w-72'>
                    <p>Email Address</p>
                    <input type='email' placeholder='your@email.com' required
                      className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none'
                     />
                </div>
                <div className='mb-3 min-w-72'>
                    <p>Password</p>
                    <input type='password' placeholder='Enter your password' required
                      className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none'
                    />
                </div>
                <button type='submit' className='mt-2 w-full py-2 px-4 rounded-md text-white bg-black'>
                    Login
                </button>
            </form>
        </div>
    </div>
  )
}

export default Login