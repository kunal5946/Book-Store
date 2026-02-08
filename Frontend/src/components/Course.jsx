import React from 'react'
import Footer from './Footer'
import List from '../../public/list.json'
import Cards from './Cards'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import axios from "axios"
import  { useState, useEffect } from 'react';
import toast from 'react-hot-toast'
import TextType from './TextType';

const Course = () => {
    const navigate=useNavigate()
    
    const [book,setBook]= useState([])
    
    const[searchTerm,setSearchTerm]=useState("")

    useEffect(()=>{
        const token=localStorage.getItem("token")
        const getBook=async ()=>{
            try {
               const res= await axios.get("http://localhost:4000/book",{
                headers:{
                    Authorization: `Bearer ${token}`,
                },
               })
               console.log(res.data)
               setBook(res.data)
            } catch (error) {
                console.log(error)
                if(error.response && error.response.status==401){
                    toast.error("Session expired. Please login again")
                    localStorage.removeItem("Users")
                    localStorage.removeItem("token")
                    navigate("/signup")
                }
            }
        }
        getBook();
    },[])

    const searchedBooks=
        book.filter((item)=>item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    

    
  return (
    <>
    <Navbar onSearch={setSearchTerm} />
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 ">
        <div className='mt-28  text-center' >
            <h1 className="text-2xl md:text-4xl">
                <TextType 
                    text={["welcome ,we are happy to have you here ! "]}
                    typingSpeed={75}
                    pauseDuration={1500}
                    showCursor
                    cursorCharacter="_"
                    
                    deletingSpeed={50}
                    variableSpeedEnabled={false}
                    variableSpeedMin={60}
                    variableSpeedMax={120}
                    cursorBlinkDuration={0.5}
                    />  
                 
                </h1>
        </div>
        <br/>
        <br/>
        <div >
           <div className="hover-3d ">
                {/* content */}
                <figure className="max-w-100 rounded-2xl">
                    <button
                        onClick={()=>navigate("/Upload")}
                        className="shadow-xl bg-blue-500 text-white  px-4 py-5 rounded transition transform:transition hover:scale-5px "
                    >
                    Contribute a  Book
                    </button>

                </figure>
                {/* 8 empty divs needed for the 3D effect */}
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                </div>
        </div>
        <br/>
       
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 ">
        
            {
                searchedBooks.map(
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