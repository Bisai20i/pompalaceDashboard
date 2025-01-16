import React from 'react'
import Button from '../elements/Button'
import { NavLink } from 'react-router'

function SidePanal(props) {
  let {logout} = props

  return (
    <aside id='sidePanal' className="w-40 md:w-64 absolute md:translate-x-0 top-0 -translate-x-64 transition duration-500 z-10 md:static h-full bg-white md:pt-8 pt-16  shadow-md shadow-purple-400">
        <NavLink to="/" className={({isActive})=>`py-2 px-5 block w-full font-bold text-puple-500 hover:bg-purple-200 transitioin duration-300 ease-in cursor-pointer ${isActive?'bg-purple-500 text-white':''}`} >Dashboard</NavLink>

        <NavLink to={'/alldogs'} className={({isActive})=>`py-2 px-5 block w-full font-bold text-puple-500 hover:bg-purple-200 transitioin duration-300 ease-in cursor-pointer ${isActive?'bg-purple-500 text-white':''}`}>All Dogs</NavLink>

        <NavLink to={'/dogs'} className={({isActive})=>`py-2 px-5 block w-full font-bold text-puple-500 hover:bg-purple-200 transitioin duration-300 ease-in cursor-pointer ${isActive?'bg-purple-500 text-white':''}`}>My Dogs</NavLink>

        <NavLink to={'/profile'} className={({isActive})=>`py-2 px-5 block w-full font-bold text-puple-500 hover:bg-purple-200 transitioin duration-300 ease-in cursor-pointer ${isActive?'bg-purple-500 text-white':''}`}>Profile</NavLink>
        
        <div className='mt-5 px-5'>
            <Button onClick={logout} name="Logout"></Button>
        </div>
            
    </aside>
  )
}

export default SidePanal