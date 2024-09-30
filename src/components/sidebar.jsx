import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FaHome } from "react-icons/fa";
import {IoIosArrowForward} from 'react-icons'
import logo from '../assets/logo.png'
import { urlFor } from '../utils/imageUrl'

 const isNotActiveStyle = 'flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize'
 const isActiveStyle = 'flex items-center px-5 gap-3 font-extrabold border-r-2 border-black transition-all duration-200 ease-in-out capitalize text-blue-800'

 const categories =[
{ name: 'Animals'},
{ name: 'Wallapapers'},
{ name: 'Photography'},
{ name: 'Gaming'},
{ name: 'Coding'},
{ name: 'Other'},
]
const sidebar = ({user, closeToggle}) => {
  
const handleCloseSidebar = () =>{
  if (closeToggle) {closeToggle(false)}
}

  return (
    <div className=' flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-210 hide-scrollbar '>
      <div className='flex flex-col'>
        <Link to='/' className='flex px-5 gap-2 my-6 pt-1 w-190 items-center' onClick={handleCloseSidebar}>
          < img src={logo} alt="logo" cLassName="w-full"/>  
        </Link>

        <div className='flex flex-col gap-5'>
          <NavLink
            to='/'
            className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle}
          >
            <FaHome className='text-blue-800'/>
            Home
          </NavLink>
          <h3 className='mt-2 px-5 text-base 2xl:text-xl'>Discover Categories</h3>
          {categories.slice(0,categories.length-1).map((category) => (
             <NavLink 
                to={`/category/${category.name}`}
                key={category.name} 
                className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle }
                onClick={handleCloseSidebar}
              >
                  {category.name}
             </NavLink>
          ))}
        </div>
      </div>
      {user && (
        <Link
          to={`user-profile/${user._id}`}
          className='flex my-5 mb-3 gap-2 p-2 items-center bg-white rounded-lg shadow-md mx-3 hover:shadow-lg'
          onClick={handleCloseSidebar}

          >
            <img src={urlFor(user.profileImage).url()} className='w-10 h-10 rounded-full object-cover' alt='user-profile'/>
            {user.username}
        </Link>
      )}
    </div>
  )
}

export default sidebar