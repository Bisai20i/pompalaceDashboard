import React, { useState } from 'react'
import Button from '../elements/Button'
import { NavLink } from 'react-router'
import spinner from '../elements/spinner.gif'

function SidePanal(props) {
  let { login } = props
  let [loading, setLoading] = useState(false)
  let [err, setErr] = useState({ status: false, message: '', error: '' })
  const logout = async () => {
    setLoading(true)
    let token = localStorage.getItem('POM_TOKEN')
    await fetch(`${process.env.REACT_APP_BASE_URL}logout`, {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data.status) {
          localStorage.removeItem('POM_TOKEN')
          window.location.href = window.location.origin;
          login(false)
        } else {
          setErr({ status: true, message: data.message })
        }
      })
      .catch(error => {
        setErr({ status: true, message: "Internal Server Error", error: error })
      })

  }
  return (
    <aside id='sidePanal' className="w-48 md:w-64 absolute md:translate-x-0 top-0 -translate-x-64 transition duration-500 z-10 md:static h-full bg-white md:pt-8 pt-16  shadow-md shadow-purple-400">
      <NavLink to="/" className={({ isActive }) => `py-2 px-5 w-full text-sm md:text-normal block font-semibold hover:bg-purple-300 transitioin duration-300 ease-in cursor-pointer ${isActive ? 'bg-purple-500 text-white' : 'text-purple-700'}`} ><i class='bx bxs-dashboard mx-2'></i>Dashboard</NavLink>

      <NavLink to={'/alldogs'} className={({ isActive }) => `py-2 px-5 text-sm md:text-normal block font-semibold hover:bg-purple-300 transitioin duration-300 ease-in cursor-pointer ${isActive ? 'bg-purple-500 text-white' : 'text-purple-700'}`}><i class='bx bx-wallet-alt mx-2' ></i> All Dogs</NavLink>

      <NavLink to={'/dogs'} className={({ isActive }) => `py-2 px-5 text-sm md:text-normal block font-semibold hover:bg-purple-300 transitioin duration-300 ease-in cursor-pointer ${isActive ? 'bg-purple-500 text-white' : 'text-purple-700'}`}>
      <i class='bx bxs-dog mx-2' ></i> My Dogs</NavLink>

      <NavLink to={'/profile'} className={({ isActive }) => `py-2 px-5 text-sm md:text-normal block font-semibold hover:bg-purple-300 transitioin duration-300 ease-in cursor-pointer ${isActive ? 'bg-purple-500 text-white' : 'text-purple-700'}`}><i class='bx bx-user mx-2' ></i> Profile</NavLink>

      <div className='mt-5 px-5'>
        <Button onClick={logout} name="Logout"></Button>
      </div>
      {loading && <img src={spinner} className='px-5 w-auto text-center h-24' alt='loading' />}
      {err.status && <span className='text-red-500 text-xs md:text-sm px-3'>{err.message}<br />
        {err.error}
      </span>}

    </aside>
  )
}

export default SidePanal