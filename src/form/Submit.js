import React from 'react'

export default function Submit(props) {
  return (
    <button type='submit' className='w-full px-2 py-1.5 text-center text-white font-bold bg-purple-600 hover:bg-transparent hover:text-purple-600 border-2 border-purple-600 shadow-md shadow-purple-400 my-2 duration-300 ease transition rounded-lg'>{props.name}</button>
  )
}
