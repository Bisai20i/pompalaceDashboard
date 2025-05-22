import React, { useState} from 'react'
import Submit from '../form/Submit'
import Button from '../elements/Button'
import Alert from '../elements/Alert'
import { NavLink } from 'react-router-dom'

export default function Profile(props) {
  let [user, setUser] = useState(props.user)
  let [update, setUpdate] = useState("Update")
  let [alert, setAlert] = useState({status: false, type:'success', message: "Alert sample"})
  let [updating, setUpdating] = useState(false)
  let [passchange, setPasschange] = useState(false)
  let isAdmin = user.user_role === 'admin'? true:false;
  // console.log(user)
  


  const updateImages = async (e) => {
    e.preventDefault()
    setUpdate("Submitting Request...")
    let formData = new FormData()
    if (document.querySelector("input[name = 'profilepic']").files.length > 0) {
      formData.append('profile', document.querySelector("input[name = 'profilepic']").files[0]);
    }
    if (document.querySelector("input[name = 'coverpic']").files.length > 0) {
      formData.append('cover', document.querySelector("input[name = 'coverpic']").files[0]);

    }
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}updatephoto`, {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('POM_TOKEN')}`
      },
      body: formData
    })
    const data = await response.json()
    // console.log(data)
    if(data.status){
      if (document.querySelector("input[name = 'profilepic']").files.length > 0) {
        setUser((prevState)=>({
          ...prevState,
          profile_img: URL.createObjectURL(document.querySelector("input[name = 'profilepic']").files[0])
        }))
      }
      if (document.querySelector("input[name = 'coverpic']").files.length > 0) {
        setUser((prevState)=>({
          ...prevState,
          cover_img: URL.createObjectURL(document.querySelector("input[name = 'coverpic']").files[0])
        }))
      }
      setAlert({status:true, type:'success', message: data.message})
      setUpdate("Update")
      setUpdating(false)
      
    }
    else{
      setUpdate("Update")
      setAlert({status:true, type:'alert', message: data.message})
    }

  }

  const changepass = async (e) => {
    e.preventDefault()

    setUpdate("Submitting Request...")
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}updatepassword`, {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('POM_TOKEN')}`,
        'X-HTTP-Method-Override': 'PATCH',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        oldpassword: document.querySelector('input[name="currentpass"]').value,
        newpassword: document.querySelector('input[name="newpass"]').value
      }),
    })
    const data = await response.json()
    // console.log(data)
    if(data.status){
      setAlert({status: true,type:'success' ,message:data.message})
      setPasschange(false)
    }
    else{
      setAlert({status: true,type:'alert' ,message:data.message})
    }
    setUpdate("Update")
    

  }

  return (
    <>
      {isAdmin && <div> 
        <NavLink to={'/admin'} className={`py-2 bg-purple-500 flex items-center text-white hover:text-purple-600 border-b-2 border-purple-500 px-2 mb-2 justify-center w-full font-bold text-puple-500 rounded-sm shadow-sm shadow-purple-300 hover:bg-purple-200 transitioin duration-300 ease-in cursor-pointer`}><i class='bx bx-user-circle mx-2 text-lg md:text-xl' ></i> Admin Panel</NavLink>

         <hr className='mb-2 border-1 border-purple-700'/>
         </div>}
      {alert.status && <Alert type={alert.type} message={alert.message} close={()=>{setAlert({status:false})}}/>}

      {passchange &&
        <form onSubmit={changepass}>
          <div className='block md:flex gap-4 justify-center'>
            <div className='flex-1'>
              <label htmlFor="profile" className='my-2 text-purple-600'>Current Password</label>
              <input className='px-3 py-1.5 md:px-5 md:py-2 text-md rounded-sm focus:outline-none ring-purple-400 focus:ring-purple-600 w-full ring-2 my-2 shadow-md shadow-purple-400' type="password" name="currentpass"  />

            </div >

            <div className='flex-1'>
              <label htmlFor="cover" className='my-2 text-purple-600'>New Password</label>
              <input className='px-3 py-1.5 md:px-5 md:py-2 text-md rounded-sm focus:outline-none ring-purple-400 focus:ring-purple-600 w-full ring-2 my-2 shadow-md shadow-purple-400' type="password" name="newpass" />

            </div>
          </div>
          <div className='block md:flex gap-4 justify-center'>
            <Submit name={update}></Submit>
            <button onClick={() => { setPasschange(false) }} className='w-full py-1.5 shadow-sm shadow-red-300 my-2 bg-transparent px-1.5 md:px-4  border-2 border-red-500 text-red-500 rounded-sm font-bold text-xs md:text-sm hover:border-red-300 hover:scale-95 transition duration-200 ease-in'>Close ❌</button>

          </div>
          <hr className='my-2 border-1 border-purple-700'/>

        </form>
      }
      {updating &&
        <form onSubmit={updateImages}>
          <div className='block md:flex gap-4 justify-center'>
            <div className='flex-1'>
              <label htmlFor="profile" className='my-2 text-purple-600'>Profile Image</label>
              <input className='px-3 py-1 md:px-5 md:py-2 text-md md:text-lg rounded-sm focus:outline-none ring-2 ring-purple-400 focus:ring-purple-600 w-full my-2 shadow-md shadow-purple-400' type="file" name="profilepic" accept="image/*" />

            </div >

            <div className='flex-1'>
              <label htmlFor="cover" className='my-2 text-purple-600'>Cover Image</label>
              <input className='px-3 py-1 md:px-5 md:py-2 text-md md:text-lg rounded-sm focus:outline-none ring-2 ring-purple-400 focus:ring-purple-600 w-full my-2 shadow-md shadow-purple-400' type="file" name="coverpic" accept="image/*" />

            </div>
          </div>
          <div className='block md:flex gap-4 justify-center'>
            <Submit name={update}></Submit>
            <button onClick={() => { setUpdating(false) }} className='w-full py-1.5 my-2 bg-transparent px-1.5 md:px-4  border-2 border-red-500 text-red-500 rounded-sm font-bold text-xs md:text-sm hover:border-red-300 hover:scale-95 transition duration-200 ease-in'>Close ❌</button>

          </div>

        </form>
      }


      <div className="w-full rounded-md shadow-md bg-white shadow-purple-400 overflow-hidden relative">


        <img src={user.cover_img ? user.cover_img : 'https://wallpapercave.com/wp/wp3421919.jpg'} alt="Cover" className='w-full h-52 md:h-64' />
        <img src={user.profile_img ? user.profile_img : 'https://th.bing.com/th/id/OIP.GHGGLYe7gDfZUzF_tElxiQHaHa?rs=1&pid=ImgDetMain'} alt="Profile" className='absolute top-12 md:top-16 translate-x-1/2 translate-y-1/2 w-40 md:w-48 h-40 md:h-48 rounded-full right-1/2 border-4 border-white' />


        <div className='mt-20 md:mt-24 px-4 py-2 text-center'>
          <h1 className='text-2xl'>{user.name}</h1>
          <p className='text-md text-purple-700 font-bold flex items-center justify-center flex-wrap'><i class='bx bx-envelope mx-1.5 text-lg md:text-xl' ></i>{user.email} | <i class='bx bx-phone-call mx-1.5 text-lg md:text-xl' ></i> {user.contact}</p>
          <div className='flex gap-2 justify-center py-2'>
            <Button name="Change Password" onClick={()=>{document.getElementById('container').scrollTo({ top: 0, behavior: 'smooth' }); setPasschange(true)}}></Button>
            <button onClick={() => { document.getElementById('container').scrollTo({ top: 0, behavior: 'smooth' }); setUpdating(true) }} className='relative px-1 md:px-2 py-0.5 md:py-1 border-2 border-purple-500 text-purple-500 rounded-md md:rounded-lg font-bold text-xs md:text-sm hover:border-purple-300 transition duration-200 ease-in'>
            <i class='bx bx-camera text-lg md:text-xl' ></i>

            </button>


          </div>

        </div>

      </div>
    </>
  )
}
