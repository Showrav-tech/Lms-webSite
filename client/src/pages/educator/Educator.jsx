import React from 'react'
import {Outlet} from 'react-router-dom'
import Navbar from '..'
const Educator = () => {
  return (
    <div className='text-default min-h-screen bg-white'>
      <h1>Educator</h1>
      <div>
        <Navbar/>
        {<Outlet/>}
      </div>
    </div>
  )
}

export default Educator
