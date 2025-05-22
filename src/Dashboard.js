import React, { useEffect, useState } from 'react'
import { HashRouter, Routes, Route } from "react-router-dom"
import SidePanal from './Dashboard/SidePanal'
import Board from './Dashboard/Board'
import Dogs from './Dashboard/Dogs'
import AllDogs from './Dashboard/AllDogs'
import Profile from './Dashboard/Profile'
import spinner from './elements/spinner.gif'
import Admin from './Dashboard/Admin'
import Alert from './elements/Alert'

function Dashboard(props) {

  let [loading, setLoading] = useState(false)
  let [alert, setAlert] = useState({ status: false, type: 'success', message: "Alert sample" })
  let [user, setUser] = useState({})
  let { login } = props

  useEffect(() => {
    return (async () => {
      setLoading(true)

      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}profile`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("POM_TOKEN")}`
          }
        })
        const data = await response.json()


        if (data.status) {
          setUser(data.data[0])
          // console.log(user)
          setLoading(false)

        }
        else {
          setLoading(false)
          setAlert({ status: true, type: 'alert', message: "Some Error Occured Please try again Later." })
        }

      }
      catch (e) {
        console.error("Error",e)
        localStorage.removeItem("POM_TOKEN")
        login(false)
      }

    })

  }, [])
  return (
    <>
      <div className='w-full h-screen flex pt-10 '>
        {
          loading ?
            <>
              <div className='w-full flex justify-center my-1'><img src={spinner} className='h-24' alt='loading' /></div>
            </>
            :
            <>
              <HashRouter>
                <SidePanal login={login} />
                <section className="flex-1 h-full overflow-y-auto relative mt-3 md:mt-0 py-5 px-2 md:py-8 md:px-4" id='container'>

                  <Routes>
                    <Route index path="/" element={<Board  />} />
                    <Route path="/dogs" element={<Dogs user={user} />} />
                    <Route path="/alldogs" element={<AllDogs user={user} />} />
                    <Route path="/profile" element={<Profile user={user} />} />
                    <Route path="/admin" element={<Admin user={user} />} />
                  </Routes>


                </section>
              </HashRouter>

            </>
        }

      </div>
      {alert.status && <div className='p-2 md:p-4'><Alert type={alert.type} message={alert.message} close={() => { setAlert({ status: false }) }}></Alert></div>}
    </>

  )
}

export default Dashboard