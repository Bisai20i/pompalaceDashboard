import React from 'react'

function Card(props) {
    const {head, important, bgcolor, beforeimp} = props
  return (
    <div className={`rounded-md shadow-md shadow-purple-300 py-3 px-6 bg-${bgcolor}-200 text-right`}>
        <p>{head}</p>
        <h1 className='pt-2'><span className='text-lg px-2'>{beforeimp}</span><strong className='text-5xl font-bold'>{important}</strong></h1>
    </div>
  )
}

export default Card