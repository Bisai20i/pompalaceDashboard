import React, { useEffect, useState } from 'react'
import Submit from '../form/Submit'
import spinner from '../elements/spinner.gif'

function ManageNotice(props) {
    let [notices, setNotices] = useState({})
    let [loading, setLoading] = useState(false)
    let [editing, setEditing] = useState(false)
    let [update, setUpdate] = useState('Add Notice')
    let [updating, setUpdating] = useState(false)
    let [noticeTopic, setNoticeTopic] = useState('')
    let [noticeDescription, setNoticeDescription] = useState('')
    let [noticeId, setNoticeId] = useState(0)

    useEffect(()=>{
        fetchData();
    },[]);


    const fetchData = async () => {

        try {
            setLoading(true)
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}notices`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('POM_TOKEN')}`
                }
            });
            const data = await response.json();
            // console.log(data);
            console.log(data.data)
            if (data.status) {
                setNotices(data.data)
            }

            setLoading(false)
        } catch (error) {
            console.error("Error:", error);
        }
    };


    const handleNotice = async (e) => {
        e.preventDefault()
        setUpdate("Submitting Request...")
        let formData = new FormData()
        if (document.querySelector("input[name = 'image']").files.length > 0) {
            formData.append('image', document.querySelector("input[name = 'image']").files[0]);
        }
        formData.append('title', noticeTopic)
        formData.append('description', noticeDescription)

        // for (let [key, value] of formData.entries()) {
        //     console.log(`${key}:`, value);
        // }
        if (updating) {

            const response = await fetch(`${process.env.REACT_APP_BASE_URL}update_notice/`+noticeId, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('POM_TOKEN')}`,
                    'X-HTTP-Method-Override': 'PUT',
                },
                body: formData,
            })
            const data = await response.json()
            // console.log(data)
            if (data.status) {

                
                setUpdating(false)
                setEditing(false)
                setUpdate("Add Notice")

                fetchData()
            }
            else {
                setUpdate('Try again')
            }
            

        }
        else {

            // console.log(formData)
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}add_notice`, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('POM_TOKEN')}`,
                },
                body: formData,
            })
            const data = await response.json()
            console.log(data)
            if (data.status) {
                setUpdating(false)
                setNotices([
                    ...notices,
                    data.data
                ]);
            }
            else {
                setUpdating(false)
            }
            setUpdate('Add Notice')
        }



    }

    const handleNoticeEdit = (id, topic, description) => {
        setNoticeId(id)
        setNoticeTopic(topic)
        setNoticeDescription(description)
        setUpdate('Save Changes')
        setUpdating(true);
        setEditing(true);


    }

    const handleNoticeDelete = async(id) => {
        if (window.confirm("Do you want to delete this notice? This operation cannot be undone.")) {
            console.log(id);

            const response = await fetch(`${process.env.REACT_APP_BASE_URL}destroy_notice/`+ id,{
                method:"POST",
                headers:{
                    'X-HTTP-Method-Override' : "DELETE",
                    'Authorization' :`Bearer ${localStorage.getItem('POM_TOKEN')}`,
                }
            })

            const data = await response.json()
            console.log(data)
            if(data.status){
                window.alert("Notice Deleted Successfully.")
                setNotices(notices.filter(notice => notice.id !== id));
            }
            else{
                window.alert("Some error Occured.")
            }
        }
    }
    return (
        <div className='absolute hidden top-4 left-0 pt-5 px-2 md:px-4  w-full z-10' id='noticeModal'>

            <div className='bg-white rounded-sm shadow-md shadow-purple-400 p-4'>

                <header className='flex justify-between mb-2 text-center items-center'>
                    <span className='text-sm md:text-lg lg:text-xl flex items-center font-semibold'><i className='bx bx-arrow-back p-2 me-1 cursor-pointer' onClick={() => { document.getElementById('noticeModal').classList.add('hidden') }}></i>Manage Notices </span>
                    <strong className='font-normal flex items-center text-sm md:text-md lg:text-lg'>

                        <button className='pe-2 ps-1 py-1 md:pe-4 md:ps-2 md:py-1.5 border-2 border-green-500 text-green-500 rounded-sm font-bold text-xs md:text-sm hover:border-green-300 hover:text-green-400 transition flex items-center duration-200 ease-in' onClick={() => { setEditing(true) }}><i className='bx bx-comment-add mx-2'  ></i>Add Notice</button>

                    </strong>
                </header>

                <hr className='border-1 border-purple-500 mb-2' />

                {loading && <div className='w-full flex justify-center my-1'><img src={spinner} className='h-24' alt='loading' /></div>}

                {
                    editing &&

                    <form className='bg-purple-100/50 rounded-sm p-2 md:p-4' onSubmit={handleNotice}>
                        <div className='block md:flex gap-4 justify-center'>
                            <div className='flex-1'>
                                <label htmlFor="Noice Title" className='my-2 text-purple-600'>Notice Topic</label>
                                <input className='px-3 py-1 md:px-5 md:py-2 text-md md:text-lg rounded-sm focus:outline-none ring-2 ring-purple-400 focus:ring-purple-600 w-full my-2 shadow-md shadow-purple-400' type="text" name="topic" value={noticeTopic} onChange={(e) => setNoticeTopic(e.target.value)} />

                            </div >

                            <div className='flex-1'>
                                <label htmlFor="Notice Image" className='my-2 text-purple-600'>Notice Image</label>
                                <input className='px-3 py-1 md:px-5 md:py-2 text-md md:text-lg rounded-sm focus:outline-none ring-2 ring-purple-400 focus:ring-purple-600 w-full my-2 shadow-md shadow-purple-400' type="file" name="image" accept="image/*" />


                            </div>
                        </div>
                        <div>
                            <label htmlFor="Notice Description" className='my-2 text-purple-600'>Notice Description</label>
                            <textarea className='px-3 py-1 md:px-5 md:py-2 text-md md:text-lg rounded-sm focus:outline-none ring-2 ring-purple-400 focus:ring-purple-600 w-full my-2 shadow-md shadow-purple-400' rows={3} type="text" name="description" value={noticeDescription} onChange={(e) => setNoticeDescription(e.target.value)}>
                            </textarea>
                        </div>

                        <div className='block md:flex gap-4 justify-center'>
                            <Submit name={update}></Submit>
                            <button className='w-full py-1.5 my-2 bg-transparent px-1.5 md:px-4  border-2 border-red-500 text-red-500 rounded-sm font-bold text-xs md:text-sm hover:border-red-300 hover:scale-95 transition duration-200 ease-in' onClick={() => { setEditing(false) }}>Close ❌</button>

                        </div>

                    </form>
                }

                <h1 className='p-2 flex justify-between'><strong className='text-xl font-bold flex items-center'>All Notices:</strong> <button onClick={fetchData} className='px-2 py-1 rounded-sm border text-purple-500 border-purple-500 border-2 hover:shadow-sm hover:text-purple-400'>Refresh</button></h1>

                <div className="overflow-x-auto overflow-y-auto min-h-100 mb-2">
                    <table className="min-w-full">
                        <thead>
                            <tr>
                                <th className="py-2 px-2 md:px-4 bg-purple-200 text-purple-800 text-center">Image</th>
                                <th className="py-2 px-2 md:px-4 bg-purple-200 text-purple-800 text-center">Title</th>
                                <th className="py-2 px-2 md:px-4 bg-purple-200 text-purple-800 text-center">Description</th>
                                <th className="py-2 px-2 md:px-4 bg-purple-200 text-purple-800 text-center">Date</th>
                                <th className="py-2 px-2 md:px-4 bg-purple-200 text-purple-800 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody className='bg-white'>

                            {
                                
                                notices && notices.length > 0 ?
                                    notices.map((notice, index) => {
                                        const date = new Date(notice.created_at).toLocaleDateString();
                                        return (
                                            <tr key={index}>
                                                <td className="border px-4 py-2 text-center max-w-64">
                                                    {notice.imagePath ? <img src={notice.imagePath} alt="notice"  /> : notice.id}
                                                </td>
                                                <td className="border px-4 py-2">{notice.title}</td>
                                                <td className="border px-4 py-2">{notice.description}</td>

                                                <td className="border px-4 py-2">{date}</td>
                                                <td className="border px-2 md:px-4 text-sm md:text-md py-2 text-center">
                                                    <button onClick={() => { handleNoticeEdit(notice.id, notice.title, notice.description) }} className='p-0.5 m-1 text-purple-500 text-xs md:text-sm hover:text-purple-300'>Edit</button> <br />
                                                    <button onClick={() => handleNoticeDelete(notice.id)} className='p-0.5 m-1 text-red-500 text-xs md:text-sm hover:text-red-300'>Delete</button>
                                                </td>

                                            </tr>
                                        );
                                    }) :
                                    <p className='font-bold text-red-600'>No Notices to display!</p>
                            }


                        </tbody>
                    </table>
                </div>

            </div>



        </div>

    )
}

export default ManageNotice