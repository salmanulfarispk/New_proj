"use client"
import Title from '@/components/Title'
import { RootState } from '@/store/store'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RiDeleteBin6Line } from "react-icons/ri";
import { CartTotal } from '@/components/CartTotal'
import { useRouter } from 'next/navigation'


 const Cartpage = () => {

    
    const products=useSelector((state:RootState) => state.products.allProducts)
    const Cartitems=useSelector((state:RootState) => state.cart.cartItems)
    var currency="₹";
    
    const [cartdata,setCartData]=useState([])
    const router=useRouter()


    useEffect(()=>{
        const tempData=[];
        for(const items in Cartitems){
            for(const item in Cartitems[items]){
                if(Cartitems[items][item] > 0){
                    tempData.push({
                        id:items,
                        size:item,
                        quantity: Cartitems[items][item]
                    })
                }
            }
        }
           setCartData(tempData as any)
            console.log(tempData);
            
    },[Cartitems])

  return (
    <div className='border-t pt-14'>
       <div className='text-2xl mb-3'>
         <Title text1={'YOUR'} text2={'CART'}/>
       </div>

       <div className='max-h-[65vh] sm:max-h-[100vh] overflow-y-auto'>
          {
            cartdata.map((item:any,index)=>{
                const productData = products.find((product)=> product.id === item.id);

                return (
                    <div key={index} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
                        <div className='flex items-start gap-6'>
                            <img src={productData?.image[0]} alt='img' 
                             className='w-16 sm:w-20'
                            />
                            <div>
                                <p className='text-xs sm:text-lg font-medium'>{productData?.name}</p>
                                <div className='flex items-center gap-5 mt-2'>
                                    <p>{currency}{productData?.price}</p>
                                    <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>{item.size}</p>
                                </div>
                            </div>
                        </div>

                          <input type='number' min={1} max={12} defaultValue={item.quantity}
                           className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1'
                          />
                          <RiDeleteBin6Line className='cursor-pointer mr-4 text-gray-500' size={24}/>
                    </div>
                )
            })
          }
       </div>

       <div className='flex justify-end my-20 '>
        <div className='w-full sm:w-[450px]'>
         <CartTotal/>
         <div className='w-full text-end'>
            <button className='bg-black text-white text-sm my-8 px-8 py-3' onClick={()=>  router.push("/cart/place-order")}>
                PROCEED TO CHECKOUT
            </button>
         </div>
        </div>          
       </div>



    </div>
  )
}

export default Cartpage; 