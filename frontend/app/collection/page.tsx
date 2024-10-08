"use client"
import Title from "@/components/Title";
import { FormEvent, useEffect, useState } from "react";
import { MdArrowForwardIos } from "react-icons/md";
import { Products } from "@/utils/datas";
import { ProductItem } from "@/components/ProductItem";


interface products{
    id: string;
    bestseller: boolean;
    category: string;
    date: 35647345437,
    description:string;
    image: string;
    name:string;
    price: number;
    sizes: string[];
    SubCategory: string
}

// export async function getStaticProps() {
//     try {
//         const res = await fetch('YOUR_API_ENDPOINT'); // Replace with your actual API endpoint

//         if (!res.ok) {
//             throw new Error('Failed to fetch data');
//         }

//         const data = await res.json();

//         return {
//             props: { data }, // Pass data to the page component
//             revalidate: 60,  // Optional: Revalidate the page every 60 seconds (ISR)
//         };
//     } catch (error) {
//         console.error(error); // Log the error for debugging
//         return {
//             props: { data: [] }, // Provide a fallback if the fetch fails
//         };
//     }
// }

const collectionPage = () => {

   const [showFilter,setShowFilter]=useState(false)
   const [AllProducts,setAllProducts]=useState<products[] | []>([])
    const [category,setCategory]=useState<string[]>([])
    const [subcategory,setSubCategory]=useState<string[]>([])

   

    const toggleCategory =(e: FormEvent<HTMLInputElement>)=>{
        const value=(e.target as HTMLInputElement).value;
      if(category.includes(value)){
         setCategory(prev => prev.filter(item => item !== value))
      }else{
        setCategory(prev=> [...prev,value])
      }
    };

    const toggleSubCategory=(e: FormEvent<HTMLInputElement>)=>{
        const value=(e.target as HTMLInputElement).value;
        if(subcategory.includes(value)){
           setSubCategory(prev => prev.filter(item => item !== value))
        }else{
            setSubCategory(prev=> [...prev,value])
        }
    };

    const applyFilter=()=>{
        let productsCopy= Products.slice(); //creates a copy
        if(category.length > 0){
            productsCopy= productsCopy.filter(item => category.includes(item.category))
        }

        if(subcategory.length > 0){
            productsCopy= productsCopy.filter(item => subcategory.includes(item.SubCategory))

        }

        setAllProducts(productsCopy as products[])
    }


   useEffect(()=>{
    applyFilter()
   },[category,subcategory])


    return (
        <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
           
           {/**filter options */}
            <div className="min-w-60">
                <p className="my-2 text-xl flex items-center cursor-pointer gap-2"
                 onClick={()=> setShowFilter(!showFilter)}>
                    FILTERS <MdArrowForwardIos size={16} className={`text-gray-300 sm:hidden ${showFilter ? "rotate-90" : ""}`}/>
                </p>

                <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? " " : "hidden"} sm:block`}>
                    <p className="mb-3 text-sm font-medium">CATEGORIES</p>
                    <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                      <p className="flex gap-2">
                         <input type="checkbox" value={'Men'} className="w-3" onChange={toggleCategory}/> Men
                      </p>
                      <p className="flex gap-2">
                         <input type="checkbox" value={'Women'} className="w-3" onChange={toggleCategory}/> Women
                      </p>
                      <p className="flex gap-2">
                         <input type="checkbox" value={'Kids'} className="w-3" onChange={toggleCategory}/> Kids
                      </p>
                    </div>
                </div>

                    
               
                <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? " " : "hidden"} sm:block`}>
                    <p className="mb-3 text-sm font-medium">TYPE</p>
                    <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                      <p className="flex gap-2">
                         <input type="checkbox" value={'Topwear'} className="w-3" onChange={toggleSubCategory}/> Topwear
                      </p>
                      <p className="flex gap-2">
                         <input type="checkbox" value={'Bottomwear'} className="w-3"  onChange={toggleSubCategory}/> Bottomwear
                      </p>
                      <p className="flex gap-2">
                         <input type="checkbox" value={'Winterwear'} className="w-3"  onChange={toggleSubCategory}/> Winterwear
                      </p>
                    </div>
                </div>

            </div>


            {/**rightside */}

            <div className="flex-1">

                <div className="flex justify-between text-base sm:text-2xl mb-4">
                    <Title text1={'ALL'} text2={"COLLECTIONS"}/>

                    {/**Sort by price */}
                    <select className="border-2 border-gray-300 text-sm px-2">
                        <option value="relavent">Sort by: Relavent</option>
                        <option value="low-high">Sort by: Low to High</option>
                        <option value="high-low">Sort by: High to Low</option>
                    </select>
                </div>

                  
                  {/**All collections  */}

                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
                     {
                        AllProducts.map((item,index)=> (
                            <ProductItem id={item.id} name={item.name} image={item.image} price={item.price} key={index}/>
                        ))
                     }
                  </div>

            </div>

        </div>
    );
};

export default collectionPage; 