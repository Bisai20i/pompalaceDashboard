import React, { useState } from 'react'
import Loading from './elements/Loading'
import Login from './Authentication/Login'
import { HashRouter, Routes, Route } from "react-router-dom"
import Recover from './Authentication/Recover'


export default function Auth(props) {

  let [error, setError] = useState({ status: false, type: '', message: '' })
  let [loading, setLoading] = useState(false)
  let { login } = props






  return (
    <div className='w-full h-screen overflow-hidden flex justify-center items-center '>
      <div className='md:w-1/2 md:block h-screen hidden overflow-hidden'>
        <img className='h-screen w-full' src="https://th.bing.com/th/id/OIP.ZJNcc_Df-H0DfYVJEweydAHaJQ?rs=1&pid=ImgDetMain" alt="dog" />
      </div>

      <div className='relative md:w-1/2 overflow-y-auto h-screen pt-16 pb-4 w-full px-4 md:px-10 lg:px-20 '>

        <HashRouter>

            <Routes>
              <Route index path="/" element={<Login login={login} setError={setError} setLoading={setLoading}></Login>} />
              <Route path="/recover" element={<Recover />} />

            </Routes>

        </HashRouter>


        {error.status &&
          <div className={`w-full flex justify-between items-center px-4 py-2 my-2 rounded-md bg-${error.type === 'success' ? 'green' : 'red'}-300 shadow-md shadow-purple-300 text-${error.type === 'success' ? 'green' : 'red'}-700`}>
            <article><span className='font-bold'>{error.type.toUpperCase()} </span>| {error.message}</article>
            <button onClick={() => { setError({ status: false }) }} className='px-4 py-2 font-bold rounded-full '>X</button>
          </div>
        }

        {loading && <Loading></Loading>}

      </div>




    </div>
  )
}
