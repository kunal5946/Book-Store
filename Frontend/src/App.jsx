import React from 'react'
import Home from './Home.jsx/Home'
import Course from './components/Course'
import {Routes,Route} from "react-router-dom"
import Navbar from './components/Navbar'

function App() {
  return (
    <>
    <Navbar/>
    

    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/course" element ={<Course/>}/>
    </Routes>
    </>
  )
}

export default App