import React from 'react'

function Alert(props) {
    const {type, message, close} = props
 
    const alertType = type==='success'?'bg-green-300 text-green-700':'bg-red-300 text-red-700'
  return (
    <div className={`w-full flex ${alertType} justify-between items-center px-4 py-2 my-2 rounded-md shadow-md shadow-purple-300`}>
        <article><span className='font-bold'>{type.toUpperCase()} </span>| {message}</article>
        <button onClick={close} className='px-4 py-2 rounded-full '>X</button>
    </div>
  )
} 

export default Alert