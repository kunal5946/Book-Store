import React from 'react'
import banner from "../../public/bookss.jpg"
const Banner = () => {
  return (
    <>
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 py-10 flex flex-col md:flex-row my-10">
    
        <div className='w-full md:w-1/2  mt-12 md:mt-32 order-2 md:order-1'>
           <h1 className="text-4xl font-bold"><span className="text-pink-500">Hello</span> , learn something new everyday !</h1>
           <div className="join  mt-12  md:mt-20">
                <div>
                    <label className="input validator join-item">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="2.5"
                        fill="none"
                        stroke="currentColor"
                        >
                            <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                            </g>
                        </svg>
                        <input type="email" placeholder="mail@site.com" required />
                    </label>
                <div className="validator-hint hidden">Enter valid email address</div>
                </div>
                 <button className="btn btn-neutral join-item">Join</button>
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