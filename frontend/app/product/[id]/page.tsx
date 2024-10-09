"use client"
import { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";



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

const ProductPage = ({ params }: { params: { id: string } }) => {

    const allproducts=useSelector((state:RootState) => state.products.allProducts)
     const [productData,setProductData]=useState<Product | null>(null)
     const [image,setImage]=useState('')
     const [selectedImage, setSelectedImage] = useState(""); 
      
      const fetchProductData= async()=>{
         
        allproducts.map((item)=>{
            if(item.id === params.id){
                setProductData(item as any)
                setImage(item.image[0])
                setSelectedImage(item.image[0]);
                
                return null;
            }

        })
      }
      
      useEffect(()=>{
        fetchProductData()
      },[params.id,allproducts])
    
      useEffect(() => {
        if (selectedImage) {
          setImage(selectedImage);
        }
      }, [selectedImage]);
     

    return (
      <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
        <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">

            <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
                <div className="flex sm:flex-col overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
                    {
                        productData && productData.image.map((item:any,index:number)=>(
                           <img src={item}  key={index} className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                           onMouseEnter={() => setImage(item)} 
                           onMouseLeave={() => setImage(selectedImage)}
                           onClick={() => setSelectedImage(item)}
                           />
                        ))
                    }
                </div>
                  <div className="w-full sm:w-[80%]">
                    <img src={image}  className="w-full h-auto"/>
                  </div>
            </div>


               {/**------product info----------- */}

                <div className="flex-1">
                    <h1 className="font-medium text-2xl mt-2">{productData?.name}</h1>
                    <div className="flex items-center gap-1 mt-2">
                        <img src="/star.png" alt="" className="w-3.5"/>
                        <img src="/star.png" alt="" className="w-3.5"/>
                        <img src="/star.png" alt="" className="w-3.5"/>
                        <img src="/star.png" alt="" className="w-3.5"/>
                        <img src="/halfStar.png" alt="" className="w-3.5"/>
                        <p className="pl-2">(122)</p>
                    </div>

                    <p className="mt-5 text-3xl font-medium">
                        ₹{productData?.price}
                    </p>
                </div>


        </div>
      </div>
    );
  };
  
  export default ProductPage;