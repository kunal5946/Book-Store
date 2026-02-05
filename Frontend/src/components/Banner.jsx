import React from 'react'
import banner from "../../public/bookss.jpg"
const Banner = () => {
  return (
    <>
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 py-10 flex flex-col md:flex-row my-10">
    
        <div className='w-full md:w-1/2  mt-12 md:mt-32 order-2 md:order-1'>
           <h1 className="text-4xl font-bold"><span className="text-pink-500">Hello</span> , learn something new everyday !</h1>
           <div className="join  mt-12  md:mt-20">
                
               
            </div>
        </div>
        
        <div className='w-full md:w-1/2 order-1 md:order-2'>
            <img  src={banner} className=""alt=""/>
        </div>
        
    </div>
    
    </>
  )
}

export default Banner   