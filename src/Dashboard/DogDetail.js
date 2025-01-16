import React from 'react'
import Button from '../elements/Button'

function DogDetail(props) {
    const {dog} = props
    const hideModal = ()=>{
        document.getElementById('DetailModal').classList.add('hidden')
    }
  return (
    <div id='DetailModal' className="w-11/12 rounded-md shadow-lg bg-white shadow-purple-400 mt-2 overflow-hidden absolute top-8 right-1/2 translate-x-1/2">
        <img src="https://wallpapercave.com/wp/wp3421919.jpg" alt="Cover" className='w-full h-48 md:h-64'/>
        <img src={`${dog.profile?dog.profile:'#'}`} alt="Profile" className='absolute top-10 md:top-16 translate-x-1/2 translate-y-1/2 w-32 md:w-48 h-32 md:h-48 rounded-full right-1/2 border-4 border-white' />
        <div className='mt-6 px-4 py-2'>
        <p className='flex justify-between items-center'>
            <span>{dog.name}</span>
            <span className='px-3 py-0.5 bg-green-300 rounded-full text-green-700 text-xs md:text-sm'>{dog.status?"Available":"Unavailable"}</span>
        </p>
        <p className='flex justify-between items-center'>
            <span className='text-xl md:text-2xl font-bold'>{dog.price}</span>
            <span className='text-sm md:text-md'>{dog.address}</span>
        </p>
        <p className='py-2'>{dog.description}</p>
        <p className='block md:flex justify-between items-center'>
            <span className='text-lg'>Owner: <strong >{dog.owner}</strong></span>
            <span className='font-bold block md:inline'>{dog.contact}</span>
        </p>
          
        <hr className='my-2 border-1 border-purple-500'/>
        <div className='flex justify-between py-2'>
        <Button name="Book Now"></Button>
            
            <button onClick={hideModal} className='px-1.5 py-1 md:px-4 md:py-1.5 border-2 border-red-500 text-red-500 rounded-md md:rounded-lg font-bold text-xs md:text-sm hover:border-red-300 hover:scale-95 transition duration-300 ease-in'>Close | X</button>
          </div>
          
        </div>
    </div>
  )
}

export default DogDetail