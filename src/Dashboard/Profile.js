import React, {useState} from 'react'
import Alert from '../elements/Alert'
import Submit from '../form/Submit'
import Button from '../elements/Button'

export default function Profile() {
  let [profilePic, setProfilePic] = useState(null)
  let [coverPic , setCoverPic] = useState(null)
  let [updating, setUpdating] = useState(false)
  const updateImages = (e) =>{
    e.preventDefault()
    let profilepic = document.querySelector("input[name = 'profilepic']").files[0]
    let coverpic = document.querySelector("input[name = 'coverpic']").files[0]

    setProfilePic(URL.createObjectURL(profilepic))
    setCoverPic(URL.createObjectURL(coverpic))

    setUpdating(false)
  }
  return (
    <>
      <Alert type="success" message="Email Verification Successful!"></Alert>
      {updating &&
        <form onSubmit={updateImages}>
          <div className='block md:flex gap-4 justify-center'>
            <div className='flex-1'>
              <label htmlFor="profile" className='my-2 text-purple-600'>Profile Image</label>
              <input className='px-3 py-1 md:px-5 md:py-2 md:text-lg text-md md:text-lg rounded-md focus:outline-none ring-2 ring-purple-400 focus:ring-purple-600 w-full ring-2 my-2 shadow-md shadow-purple-400' type="file" name="profilepic" accept="image/*" />

            </div >

            <div className='flex-1'>
              <label htmlFor="cover" className='my-2 text-purple-600'>Cover Image</label>
              <input className='px-3 py-1 md:px-5 md:py-2 md:text-lg text-md md:text-lg rounded-md focus:outline-none ring-2 ring-purple-400 focus:ring-purple-600 w-full ring-2 my-2 shadow-md shadow-purple-400' type="file" name="coverpic" accept="image/*" /> 

            </div>
          </div>
          <div className='block md:flex gap-4 justify-center'>
            <Submit name='Update'></Submit>
            <button onClick={()=>{setUpdating(false)}} className='w-full py-1 my-2 bg-transparent px-1.5 md:px-4  border-2 border-red-500 text-red-500 rounded-md font-bold text-xs md:text-sm hover:border-red-300 hover:scale-95 transition duration-200 ease-in'>Close ❌</button>

          </div>

        </form>
      }


      <div className="w-full rounded-md shadow-md bg-white shadow-purple-400 overflow-hidden relative">


        <img src={coverPic?coverPic:'https://wallpapercave.com/wp/wp3421919.jpg'} alt="Cover" className='w-full h-52 md:h-64'/>
        <img src={profilePic?profilePic:'https://th.bing.com/th/id/OIP.GHGGLYe7gDfZUzF_tElxiQHaHa?rs=1&pid=ImgDetMain'} alt="Profile" className='absolute top-12 md:top-16 translate-x-1/2 translate-y-1/2 w-40 md:w-48 h-40 md:h-48 rounded-full right-1/2 border-4 border-white' />


        <div className='mt-20 md:mt-24 px-4 py-2 text-center'>
          <h1  className='text-2xl'>User Name</h1>
          <p className='text-md text-green-700 font-bold'>user@email.com | Verified</p>
          <div className='flex gap-2 justify-center py-2'>
            <Button name="Change Password"></Button>
            <button onClick={()=>{document.getElementById('container').scrollTo({top:0, behavior:'smooth'});setUpdating(true)}} className='relative p-2 border-2 border-purple-500 text-purple-500 rounded-md md:rounded-lg font-bold text-xs md:text-sm hover:border-purple-300 transition duration-200 ease-in'> 
              📸
              {/* <ul id='btnInner' className='h-0 w-0 overflow-hidden absolute bottom-0 me-0.5 md:ms-0.5 right-full md:left-full rounded-lg text-black border-2 border-purple-500 bg-white transition duration-300'>
                <li className=' w-32 py-2 hover:bg-purple-400'>Change Profile</li>
                <li className=' w-32 py-2 hover:bg-purple-400'>Change Cover</li>
              </ul> */}
            </button>

            
          </div>
          
        </div>
      
      </div>
    </>
  )
}
