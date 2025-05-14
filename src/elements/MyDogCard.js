import React from 'react'
import pompalace from './pompalace.jpg'


export default function DogCard(props) {

  const { openDelete, openEdit } = props
  let dog = {
    name: props.name,
    price: props.price,
    description: props.description,
    breed: props.breed,
    id: props.id
  }

  return (
    <div className='rounded-md w-full shadow-md shadow-purple-400 overflow-hidden bg-white'>
      <img src={props.image ? props.image : pompalace} alt="Dog" className='w-full h-auto md:h-64' />
      <article className='p-4'>
        <input type="hidden" name="dogId" value={props.dogId} />
        <p className='flex justify-between flex-wrap items-center'>
          <span>{props.name}</span>
          <span className={`px-3 py-0.5 bg-${props.status ? "green" : "red"}-300 rounded-full text-${props.status ? "green" : "red"}-700 text-sm`}>{props.status ? "Available" : "Unavailable"}</span></p>
        <h1 className='font-bold text-2xl'><span className='text-xs md:text-sm'>NPR.</span>{props.price}</h1>
        <p className='py-2'>{props.description}</p>
        <hr className='border-1 border-purple-500' />

      </article>

      <footer className='flex items-center flex-wrap gap-1 justify-between px-4 pb-4'>

        <button onClick={() => { openEdit(dog) }} className='pe-1.5 ps-0.5 py-1 md:pe-3 md:ps-1.5 md:py-1.5 border-2 border-purple-600 text-purple-600 rounded-sm font-bold text-sm hover:border-purple-300 hover:scale-95 transition duration-200 ease-in flex items-center'><i class='bx bx-edit mx-2' ></i>Edit</button>
        <button onClick={() => openDelete(props.id, props.name)} className='pe-1.5 ps-0.5 py-1 md:pe-3 md:ps-1.5 md:py-1.5 border-2 border-red-500 text-red-500 rounded-sm font-bold text-sm hover:border-red-300 hover:scale-95 transition duration-200 ease-in flex items-center'><i class='bx bx-trash mx-2' ></i>Delete</button>

        {/* <Button name="More Info" onClick={submitDog}></Button> */}
      </footer>
    </div>
  )
}
