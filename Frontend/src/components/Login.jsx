    import React from 'react'
    import { Link } from 'react-router-dom'
    import {useForm} from "react-hook-form"
    const Login = () => {

       const{
        register,
        handleSubmit,
        formState:{errors},
       }=useForm();

       const onSubmit=(data)=>console.log(data);

    return (
        <div>
            <dialog id="login_modal" className="modal">
                <div className="modal-box">
                    <form onSubmit={handleSubmit(onSubmit)} method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <Link to="/" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={()=>document.getElementById("login_modal").close()}>✕</Link>
                    
                    <h3 className="font-bold text-lg">Login</h3>

                    {/*email*/}
                    <div className="mt-9 space-y-1">
                    <span >Email</span>
                    <br></br>
                    <input type="email" placeholder='Enter your email' className="w-80 p-2 border rounded-md outline-none"
                    {...register("email",{required:true})}/>
                    <br/>
                    {errors.email && <span className="text-sm text-red-500">This field is required</span>}

                    </div>

                    {/*password*/}
                    <div className="mt-9 space-y-1">
                    <span >Password</span>
                    <br></br>
                    <input type="password" placeholder='Enter your password' className="w-80 p-2 border rounded-md outline-none"
                    {...register("password",{required:true})}/>
                    <br/>
                     {errors.password && <span className="text-sm text-red-500">This field is required</span>}
                    </div>
                        
                    {/*login*/}

                    <div className="mt-10 flex justify-between">
                        <button className=" bg-green-200 border-none rounded p-2 w-20 transition transform-transition hover:scale-105 hover:bg-green-500">Login</button>
                        <div >
                            <p className="mt-4 ">Not registered? <Link to="/signup" className="underline text-blue-500 cursor-pointer">Sign up</Link></p>
                        </div>
                        

                    </div>
                    </form>
                </div>
            </dialog>
            
        </div>
    )
    }

    export default Login