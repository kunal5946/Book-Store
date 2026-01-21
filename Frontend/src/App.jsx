import React from 'react'
import Home from './Home.jsx/Home'
import Course from './components/Course'
import {Routes,Route} from "react-router-dom"
import Navbar from './components/Navbar'
import SignUp from './components/SignUp'
import Login from './components/Login'

function App() {
  return (
    <>
    
    

    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/course" element ={<Course/>}/>
      <Route path="/signup" element={<SignUp/>}/>
      
    </Routes>
    </>
  )
}

export default App