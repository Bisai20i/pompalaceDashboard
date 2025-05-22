import React,{useState} from 'react'

import spinner from './spinner.gif'

function Delete(props) {
    let {name, id } = props
    let [loading, setLoading] = useState(false)
    let [response, setResponse] = useState({status:false, message:''})
    // let yOffset = document.getElementById('container').scrollTop

    // document.onload(document.getElementById('deleteDogModal').style.top = (yOffset + 25) + 'px')
    

    const deleteDog = async () => {
        setLoading(true)
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}dogs/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('POM_TOKEN')}`
                }
            })
            const data = await response.json()
            setLoading(false)
            setResponse({status:true, message: data.message, success:data.status})
        }
        catch(error){
            console.error("Error:",error)
        }
        

    }

    return (
        <div className='absolute hidden top-6 flex justify-center left-0 w-full p-3 md:p-4' id='deleteDogModal'>
            <div className='p-2 md:p-4 rounded-md border-2 w-full md:w-96 lg:w-1/2 border-red-500 bg-white shadow-md shadow-red-500'>
                <header className='mb-3 text-center h-auto'>
                    <i class='bx bx-error mx-2 text-red-600' style={{fontSize:70}}></i> 
                    <h1 className='text-red-600 text-lg font-bold'>Are you sure?</h1>
                </header>
                <hr className='border-1 border-red-500' />
                <p className='my-4'>
                    The dog with name <strong>{name}</strong> will be deleted.

                </p>
                <hr className='border-1 border-red-500' />
                <footer className='mt-3 flex justify-between'>
                    {!response.status && 
                    <button onClick={deleteDog} className='pe-1.5 ps-0.5 md:pe-4 md:ps-2 py-1 md:py-1.5 border-2 border-green-500 text-green-500 flex items-center rounded-sm font-bold text-xs md:text-sm hover:border-green-300 hover:scale-95 transition duration-200 ease-in'><i class='bx bx-like mx-1.5' ></i>Confirm </button>}

                    <button onClick={() => { document.getElementById('deleteDogModal').classList.add('hidden') }} className='pe-1.5 ps-0.5 flex items-center md:pe-4 md:ps-2 py-1 md:py-1.5 border-2 border-red-500 text-red-500 rounded-sm font-bold text-xs md:text-sm hover:border-red-300 hover:scale-95 transition duration-200 ease-in'><i class='bx bx-dislike mx-1.5' ></i>Close</button>

                </footer>
                {loading && <div className='w-full flex justify-center my-1'><img src={spinner} className='h-24' alt='loading'/></div> }
                {response.status && <p className={`w-full text-center text-${response.success?'green':'red'}-500 my-1`} >{response.message}</p> }

            </div>
            
        </div>
    )
}

export default Delete