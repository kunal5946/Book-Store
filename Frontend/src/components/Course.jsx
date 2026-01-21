import React from 'react'
import Footer from './Footer'
import List from '../../public/list.json'
import Cards from './Cards'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'
const Course = () => {
    console.log(List);
  return (
    <>
    <Navbar/>
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 ">
        <div className='mt-28  text-center' >
            <h1 className="text-2xl md:text-4xl">welcome ,we are happy to have you <span className= "font-bold text-blue-500">here!</span></h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 ">
        
            {
                List.map(
                    (item)=>{
                        const paidItem= {...item, category:'paid'};
                        return(
                        <div className= "transform transition-transform hover:scale-105 duration-300" key={paidItem.id}>
                            <Cards item={paidItem} />
                        </div>
                        );
                    }
                    )
            
            }

        </div>

        <div className='flex justify-center mt-20 mb-10'>
            <Link to="/" className="btn bg-pink-500 px-2 py-2 hover:bg-red-500 shadow-xl shadow-black/30 transform transition-transform duration-300 hover:scale-110">
                Back
            </Link>

        </div>
        
    </div>
    <Footer/>
    </>
  )
}

export default Course