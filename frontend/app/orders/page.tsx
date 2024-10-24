"use client"
import Title from "@/components/Title";
import { useQuery } from '@tanstack/react-query';
import axios from "axios";
import React from "react";
import { toast } from "react-toastify";
import { backendUrl } from "../page";

const orderpage = () => {
  var currency = "₹";

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  

  const {data: Orders,refetch}=useQuery({
    queryKey:["orders"],
    queryFn: async()=>{
      
       try {
        if (!token) {
          toast.info("Please Login...");
          return [];
        }
        const  res= await axios.post(backendUrl+"/api/order/user-orders",{},{ headers: {token}})
        if(res.data.success){
            let allOrdersItem:any=[];
             res.data.orders.map((order:any)=>{
               order.items.map((item:any)=> {
                item['status']=order.status
                item['payment']=order.payment
                item['paymentMethod']=order.paymentMethod
                item['date']=order.date
                allOrdersItem.push(item)
               })
             })

             return allOrdersItem.reverse()
        }else{
          toast.error(res.data.message)
          return [];
        }
        
       } catch (error) {
        console.log(error);
       }
    },
    enabled: !!token, 

  });
  


  const handleTrackOrder = async () => {
      await refetch();
  };

  return (
    <div className="border-t pt-16">
      <div className="text-2xl ">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      <div>
        {Orders &&
          Orders.map((item:any, index:any) => (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <div className="flex items-start gap-6 text-sm">
                <img
                  src={item.image[0]}
                  alt="pro-img"
                  className="w-16 sm:w-20"
                />
                <div>
                <p className="sm:text-base font-medium">{item.name}</p>
                <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
                  <p>
                    {currency}
                    {item.price}
                  </p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Size: {item.size}</p>
                </div>

                <p className="mt-2">
                  Date: <span className="text-gray-400">{new Date(item.date).toDateString()}</span>
                </p>
                <p className="mt-2">
                   Payment: <span className="text-gray-400">{item.paymentMethod}</span>
                </p>
              </div>
            </div>

            <div className="md:w-1/2 flex justify-end gap-10 md:justify-between">
               <div className="flex items-center gap-2 ">
                <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                <p className="text-sm md:text-base ">{item.status}</p>
               </div>
               <button className="border px-4 py-2 text-sm font-medium rounded-sm " onClick={handleTrackOrder}>
                Track Order
               </button>
            </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default orderpage;
