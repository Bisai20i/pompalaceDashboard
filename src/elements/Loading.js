import React from 'react'
import spinner from './spinner.gif'

function Loading() {
  return (
    <div className='absolute bottom-10 w-full left-0 flex justify-center items-center p-0'>
        <img src={spinner} className='bg-white shadow-sm shadow-purple-400 rounded-full h-24'/>
    </div>
  )
}

export default Loading