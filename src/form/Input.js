import React from 'react'

function Input(props) {
  return (
    <input type={props.type} onChange={(e)=>{props.setvalue(e.target.value)}} placeholder={props.description} value={props.value?props.value:''} name={props.name} accept={props.accept} className='px-3 py-1 md:px-4 md:py-2 text-md md:text-lg rounded-sm focus:outline-none ring-purple-400 focus:ring-purple-600 w-full ring-2 my-2 shadow-md shadow-purple-400' required />
  )
}

export default Input