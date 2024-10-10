"use client"
import { DescriptionReview } from "@/components/DescriptionReview";
import { RelatedProducts } from "@/components/RelatedProducts";
import { addToCart } from "@/features/CartSlice";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";



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

    const dispatch=useDispatch<AppDispatch>()
    const allproducts=useSelector((state:RootState) => state.products.allProducts)
    const cartitems=useSelector((state:RootState) => state.cart.cartItems)
     const [productData,setProductData]=useState<Product | null>(null)
     const [image,setImage]=useState('')
     const [selectedImage, setSelectedImage] = useState(""); 
     const [size,SetSize]=useState('')
      
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
     

     useEffect(()=>{
       console.log(cartitems);

     },[cartitems])

    return (
      <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
        <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">

            <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
                <div className="flex sm:flex-col overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
                    {
                        productData && productData.image.map((item,index)=>(
                           <img src={item}  key={index} className={`w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer ${ item === selectedImage ? "border-2 border-slate-200 transition-all ease-in duration-200" : ""}`}
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
                    <p className="mt-5 text-gray-500 md:w-4/5">
                        {productData?.description}
                    </p>
                    <div className="flex flex-col gap-4 my-8">
                        <p className="">Select Size</p>
                         <div className="flex gap-2">
                           {productData?.sizes.map((item,index)=>(
                            <button key={index} className={`border py-2 px-4 bg-gray-100 ${item === size ? "border-2 border-orange-500" : ""}`}
                             onClick={()=> SetSize(item)}
                            >
                                {item}
                            </button>
                           ))}
                         </div>
                    </div>

                    <button className="bg-black text-white px-8 py-3 text-sm  active:bg-gray-700"
                     onClick={()=> {
                        if(productData){
                            dispatch(addToCart(productData.id, size));
                        }
                     }}
                    >
                        ADD TO CART
                    </button>
                   
                   <hr className="mt-8 sm:w-4/5 "/>
                   <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
                           <p>100% Original product.</p>
                           <p>Cash on delivery is available on this product.</p>
                           <p>Easy return and exchange policy within 7 days.</p>
                   </div>
                </div>
        </div>



             {/**----description and review-----*/}
            <DescriptionReview />
             
             {/**----Related products -----*/}

             <RelatedProducts category={productData?.category} subCategory={productData?.SubCategory}/>

      </div>
    );
  };
  
  export default ProductPage;