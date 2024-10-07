
import React from 'react'





const Hero: React.FC = () => {




  return (
    <div className='flex flex-col sm:flex-row border border-gray-400 mt-5 sm:mt-2'>

       <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
                <div className='text-[#414141]'>
                    <div className='flex items-center gap-2'>
                        <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
                        <p className='font-medium text-sm md:text-base'>OUR BESTSELLERS</p>
                    </div>

                     <h1 className='text-3xl sm:py-3 lg:text-5xl leading-relaxed'>Latest Arrivals</h1>
                     <div className='flex items-center gap-2'>
                        <p className='font-semibold text-sm md:text-base'>SHOP NOW</p>
                        <p className='w-8 md:w-11 h-[1px] bg-[#414141]'></p>
                     </div>
                </div>
       </div>


         {/**right side */}
           
        <img src='/d1.jpg' alt='hero-img' className='w-full sm:w-1/2'/>

       

    </div>
  )
}

export default Hero