
import React, { useEffect, useState } from 'react'
import Title from './Title';
import { ProductItem } from './ProductItem';
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";


interface AllCategories{
    category: string | undefined;
    subCategory:string | undefined;
}
type Product = {
    id: string;
    bestseller: boolean;
    category: string;
    date: number;
    description: string;
    image: string[];
    name: string;
    price: number;
    sizes: string[];
    SubCategory: string;
  };

export const RelatedProducts = ({category,subCategory}: AllCategories) => {

    
   const [related,setRelated]=useState<Product[]>([])
   const allproducts=useSelector((state:RootState) => state.products.allProducts)

   useEffect(() => {
    if (allproducts.length > 0) {
      let productscopy = allproducts.slice();
  
      
      productscopy = productscopy.filter((item) => category?.toLowerCase() === item.category.toLowerCase());
      productscopy = productscopy.filter((item) => subCategory?.toLowerCase() === item.SubCategory.toLowerCase());
  
      setRelated(productscopy.slice(0, 5));
    }
  }, [category, subCategory]);

  return (
    <div className='my-24'>
        <div className='text-center text-3xl py-2'>
            <Title text1={'RELATED'} text2={'PRODUCTS'}/>
        </div>

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
           {related.map((item,index)=> (
              <ProductItem id={item.id} image={item.image[0]} name={item.name} price={item.price} key={index}/>
           ))}
        </div>




    </div>
  )
}
