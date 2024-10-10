"use client"
import { RootState } from '@/store/store'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

 const Cartpage = () => {

    const dispatch=useDispatch()
    const products=useSelector((state:RootState) => state.products.allProducts)
    const Cartitems=useSelector((state:RootState) => state.cart.cartItems)
    var currency="₹";
    
    const [cartdata,setCartData]=useState([])


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
            console.log(tempData);
            
    },[Cartitems])

  return (
    <div>

    </div>
  )
}

export default Cartpage; 