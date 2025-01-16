import React from 'react'
import { HashRouter, Routes, Route} from "react-router-dom"
import SidePanal from './Dashboard/SidePanal'
import Board from './Dashboard/Board'
import Dogs from './Dashboard/Dogs'
import AllDogs from './Dashboard/AllDogs'
import Profile from './Dashboard/Profile'

function Dashboard(props) {
  let {logout} = props
  return (
    <div className='w-full h-screen flex pt-10 '>
        <HashRouter>
            <SidePanal logout={logout}/>
            <section className="flex-1 h-full overflow-y-auto relative py-5 px-2 md:py-8 md:px-4" id='container'>
                
                <Routes>
                    <Route index path="/" element={<Board />} />
                    <Route path="/dogs" element={<Dogs />} />
                    <Route path="/alldogs" element={<AllDogs />} />
                    <Route path="/profile" element={<Profile />} />

                </Routes>
                    
                
            </section>
        </HashRouter>

    </div>
    
  )
}

export default Dashboard