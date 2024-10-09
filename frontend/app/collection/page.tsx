"use client";

import Title from "@/components/Title";
import { FormEvent, useEffect} from "react";
import { MdArrowForwardIos } from "react-icons/md";
import { Products } from "@/utils/datas";
import { ProductItem } from "@/components/ProductItem";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setAllProducts, setCategory, setSortType, setSubCategory, toggleShowFilter } from "@/features/ProductSlice";







const collectionPage = () => {


    const dispatch = useDispatch();
    const showFilter = useSelector((state: RootState) => state.products.showFilter);
    const allProducts = useSelector((state: RootState) => state.products.allProducts);
    const category = useSelector((state: RootState) => state.products.category);
    const subcategory = useSelector((state: RootState) => state.products.subcategory);
    const sortType = useSelector((state: RootState) => state.products.sortType);
    const search = useSelector((state: RootState) => state.products.search);
    const showSearch = useSelector((state: RootState) => state.products.showSearch);



   
   
    const toggleCategory = (e: FormEvent<HTMLInputElement>) => {
        const value = (e.target as HTMLInputElement).value;
    
        const newCategories = category.includes(value)
            ? category.filter(item => item !== value)
            : [...category, value];
    
        dispatch(setCategory(newCategories));
    };
    
    const toggleSubCategory = (e: FormEvent<HTMLInputElement>) => {
        const value = (e.target as HTMLInputElement).value;
    
        const newSubCategories = subcategory.includes(value)
            ? subcategory.filter(item => item !== value)
            : [...subcategory, value];
    
        dispatch(setSubCategory(newSubCategories));
    };
    
   

    const applyFilter=()=>{
        let productsCopy= Products.slice(); //creates a copy

        if (showSearch && search){
            productsCopy= productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))   
        }
        if(category.length > 0){
            productsCopy= productsCopy.filter(item => category.includes(item.category))
        }

        if(subcategory.length > 0){
            productsCopy= productsCopy.filter(item => subcategory.includes(item.SubCategory))

        }

        dispatch(setAllProducts(productsCopy))
    };

    
    const sortProduct =()=>{

        let fpcopy= allProducts.slice();

        switch(sortType){
            case "low-high":
                dispatch(setAllProducts(fpcopy.sort((a,b)=> (a.price - b.price))))
                break;
            case "high-low":
                dispatch(setAllProducts(fpcopy.sort((a,b)=> b.price - a.price)))
                break;

            default:
             applyFilter();
             break;
        }
    }


   useEffect(()=>{
    applyFilter()
   },[category,subcategory,search,showSearch])

     
   useEffect(()=>{
      sortProduct();
   },[sortType])

    return (
        <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
           
           {/**filter options */}
            <div className="min-w-60">
                <p className="my-2 text-xl flex items-center cursor-pointer gap-2"
                 onClick={()=> dispatch(toggleShowFilter())}>
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
                    <select className="border-2 border-gray-300 text-sm px-2" onChange={(e)=> dispatch(setSortType(e.target.value))}>
                        <option value="relavent">Sort by: Relavent</option>
                        <option value="low-high">Sort by: Low to High</option>
                        <option value="high-low">Sort by: High to Low</option>
                    </select>
                </div>

                  
                  {/**All collections  */}

                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
                     {
                        allProducts.map((item,index)=> (
                            <ProductItem id={item.id} name={item.name} image={item.image[0]} price={item.price} key={index}/>
                        ))
                     }
                  </div>

            </div>

        </div>
    );
};

export default collectionPage; 