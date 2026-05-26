import React from 'react'
import Footer from './Footer'
import List from '../../public/list.json'
import Cards from './Cards'
import CardSkeleton from './CardSkeleton'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import axios from "axios"
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast'
import TextType from './TextType';

const Course = () => {
    const navigate = useNavigate()

    const [book, setBook] = useState([])
    const [loading, setLoading] = useState(true)

    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        
        const getBook = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/book`
                   
                )
                console.log(res.data)
                setBook(res.data)
                setLoading(false)
            } catch (error) {
                console.log(error)
                setLoading(false)
                if (error.response && error.response.status == 401) {
                    toast.error("Session expired. Please login again")
                    localStorage.removeItem("Users")
                   
                    navigate("/signup")
                }
            }
        }
        getBook();
    }, [])

    const searchedBooks =
        book.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))



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
                <br />
                <br />
                <div className="mt-8 mb-8 text-center">
                    <button
                        onClick={() => navigate("/Upload")}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-lg transition-transform transform hover:scale-105"
                    >
                        Contribute a Book
                    </button>
                </div>
                <br />

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 ">

                    {loading ? (
                        Array.from({ length: 8 }).map((_, index) => (
                            <div key={index}>
                                <CardSkeleton />
                            </div>
                        ))
                    ) : (
                        searchedBooks.map(
                            (item) => {
                                const paidItem = { ...item, category: 'paid' };
                                return (
                                    <div className="transform transition-transform hover:scale-105 duration-300" key={paidItem.id || item._id}>
                                        <Cards item={paidItem} />
                                    </div>
                                );
                            }
                        )
                    )}

                </div>

                <div className='flex justify-center mt-20 mb-10'>
                    <Link to="/" className="btn bg-pink-500 px-2 py-2 hover:bg-red-500 shadow-xl shadow-black/30 transform transition-transform duration-300 hover:scale-110">
                        Back
                    </Link>

                </div>

            </div>
            <Footer />
        </>
    )
}

export default Course