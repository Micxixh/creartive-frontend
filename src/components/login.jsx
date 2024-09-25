import React, { useState } from 'react'
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'
import { useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import shareVideo from '../assets/share.mp4'
import logo from '../assets/logowhite.png'
import sanityClient from '@sanity/client'



const Login = () => {

  const [registrationActive, setRegistrationActive] = useState(false)
  const [newUser, setnewUser] = useState()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    profileImage:null,
  });
  const registerUser = (event) => {
    setFormData()
   
   
  }

  return (
    <div className='flex justify-start items-center flex-col h-screen'>
      <div className='relative w-full h-full'>
        <video
          src={shareVideo}
          type = 'video/mp4'
          controls = {false}
          muted
          autoPlay
          className=' w-full h-full object-cover'
          loop
        />
        <div className=' absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay'>
          <div className='p-5'>
            <img src={logo} width='130px' alt='logo' />
          </div>
          <div className='shadow-2xl'>

          {registrationActive ? 
                <form className=' w-full h-full flex flex-col items-center justify-center bg-slate-200 rounded-md overflow-hidden px-4 py-2'>    
                  <h1 className='mb-2 font-semibold text-lg'>Register</h1>
                  <div className='shadow-xl shadow-inner w-60 justify-center' >
                    <input className='w-full text-center placeholder:text-center mb-2 rounded-md' type="text" placeholder="username" name="username" required />
                    <input className='w-full text-center placeholder:text-center mb-2 rounded-md' type="password" placeholder="password" name="password"required />
                    <input className='w-full text-center placeholder:text-center mb-2 rounded-md' type="email" placeholder="Email" name="Email"required /> 
                    <input className='w-full text-center placeholder:text-center mb-2 rounded-md bg-white' type="file" placeholder="Profile pic" name="pfp"accept=".jpg,.jpeg,.png," required />
                  </div>
                  <input className='w-full h-10 m-2 bg-slate-800 rounded-md shadow-xl font-semibold text-gray-100 pb-1 px-2  cursor-pointer hover:bg-indigo-200' type="submit" Value="Register" on onSubmit={registerUser()}/>
                  <button className='w-full h-5 m-2 bg-slate-400 rounded-md shadow-xl font-semibold text-gray-100 pb-7 cursor-pointer hover:bg-slate-300' onClick={()=> setRegistrationActive(false)}> back</button>
                </form>
            :
                <form className=' w-full h-full flex flex-col items-center justify-center bg-slate-200 rounded-md overflow-hidden px-4 py-2'>    
                <h1 className='mb-2 font-semibold text-lg'>Login</h1>
                <div className='shadow-xl shadow-inner w-60 justify-center' >
                  <input className='w-full h-10 text-center placeholder:text-center mb-2 rounded-md' type="text" placeholder="username" name="username" required />
                  <input className='w-full h-10 text-center placeholder:text-center mb-2 rounded-md' type="password" placeholder="password" name="password" required />
                </div>
                <input className='w-full h-10 m-1 bg-slate-800 rounded-md shadow-xl font-semibold text-gray-100 pb-1  cursor-pointer hover:bg-slate-700' type="submit" />
                <button className='w-full h-5 m-2 bg-slate-400 rounded-md shadow-xl font-semibold text-gray-100 pb-7 cursor-pointer hover:bg-slate-300' onClick={()=> setRegistrationActive(true)}> Register</button>
              </form>  
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login