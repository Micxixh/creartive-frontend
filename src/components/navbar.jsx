import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {IoMdAdd, IoMdSearch} from 'react-icons/io'
import { urlFor } from '../utils/imageUrl'

const Navbar = ({searchTerm, setSearchTerm, user}) => {
const navigate = useNavigate();


  return (
    <div className='flex gap-2 md: gap-5 w-full mt-5 pb-7 justify-centre'>
      <div className='flex justify-start items-center w-full px-2 rounded-full bg-white border-none outline-none focus-within:shadow-sm'>
        <IoMdSearch fontsize={21} className='ml-1' />
        <input 
          type='text'
          onChange={(e) => setSearchTerm(e.target.value) }
          placeholder='search'
          value={searchTerm}
          onFocus={() => navigate('/search')}
          className="p-2 w-full bg-white outline-none "
        />
      </div>
      <div className='flex gap-3'>
        <Link to={`user-profile/${user?._id}`} className='hidden sm:block' >
        <img 
        src={user && urlFor(user.profileImage).url()}
        className='w-16 h-16 rounded-full object-cover'
          />
        </Link>
        <Link to='create-pin' className='bg-black text-white rounded-lg w-12 h-12 md:w-14 md:h-12 flex justify-center items-center'>
          <IoMdAdd  className=''/>
        </Link>

      </div>
    </div>
  )
}

export default Navbar