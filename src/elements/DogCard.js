import React from 'react'
import Button from './Button'
import pompalace from './pompalace.jpg'

export default function DogCard(props) {
  const {onClick} = props
  const submitDog = ()=>{
    onClick({
      name:props.name,
      address: props.address,
      owner: props.owner,
      contact: props.contact,
      description: props.description,
      price: props.price,
      status: props.name,
      profile: props.image,
      cover: props.coverimg,
      id: props.dog_id
    })
  }
  return (
    <div className='rounded-md shadow-md shadow-purple-400 overflow-hidden bg-white'>
        <img src={props.image?props.image:pompalace} alt="Dog Profile" className='w-full h-auto md:h-64'  />
        <article className='p-4'>
            
            <p className='flex justify-between items-center'>
              <span>{props.name}</span>
              <span className={`px-2 md:px-3 text-xs py-0.5 bg-${props.status?"green":"red"}-300 rounded-full text-${props.status?"green":"red"}-700 md:text-sm`}>{props.status?"Available":"Unavailable"}</span></p>
            <h1 className='font-bold text-2xl pt-1'><span className='text-xs md:text-sm pe-2'>NPR.</span>{props.price}</h1>
            <p className='py-2'>{props.description}</p>
            <hr className='border-1 border-purple-500' />
            
        </article>
        
        <footer className='flex items-center justify-between px-4 pb-4'>
        
            <p>{props.address}</p>
            <Button name="More Info" onClick={submitDog}></Button>
        </footer>
    </div>
  )
}
