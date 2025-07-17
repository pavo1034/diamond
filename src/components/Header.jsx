import React from 'react'
import { logo } from '../assets/index.js'
import { GrUserManager } from 'react-icons/gr'
import { FaRegFile } from 'react-icons/fa'
import { AiOutlineTransaction } from 'react-icons/ai'
import { Link, useLocation } from 'react-router-dom'

export const Header = () => {
    const location = useLocation();
    const { pathname } = location;
  
    const isActive = (path) => pathname === path;
  return (
    <div className='p-4 flex justify-start items-center gap-10 shadow-lg'>
        <div className='flex items-center justify-center gap-3'>
            <img src={logo} alt="" className='size-15' />
            <div className='flex flex-col'>
                <span className='font-bold text-[30px]'>Sarvadhi</span>
                <span className='font-normal text-[10px]'>An ISO 9001:2015 & ISO 27001:2022 Certified Company</span>
            </div>
        </div>
        <div className='flex justify-between items-center gap-5'>
             <Link to='/' className={`${isActive('/')?'text-blue-400':''} flex items-center gap-2`}>
             <GrUserManager className='text-xl' />
             <span>Broker Details</span>
             </Link>
             <Link to='/diamond' className={`${isActive('/diamond')?'text-blue-400':''} flex items-center gap-2`}>
             <FaRegFile className='text-xl' />
             <span>Diamond Details</span>
             </Link>
            
             <Link to='/transaction' className={`${isActive('/transaction')?'text-blue-400':''} flex items-center gap-2`}>
             <AiOutlineTransaction className='text-xl'/>
             <span>Transaction Module</span>
             </Link>
        </div>
    </div>
  )
}
