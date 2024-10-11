import { CartTotal } from '@/components/CartTotal'
import Title from '@/components/Title'
import React from 'react'

const PlaceOrderpage = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-between  gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
          <div className='text-xl sm:text-2xl my-3'>
                <Title text1={'DELIVERY'} text2={'INFORMATION'}/>
          </div>
          <div className='flex gap-3'>
             <input type="text" placeholder='First name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full'/>
             <input type="text" placeholder='Last name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full'/>
          </div>

           <input type="email" placeholder='Email address' className='border border-gray-300 rounded py-1.5 px-3.5 w-full'/>
            <input type="text" placeholder='Street' className='border border-gray-300 rounded py-1.5 px-3.5 w-full'/>
        
            <div className='grid grid-cols-2 gap-3'>
             <input type="text" placeholder='City' className='border border-gray-300 rounded py-1.5 px-3.5 w-full'/>
             <input type="text" placeholder='State' className='border border-gray-300 rounded py-1.5 px-3.5 w-full'/>
             <input type="number" placeholder='Zipcode' className='border border-gray-300 rounded py-1.5 px-3.5 w-full'/>
             <input type="text" placeholder='Country' className='border border-gray-300 rounded py-1.5 px-3.5 w-full'/>
            </div>

            <input type="number" placeholder='Phone' className='border border-gray-300 rounded py-1.5 px-3.5 w-full'/>
             
      </div>


      {/**-----------Right side------------ */}

        <div className='mt-8'>
          <div className='mt-8 min-w-80'>
            <CartTotal/>
          </div>

          <div className='mt-12'>
              <Title text1={'PAYMENT'} text2={'METHOD'}/>
              <div className='flex gap-3 flex-col lg:flex-row'>

              </div>
          </div>
        </div>

    </div>
  )
}

export default PlaceOrderpage