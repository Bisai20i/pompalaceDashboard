import React from 'react'

function Delete(props) {
    let {close, name} = props
    document.getElementById('container').scrollTo({ top: 0, behavior: 'smooth' });
  return (
    <div className='absolute top-6 flex justify-end left-0 w-full p-2 md:p-4'>
        <div className='p-2 md:p-4 rounded-md border-2 w-full md:w-80 border-red-500 bg-white shadow-md shadow-red-500'>
            <header className='mb-2'> 
                <h1 className='text-red-600 text-lg font-bold text-center'>Are you sure?</h1>
            </header>
            <hr className='border-1 border-red-500'/>
            <p className='my-2'>
                The dog with name <strong>{name}</strong> will be deleted.

            </p>
            <hr className='border-1 border-red-500'/>
            <footer className='mt-2 flex justify-between'>
                <button className='px-1.5 md:px-4 py-1 md:py-1.5 border-2 border-purple-500 text-purple-500 rounded-md font-bold text-xs md:text-sm hover:border-purple-300 hover:scale-95 transition duration-200 ease-in'>Confirm 🆗</button>
                <button onClick={()=>{close(false)}} className='px-1.5 md:px-4 py-1 md:py-1.5 border-2 border-red-500 text-red-500 rounded-md font-bold text-xs md:text-sm hover:border-red-300 hover:scale-95 transition duration-200 ease-in'>Close ❌</button>

            </footer>
        </div>
    </div>
  )
}

export default Delete