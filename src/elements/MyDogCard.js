import React from 'react'


export default function DogCard(props) {

    const {openDelete, openEdit} = props
  return (
    <div className='rounded-md shadow-md shadow-purple-400 overflow-hidden bg-white'>
        <img src={props.image?props.image:'#'} alt="Dog Image" className='w-full h-auto' />
        <article className='p-4'>
            <input type="hidden" name="dogId" value={props.dogId}/>
            <p className='flex justify-between items-center'>
              <span>{props.name}</span>
              <span className={`px-3 py-0.5 bg-${props.status?"green":"red"}-300 rounded-full text-${props.status?"green":"red"}-700 text-sm`}>{props.status?"Available":"Unavailable"}</span></p>
            <h1 className='font-bold text-2xl'>{props.price}</h1>
            <p className='py-2'>{props.description}</p>
            <hr className='border-1 border-purple-500' />
            
        </article>
        
        <footer className='flex items-center justify-between px-4 pb-4'>
        
            <button onClick={()=>{openEdit(props.dogId)}} className='px-1.5 py-1 md:px-4 md:py-1.5 border-2 border-blue-500 text-blue-500 rounded-lg font-bold text-sm hover:border-blue-300 hover:scale-95 transition duration-200 ease-in'>Edit 🖊️</button>
            <button onClick={()=>openDelete(props.dogId, props.name)} className='px-1.5 py-1 md:px-4 md:py-1.5 border-2 border-red-500 text-red-500 rounded-lg font-bold text-sm hover:border-red-300 hover:scale-95 transition duration-200 ease-in'>Delete 🗑️</button>
            
            {/* <Button name="More Info" onClick={submitDog}></Button> */}
        </footer>
    </div>
  )
}
