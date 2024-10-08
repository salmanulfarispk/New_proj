"use client"
import { useState } from "react";
import { MdArrowForwardIos } from "react-icons/md";


const collectionPage = () => {

   const [showFilter,setShowFilter]=useState(false)

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
                         <input type="checkbox" value={'Men'} className="w-3" /> Men
                      </p>
                      <p className="flex gap-2">
                         <input type="checkbox" value={'Women'} className="w-3" /> Women
                      </p>
                      <p className="flex gap-2">
                         <input type="checkbox" value={'Kids'} className="w-3" /> Kids
                      </p>
                    </div>
                </div>

                    
               
                <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? " " : "hidden"} sm:block`}>
                    <p className="mb-3 text-sm font-medium">TYPE</p>
                    <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                      <p className="flex gap-2">
                         <input type="checkbox" value={'Topwear'} className="w-3" /> Topwear
                      </p>
                      <p className="flex gap-2">
                         <input type="checkbox" value={'Bottomwear'} className="w-3" /> Bottomwear
                      </p>
                      <p className="flex gap-2">
                         <input type="checkbox" value={'Winterwear'} className="w-3" /> Winterwear
                      </p>
                    </div>
                </div>

            </div>


            {/**rightside */}

        </div>
    );
};

export default collectionPage; 