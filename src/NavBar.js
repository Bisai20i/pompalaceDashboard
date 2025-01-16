import React from 'react'

function NavBar(props) {
  const openSidePanal = (e)=>{
    document.getElementById('sidePanal').classList.toggle('translate-x-0')
    if(e.currentTarget.innerHTML === '❌'){
      e.currentTarget.innerHTML = '🎚️'
    }
    else{
      e.currentTarget.innerHTML = '❌'
    }
    
  }
  return (
    <nav className='absolute z-20 top-0 right-0 w-full py-2 px-3 md:px-5 md:py-2 shadow-md shadow-purple-300'>
      <button onClick={openSidePanal} className='border-2 block md:hidden rounded-md border-purple-500 py-1 px-2 hover:border-purple-300'>🎚️</button>
      <h3 className="navHeading text-sm md:text-md">PomPalace: <strong >{props.name}</strong></h3>
      <a href="https://bisai20i.github.io/pomPlace/" className='btn hidden md:block text-white font-bold text-sm px-3 py-0.5  md:py-1.5'>Home</a>
    </nav>
  )
}

export default NavBar