import React from 'react'
import {assets} from '../assets/assets'
import { Link } from 'react-router-dom'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'

const Navbar = () => {

  const{isSignedIn,user}=useUser()

  const{openSignIn}=useClerk()
  return (
    <div className='flex items=center justify-between mx-4 py-3 lg:mx-44'>
      <Link to="/"><img className='w-32 sm:w-44' src={assets.logo} alt="" /></Link>
      {
        isSignedIn?<div>
          <UserButton/>
        </div>
        :
         <button onClick={()=>openSignIn({})} className='flex items-center gap-2 bg-zinc-800 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300'>
        Get Started <img className='w-3 sm:w-4'
        src={assets.arrow_icon} alt="" />
      </button>
      }

    </div>
  )
}

export default Navbar
