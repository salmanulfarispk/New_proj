import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios';
import { Commet } from "react-loading-indicators"
import { toast } from 'react-toastify';
import { backendUrl } from '../App';




const List = ({token}) => {

    const queryClient=useQueryClient()
    
    const {data: AllProducts,isLoading}=useQuery({
      queryKey:["allproducts"],
      queryFn: async()=>{
         try {
          const response=await axios.get(backendUrl+"/api/admin/list-allproducts")
   
            if(response.data.success){

              return response.data.products;
             
            }else{
              toast.error(response.data.message)
            }
          

         } catch (error) {
          console.log(error);
          throw new Error(error)
          
         }
      }
    });

    const {mutate: deleteProduct}=useMutation({
       mutationFn: async(productId)=>{
         try {
            const res=await axios.post(backendUrl+"/api/admin/remove-product",{id:productId},{
               headers: { token },
            });

               return res.data;
            
         } catch (error) {
          console.log(error);
          throw new Error(error)
         }
       },
       onSuccess:()=>{
         toast.success("product deleted ...")
         queryClient.invalidateQueries({ queryKey: ["allproducts"]});
       },
       onError: (error)=>{
        toast.error(error.message);
       }

    });


     

    if (isLoading) {
      return <div className='flex items-center justify-center'>
        <Commet color="#9e34ee" size="small"/>
      </div>;
    }


  return (
    <>
     <p className='mb-2'>All Products List</p>
     {/**----in desktop view----- */}
     <div className='hidden md:flex flex-col gap-2'>

       <div className='grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
         <b>Image</b>
         <b>Name</b>
         <b>Category</b>
         <b>Price</b>
         <b>Action</b>
       </div>

       {
        AllProducts && AllProducts.map((item,index)=>(
           <div key={index} className='grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm'>
              <img src={item.image[0]} alt='product-image' className='w-20'/>
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>₹{item.price}</p>
              <p className='text-start ms-3 text-lg cursor-pointer'onClick={()=> deleteProduct(item._id)}>
                  X 
              </p>
           </div>
        ))
       }


     </div>
      
        
    </>
  )
}

export default List