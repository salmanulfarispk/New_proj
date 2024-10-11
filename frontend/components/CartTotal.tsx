
import React from 'react'
import Title from './Title'
import { useSelector } from 'react-redux';
import { getCartAmount } from '@/features/CartSlice';


export const CartTotal = () => {

    var currency="₹";
    const totalAmount= useSelector(getCartAmount)

  return (
    <div className='w-full'>
      <div className='text-2xl'>
        <Title text1={'CART'} text2={'TOTALS'}/>
      </div>

      <div className='flex flex-col gap-2 mt-2 text-sm'>
        <div className='flex justify-between'>
            <p>Subtotal</p>
            <p>{currency}{totalAmount}.00</p>
        </div>
        <hr/>
        <div className='flex justify-between'>
                <p>Shipping Fee</p>
                <p>{currency}{40}.00</p>
        </div>
        <hr/>
        <div className='flex justify-between'>
            <b>Total</b>
            <b>{currency} {totalAmount === 0 ? 0 : totalAmount + 40}.00</b>
        </div>

      </div>

    </div>
  )
}
