import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import shareVideo from '../assets/share.mp4'
import logo from '../assets/logowhite.png'
import { client } from './client'
import defaultIcon from '../assets/favicon-2.png'
console.log(defaultIcon)
const Login = () => {

  const [redirect, setredirect] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loginError, setLoginError] = useState('')
  const [registrationActive, setRegistrationActive] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    pfp: null,
  })

  const registrationUI = (value) =>{
    setFormData({
        username: '',
        email: '',
        password: '',
        pfp: null,
      });
      setUsernameError('');
      setEmailError('')

      setRegistrationActive(value)
    }
  
  const registerUser = async (event) => {
    event.preventDefault()
    
    try{

      const existingUser = await client.fetch(`*[_type == "user" && username == $username][0]`, {
        username: formData.username,
      }); 
      
      const existingEmail = await client.fetch(`*[_type == "user" && email == $email][0]`, {
            email: formData.email,
      });

      if (existingUser) {
        setUsernameError('Username is already taken. Please choose another one.');
        return; // Stop further execution
      }

      if (existingEmail) {
          setEmailError('Email is already registered. Please use another email.');
          return; // Stop further execution
      }

      const newUserDoc = {
        _type: 'user',
        username: formData.username,
        email: formData.email,
        password: formData.password,
        pfp: formData.pfp ? URL.createObjectURL(formData.pfp):defaultIcon,    
      }
      await client.create(newUserDoc) 
      console.log('User registered and saved to Sanity:', formData);
      registrationUI(false)
    } 
    catch (error) {
      console.log(formData)
      console.error('Error registering user:', error.message)
    }
  }
    
  const loginUser = async (event) => {
    event.preventDefault();
    setLoginError(''); // Reset login error state

    try {
      const query = `*[_type == "user" && username == $username && password == $password][0]`;
      const user = await client.fetch(query, {
        username: formData.username,
        password: formData.password,
      });
  
      if (user) {
        localStorage.clear()
        console.log('User logged in:', user);
        localStorage.setItem('user', JSON.stringify(user));
        setredirect(true)
      } else {
        setLoginError('Invalid username or password');
      }
  
    } catch (error) {
      console.error('Failed to login user:', error)
      setLoginError('An error occurred while logging in');
    }
    
    
  }

  const InputChange = (event) => {
    const { name, value, type, files } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'file' ? files[0] : value,
    }))
    
    console.log(formData)
  };

  return (
    <>
    {redirect && <Navigate to="/" replace={true} />}
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

                <form className=' w-full h-full flex flex-col items-center justify-center text-centre bg-slate-200 rounded-md overflow-hidden px-4 py-2' onSubmit={registerUser}>    
                  <h1 className='mb-2 font-semibold text-lg'>Register</h1>
                  {formData.pfp && (
                    <img
                      src={URL.createObjectURL(formData.pfp) }
                      alt='Profile Preview'
                      className=' w-20 h-20 object-cover rounded-full mb-4 ' // Add your styles here
                    />
                  )}

                  <div className='shadow-xl shadow-inner w-60 justify-center' >
                  
                    <input
                      name="username"
                      className='w-full text-center placeholder:text-center mb-2 rounded-md' 
                      onChange={InputChange}
                      type="text"
                      placeholder="username" 
                      value={formData.username || ''} 
                      required 
                    />
                    {usernameError && <p className='text-red-500 text-xs'>{usernameError}</p>}

                    <input 
                      name="password"
                      className='w-full text-center placeholder:text-center mb-2 rounded-md' 
                      onChange={InputChange}
                      type="password" 
                      placeholder="password"
                      value={formData.password || ''} 
                      autoComplete='new-password'
                      required 
                    />

                    <input 
                      name="email"
                      className='w-full text-center placeholder:text-center mb-2 rounded-md' 
                       onChange={InputChange}
                      type="email" 
                      placeholder="Email" 
                      value={formData.email || ''} 
                      required 
                    /> 
                    {emailError && <p className='text-red-500 text-xs'>{emailError}</p>}

                    <input
                      className='w-full text-center placeholder:text-center mb-2 rounded-md bg-white'
                      type='file'
                      placeholder='Profile pic'
                      name='pfp'  
                      accept='.jpg,.jpeg,.png'
                      onChange={InputChange}
                      
                    />
                  </div>

                  <input 
                    className='w-full h-10 m-2 bg-slate-800 rounded-md shadow-xl font-semibold text-gray-100 pb-1 px-2  cursor-pointer hover:bg-indigo-200' 
                    type="submit" 
                    value="Register"
                    
                  />

                  <button 
                    className='w-full h-5 m-2 bg-slate-400 rounded-md shadow-xl font-semibold text-gray-100 pb-7 cursor-pointer hover:bg-slate-300' 
                    type='button' 
                    onClick={()=> registrationUI(false)}
                    > back
                  </button>

                </form>
            :
                <form 
                  className=' w-full h-full flex flex-col items-center justify-center bg-slate-200 rounded-md overflow-hidden px-4 py-2' 
                  onSubmit={loginUser}>    
                <h1 className='mb-2 font-semibold text-lg'>Login</h1>
              
                {loginError && <p className='mb-2 text-red-500 text-xs'>{loginError}</p>}

                <div className='shadow-xl shadow-inner w-60 justify-center' >
                 
                  <input 
                    className='w-full h-10 text-center placeholder:text-center mb-2 rounded-md' 
                    type="text" 
                    placeholder="username" 
                    name="username" 
                    required 
                    value={formData.username || ''} 
                    onChange={InputChange}
                    />

                  <input 
                    className='w-full h-10 text-center placeholder:text-center mb-2 rounded-md' 
                    type="password" 
                    placeholder="password" 
                    name="password" 
                    required 
                    value={formData.password || ''} 
                    onChange={InputChange}
                    autoComplete='current-password'
                  />
                </div>
                
                <input 
                  className='w-full h-10 m-1 bg-slate-800 rounded-md shadow-xl font-semibold text-gray-100 pb-1  cursor-pointer hover:bg-slate-700' 
                  type="submit" />
                <button 
                  className='w-full h-5 m-2 bg-slate-400 rounded-md shadow-xl font-semibold text-gray-100 pb-7 cursor-pointer hover:bg-slate-300' 
                  type='button' 
                  onClick={()=> registrationUI(true)}
                  >Register
                </button>

              </form>  
            }
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Login