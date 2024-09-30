import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import {CreatePin, PinDetails, Navbar, Feed, Search} from '../components//index'

const Pins = ( {user} ) => {

  const [searchTerm, setSearchTerm] = useState('')
  return (
    <div className='px-2 md:px-5'>
      <div className='bg-gray-50'>
        <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} user={user} />
      </div>
      <div className='h-full'>
        <Routes>
          <Route path='/' element={ <Feed/> } />
          <Route path='categor/:categoryId' element={ <Feed/> } />
          <Route path='pin-detail/pinId' element={ <PinDetails user={user} /> } />
          <Route path='/create-pin' element={ <CreatePin /> } />
          <Route path='/search' element={ <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} user={user} /> } 
          />
        </Routes>
      </div>
      Pins
    </div>
  )
}

export default Pins