import React from 'react'
import Home from './Home.jsx/Home'
import Course from './components/Course'
import { Routes, Route, Navigate } from "react-router-dom"
import Navbar from './components/Navbar'
import SignUp from './components/SignUp'
import Login from './components/Login'
import { Toaster } from "react-hot-toast"
import { useAuth } from './context/AuthProvider'
import Upload from './components/Upload'
import Profile from './components/Profile'
import Contact from './components/Contact'
import Recommend from './components/Recommend'
function App() {

  const { authUser, setAuthUser } = useAuth()
  console.log(authUser)

  return (

    <>



      <div><Toaster /></div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/course" element={authUser ? <Course /> : <Navigate to="/signup" />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/Upload" element={<Upload />} />
        <Route path="/profile" element={authUser ? <Profile /> : <Navigate to="/signup" />}></Route>
        <Route path="/recommend" element={<Recommend />}></Route>
        
      </Routes>


    </>
  )
}

export default App