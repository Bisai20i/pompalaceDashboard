import React, { useState, useEffect } from 'react'
import UserCard from '../elements/UserCard'
import ConfirmModal from '../elements/ConfirmModal'
import Alert from '../elements/Alert'
import spinner from '../elements/spinner.gif'
import ManageNotice from './ManageNotice'
import Submit from '../form/Submit'


function Admin(props) {
    const { user } = props
    let [allUsers, setAllUsers] = useState({})
    let [allOrders, setAllOrders] = useState({})
    let [details, setDetails] = useState({})
    let [loading, setLoading] = useState(false)
    let [alert, setAlert] = useState({ status: false, type: 'success', message: "Alert sample" })
    const [modalOpen, setModalOpen] = useState(false)
    let [email, setEmail] = useState('')
    let [subject, setSubject] = useState('')
    let [submitText, setSubmitText] = useState("Send Mail")
    let [response, setResponse] = useState({status: false, type:"success", message: "sample error"})

    

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true)
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}admin/allusers`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('POM_TOKEN')}`
                }
            })
            const data = await response.json()
            // console.log(data)
            setLoading(false)
            if (data.status) {

                setAllUsers(data.data)
            } else {
                setAlert({ status: true, type: 'alert', message: data.message })
            }

        }
        const fetchOrders = async () => {
            setLoading(true)
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}admin/allorders`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('POM_TOKEN')}`
                }
            })
            const data = await response.json()
            setLoading(false)
            if (data.status) {

                setAllOrders(data.data)
            } else {
                setAlert({ status: true, type: 'alert', message: data.message })
            }

        }
        fetchUsers()
        fetchOrders()
    }, [])

    const deleteUser = (id, name) => {
        document.getElementById('container').scrollTo({ top: 0, behavior: 'smooth' });

        setDetails({ id: id, name: name, type: "alert" })
        setModalOpen(true)
    }
    const promoteUser = (id, name) => {
        document.getElementById('container').scrollTo({ top: 0, behavior: 'smooth' });

        setDetails({ id: id, name: name, type: "success" })
        setModalOpen(true)
    }

    const displayResponse = ()=>{
        setTimeout(()=>{
            setResponse({status:false})
        },3000)
    }

    const sendMail = async (e) => {
        e.preventDefault()
        setSubmitText("Requesting...")
        console.log(email, subject, document.querySelector('textarea[name="message"]').value)
       
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}admin/sendemail`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('POM_TOKEN')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                subject: subject,
                message: document.querySelector('textarea[name="message"]').value
            })

        })

        const data = await response.json()

        if (data.status) {
            setResponse({status:true, type:'success', message:data.message})
            setSubmitText("Send Mail")
            document.querySelector('textarea[name="message"]').value = ''
            setEmail('')
            setSubject('')
            displayResponse()
        } else {
            console.log(data)
            setResponse({status:true, type:'alert', message:data.message})
            setSubmitText("Try Again")
            displayResponse()
        }
    }
    return (
        <>
            <ManageNotice></ManageNotice>
            <div className=''>

                <div id='emailModal' className="hidden z-50 absolute top-5 font-normal left-1/2 -translate-x-1/2 bg-white border-2 border-purple-500 p-2 w-100 md-w-1/2 overflow-hidden text-start text-gray-500 ">
                    <form onSubmit={sendMail}>
                    <button type='button' className='w-full py-1.5 my-2 bg-transparent px-2 md:px-3  border-2 border-red-500 text-red-500 rounded-sm font-bold text-xs md:text-sm hover:border-red-300 hover:scale-95 transition duration-200 ease-in' onClick={() => { document.getElementById("emailModal").style.display = 'none' }}>Close ❌</button>
                        <input type="text" name="toEmail" placeholder='Email' className='w-full border-0 ring-1 focus:ring-purple-500 p-1 mb-2' onChange={(e) => setEmail(e.target.value)} value={email}/>
                        <input type="text" name='subject' placeholder='Subject' className='w-full border-0 ring-1 focus:ring-purple-500 p-1' onChange={(e) => setSubject(e.target.value)} value={subject}/>
                        <textarea name="message" defaultValue="Mail Body" className='w-full mt-2 p-1.5 md:p-2 ring ring-1 focus:ring-purple-500' rows="5">
                        </textarea>
                        <Submit name={submitText}></Submit>
                    </form>
                    {response.status && <span className={`absolute p-1 text-xs md:text-sm bg-${response.type === 'success' ? 'green' : 'red'}-200 rounded-sm bottom-0 left-0 w-full text-${response.type === 'success' ? 'green' : 'red'}-600 text-center `}>{response.message}</span>}
                </div>


                {modalOpen && <ConfirmModal close={() => { setModalOpen(false) }} details={details}></ConfirmModal>}

                {alert.status && <Alert type={alert.type} message={alert.message} close={() => { setAlert({ status: false }) }} />}

                <header className='flex justify-between flex-wrap mb-2 mt-2 md:mt-0 text-center items-center'>
                    <span className='text-sm md:text-lg lg:text-xl flex items-center font-semibold'><i class='bx bx-notification me-2'></i>Admin Panel </span>
                    <strong className='font-normal flex flex-nowrap items-center text-sm md:text-md lg:text-lg'>


                        {user.name} |

                        <button className='flex ms-2 items-center pe-1.5 ps-0.5 py-1 my-1 md:pe-3 md:ps-1.5 md:py-1.5 border border-purple-500 text-purple-500 rounded-sm text-xs md:text-sm hover:border-purple-300 hover:text-purple-400 transition duration-200 ease-in ' onClick={() => { document.getElementById('noticeModal').classList.remove('hidden') }}><i class='bx bx-bell mx-2' ></i>Manage Notices</button>

                    </strong>
                </header>

                <hr className='border-1 border-purple-500 mb-2' />

                {loading && <div className='w-full flex justify-center my-1'><img src={spinner} className='h-24' alt="loading" /></div>}

                <h1 className='p-2 flex justify-between items-center'><strong className='text-xl font-bold flex items-center'><i class='bx bxs-user-detail me-2' ></i>Users:</strong>
                    <button onClick={() => { document.getElementById("emailModal").style.display = 'block' }}
                        className='relative flex items-center pe-1.5 ps-0.5 ms-1 md:ms-2 my-1 py-1 md:pe-2 md:ps-1 md:py-1.5 border-2 border-purple-500 text-purple-500 rounded-sm font-bold text-xs md:text-sm hover:border-purple-300 hover:text-purple-400 transition duration-200 ease-in group'>
                        <i class='bx bx-mail-send mx-1' ></i>Mail

                    </button>
                </h1>

                <hr className='border-1 border-purple-500 mb-2' />

                <div className='grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3 my-2 pb-2'>

                    {allUsers && allUsers.length > 0 ? (
                        allUsers.map((user, index) => (

                            <UserCard key={index} user={user} deleteUser={deleteUser} promoteUser={promoteUser} />
                        ))
                    ) : (
                        <p className='font-bold text-red-600'>No users to display!</p>
                    )}
                    {/* <UserCard deleteUser={deleteUser} promoteUser={promoteUser}></UserCard>
                <UserCard deleteUser={deleteUser} promoteUser={promoteUser}></UserCard>
                <UserCard deleteUser={deleteUser} promoteUser={promoteUser}></UserCard> */}
                </div>

                <h1 className='p-2'><strong className='text-xl flex items-center font-bold'><i class='bx bx-cart-download me-2' ></i>All Orders</strong></h1>
                <hr className='border-1 border-purple-500 mb-2' />
                <div className="overflow-x-auto overflow-y-auto min-h-64">
                    <table className="min-w-full">
                        <thead>
                            <tr>
                                <th className="py-2 px-2 md:px-4 bg-purple-200 text-purple-800 text-center">Order_ID</th>
                                <th className="py-2 px-2 md:px-4 bg-purple-200 text-purple-800 text-center">Dog_Id</th>
                                <th className="py-2 px-2 md:px-4 bg-purple-200 text-purple-800 text-center">Price</th>
                                <th className="py-2 px-2 md:px-4 bg-purple-200 text-purple-800 text-center">Status</th>
                                <th className="py-2 px-2 md:px-4 bg-purple-200 text-purple-800 text-center">Placement</th>
                            </tr>
                        </thead>
                        <tbody className='bg-white'>
                            {
                                allOrders && allOrders.length > 0 ? (
                                    allOrders.map((order, index) => (
                                        <tr key={index}>

                                            <td className="border text-center px-2 md:px-4 text-sm md:text-md py-2">{order.id}</td>
                                            <td className="border text-center px-2 md:px-4 text-sm md:text-md py-2">{order.dog_id}</td>
                                            <td className="border text-center px-2 md:px-4 text-sm md:text-md py-2">{order.approved_rate}</td>
                                            <td className="border text-center px-2 md:px-4 text-sm md:text-md py-2">
                                                <span className={`px-2 md:px-3 text-xs py-0.5 bg-${order.status ? 'green' : 'red'}-300 rounded-full text-${order.status ? 'green' : 'red'}-700 md:text-sm`}>{order.status ? "Completed" : "Pending"}</span>
                                            </td>
                                            <td className="border px-2 md:px-4 text-sm md:text-md py-2 text-center">{new Date(order.created_at).toLocaleDateString()}</td>
                                        </tr>
                                    ))
                                )
                                    :
                                    (
                                        <tr>
                                            <td className="border px-2 md:px-4 text-center text-red-500 text-sm md:text-md py-2" colSpan={5} >No Orders to Display</td>
                                        </tr>
                                    )
                            }
                            {/* <tr>

                            <td className="border px-2 md:px-4 text-sm md:text-md py-2">5</td>
                            <td className="border px-2 md:px-4 text-sm md:text-md py-2">6</td>
                            <td className="border px-2 md:px-4 text-sm md:text-md py-2">25000</td>
                            <td className="border px-2 md:px-4 text-sm md:text-md py-2">
                                <span className={`px-2 md:px-3 text-xs py-0.5 bg-green-300 rounded-full text-green-700 md:text-sm`}>Completed</span>
                            </td>
                            <td className="border px-2 md:px-4 text-sm md:text-md py-2">5th dec 2024</td>
                        </tr> */}

                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Admin