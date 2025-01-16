import React from 'react'

function Alert(props) {
    const {type, message} = props
    const hideAlert = (e)=>{
        e.target.parentElement.classList.remove('flex');
        e.target.parentElement.classList.add('hidden')
    }
  return (
    <div className={`w-full flex justify-between items-center px-4 py-2 my-2 rounded-md bg-${type==='success'?'green':'red'}-300 shadow-md shadow-purple-300 text-${type==='success'?'green':'red'}-700`}>
        <article><span className='font-bold'>{type.toUpperCase()} </span>| {message}</article>
        <button onClick={hideAlert} className='px-4 py-2 rounded-full '>X</button>
    </div>
  )
}

export default Alert