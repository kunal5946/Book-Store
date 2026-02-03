import React from 'react'
import { useAuth } from '../context/AuthProvider'
import { useNavigate } from 'react-router-dom'
import toast from "react-hot-toast";

function Logout() {
  const {authUser,setAuthUser}=useAuth()
  const navigate=useNavigate()
  const handleLogout=()=>{
    
      try{
        toast.success("Logout successful")   

        setTimeout(() => {
          setAuthUser(null)                 
          localStorage.removeItem("Users")
          navigate("/")                      
        }, 500)    
      }
      catch(error){
        toast.error(error.message)
        
      }
    
  }
  return (
    <div>
      <button onClick={handleLogout} className="px-2 py-2 bg-red-500 text-white rounded-md cursor-pointer"> logout</button>
    </div>
  )
}

export default Logout
