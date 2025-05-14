import React from 'react'

function FilterBox(props) {
    let {setFilterDate, setFilterPrice, setQuery} = props
  return (
    <div className='w-full flex md:justify-between justify-center items-center flex-wrap mb-2 mt-2 px-2 bg-white rounded-sm shadow-sm shadow-purple-500'>
        <p className='pt-1.5 pb-0.5 px-1 md:px-2 md:pb-1.5 sm:text-sm text-xs md:text-auto min-w-1/2 w-auto lg:w-1/2'><label htmlFor="price" className='pe-1 '>Price:</label>
            <select className='text-xs md:text-sm p-1 ring-0' onChange={(e)=>setFilterPrice(e.target.value)} name="priceFilter">
                <option value="">Recommended</option>
                <option value="low">Low to High</option>
                <option value="high">High to Low</option>
            </select>
            <label htmlFor="Date" className='ps-2'> Date:</label>
            <select className='text-xs md:text-sm p-1 ring-0 ms-2' onChange={(e)=>setFilterDate(e.target.value)}  name="priceFilter">
                <option value="new" selected>Newest First</option>
                <option value="old">Oldest First</option>
            </select>
        </p>
        <p className='p-2 flex flex-nowrap flex-grow'>
            <div className="ps-2 flex flex-grow items-center border border-purple-400 rounded-full shadow-sm shadow-purple-200">
            <i class='bx bx-search px-2 text-purple-600'></i>
            <input type="text" placeholder='Enter Keywords' onChange={(e)=>setQuery(e.target.value)} className='flex-1 rounded-e-full bg-transparent focus:ring ring-purple-400 focus:outline-none p-1.5'/>
            </div>
            {/* <input type="text" placeholder='Enter Keywords' className='p-1 flex-1 rounded-sm focus:ring focus:ring-1 focus:ring-purple-500 border border-purple-400 '/>
            <button className='border-2 border-purple-500 bg-purple-500 text-white  ms-2 px-2 py-1 rounded-full hover:border-purple-300 hover:text-purple-600 hover:bg-transparent transition duration-200 ease-in'><i class='bx bx-search'></i></button> */}
        </p>
    </div>
  )
}

export default FilterBox