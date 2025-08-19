import React from 'react'
import { assets } from '../../assets/assets'
import { UserButton } from '@clerk/clerk-react'
import { Link } from 'react-router-dom'
import { icons } from '../../assets/icons'

const Navbar = () => {
    return (
        <div className='flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white transition-all duration-300'>
            <Link to="/" className='flex flex-row gap-x-2 items-center'>
                <div className='h-9 invert opacity-80'>{icons.logo}</div>
                <p className="text-2xl font-semibold ">Lodgr</p>
            </Link>
            <UserButton />
        </div>
    )
}

export default Navbar