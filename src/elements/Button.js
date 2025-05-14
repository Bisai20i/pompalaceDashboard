import React from 'react'

export default function Button(props) {
  return (
    <button onClick={props.onClick} className='btn font-bold text-white shadow-sm shadow-purple-300 text-xs md:text-sm px-5 md:px-4 py-1.5'>{props.name}</button>
  )
}
