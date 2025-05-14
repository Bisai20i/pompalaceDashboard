import React from 'react'

function UserCard(props) {
    let {deleteUser, promoteUser, user} = props
    
    
    
    return (
        <div className='p-2 md:p-3 rounded-sm shadow-md shadow-purple-300 bg-white'>
            <h1 className="flex flex-wrap justify-between pb-1">
                <p className='min-w-content flex-grow'>{user.id} | {user.name}</p>
                <strong className='min-w-content flex-1 text-end font-normal text-xs md:text-sm'>{user.email}</strong>
            </h1>
            <hr className='border-1 border-purple-500 mb-2' />
            <article className="flex flex-wrap justify-between items-center py-2">
                <h2 className='text-lg md:text-xl font-bold text-center text-purple-600'>Dogs: <strong>{user.dog.length}</strong></h2>
                <aside className='text-xs text-end md:text-sm text-gray-500 '>
                    <p>{user.contact}</p>
                    <p>{user.address}</p>
                </aside>
            </article>
            <footer className='flex flex-wrap items-center justify-between'>
                <p className='text-gray-400 text-xs md:text-sm flex-grow min-w-[content] py-1'>
                    <span>Joined: {new Date(user.created_at).toLocaleDateString()}</span><br />
                    <span className='text-purple-500'>{user.user_role.toUpperCase()} </span>
                </p>
                <span className='flex flex-grow flex-wrap justify-end py-1'>
                    <button onClick={() => { promoteUser(user.id, user.name) }} className='relative flex items-center pe-1.5 ps-0.5 py-1 my-1 md:pe-2 md:ps-1 md:py-1.5 border-2 border-green-500 text-green-500 rounded-sm font-bold text-xs md:text-sm hover:border-green-300 hover:text-green-400 transition duration-200 ease-in'><i class='bx bxs-to-top mx-1' ></i>Promote</button>
                    <button onClick={() => { deleteUser(user.id, user.name) }} className='relative flex items-center ms-1 md:ms-2 my-1 pe-1.5 ps-0.5 py-1 md:pe-2 md:ps-1 md:py-1.5 border-2 border-red-500 text-red-500 rounded-sm font-bold text-xs md:text-sm hover:border-red-300 hover:text-red-400 transition duration-200 ease-in'><i class='bx bx-trash mx-1' ></i>Delete
                    </button>

                    

                </span>
            </footer>
        </div>
    )
}

export default UserCard