import React,{useState, useRef, useEffect} from 'react'
import { HiMenu } from 'react-icons/hi'
import {AiFillCloseCircle} from 'react-icons/ai'
import {Link, Route, Routes} from 'react-router-dom'
import { userQuery } from '../utils/data'
import { Sidebar, UserProfile } from '../components/index'
import Pins from './Pins'
import { client } from '../components/client'
import logo from '../assets/logo.png'
import { urlFor } from '../utils/imageUrl'

const Home = () => {
  
  const [user, setUser] = useState(null)
  const [ToggleSidebar, setToggleSidebar] = useState(false)
  const scrollRef = useRef(null)
  const userInfo = localStorage.getItem('user') !== 'undefined'? 
    JSON.parse(localStorage.getItem('user')) 
    : null

  useEffect(()=>{
    if(userInfo?._id){
      const query = userQuery(userInfo._id)
      client.fetch(query).then(
        (data) =>setUser(data[0])
      )
    }
  },[userInfo])

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0)
  },[])

  return (
    <div className="flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out">
      
  
      <div className="hidden md:flex h-screen flex-initial">
        <Sidebar user={user && user}/>
      </div>
      
     
      <div className="flex md:hidden flex-row">
        <div className='p-2 w-full flex flex-row justify-between items-center shadow-md'>
          <HiMenu fontSize={40} className="cursor-pointer" onClick={() => setToggleSidebar(true)}/>
            <Link to='/'>
              <img src={logo} alt='logo' className='w-32'/>
            </Link>

            {user && ( // Ensure the user object is available before rendering user profile link
            <Link to={`user-profile/${user._id}`}>
              <img 
              src={urlFor(user.profileImage).url()}
              alt="User Profile" 
              className='w-16 h-16 rounded-full object-cover'/>
            </Link>
            )} 
        </div>
</div>
          
          {ToggleSidebar && (
            <div className=' md:hidden fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in'>
              <div className='absolute w-full flex justify-end items-center p-2 '>
                <AiFillCloseCircle 
                  fontSize={30} 
                  className='cursor-pointer' 
                  onClick={()=>setToggleSidebar(false)} 
                />
              </div>
              <Sidebar user={user && user} closeToggle={setToggleSidebar}/>
            </div>
          )} 
          
          <div className='pb-2 flex-1 h-screen overflow-y-scroll' ref={scrollRef}>
            <Routes>
              <Route path='/user-profile/:userId' element={<UserProfile/>}/>
              <Route path='/*' element={<Pins user={user && user}/>}/>
            </Routes>
        </div>
      
    </div>
  )
}

export default Home