import React,{useState} from 'react'

function ConfirmModal(props) {
    let {close, details} = props
    let [submitText, setSubmitText] = useState("Yes, I'm sure")    
    let [alert, setAlert] = useState({status:false, type:'success', message: " Sample Alert"})


    const confirmModal = async()=>{
        setSubmitText("Requesting.")
        if(details.type === "success"){
            const response = await fetch('http://127.0.0.1:8000/api/admin/promote',{
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('POM_TOKEN')}`,
                    'X-HTTP-Method-Override': "PATCH",
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    user_id: details.id
                })
            })
            setSubmitText("Requesting..")
            const data = await response.json()
            setSubmitText("Requesting...")
            if(data.status){
                setAlert({status:true, type:'success', message: data.message})
                setSubmitText("Successfull")
            }else{
                setAlert({status:true, type:'alert', message: data.message})
                setSubmitText("Try Again")
                console.log(data)
            }

        }
        else{
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}admin/deleteuser`,{
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('POM_TOKEN')}`,
                    'X-HTTP-Method-Override': "DELETE",
                    'Content-Type': 'applicaton/json'
                },
                body: JSON.stringify({
                    user_id: details.id
                })
                
            })
            setSubmitText("Requesting...")
            const data = await response.json()
            setSubmitText("Requesting.....")
            if(data.status){
                setAlert({status:true, type:'success', message: data.message})
                setSubmitText("Successfull")
            }else{
                setAlert({status:true, type:'alert', message: data.message})
                console.log(data)
                setSubmitText("Try Again")
            }
        }
    }

    return (
        <div className={`border rounded-lg shadow-xl z-20 left-1/2 -translate-x-1/2 bg-white shadow-${details.type==='success'?'green':'red'}-500  absolute max-w-sm w-1/2 min-w-56 p-1`}>
            <div className="flex justify-end p-2">
                <button type="button" onClick={close} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </button>
            </div>

            <div className="py-6 px-2 md:px-4 pt-0 text-center">
                <svg className="w-20 h-20 text-red-600 mx-auto" fill="none" stroke={details.type==='success'?'green':'red'} viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <h3 className="text-md md:text-xl font-normal text-gray-500 mt-5 mb-2 md:mb-5">Are you sure you want to {details.type==='success'?'Promote':"Delete"} this user: {details.name}?</h3>
                <button onClick={confirmModal}
                    className={`text-white bg-${details.type==='success'?'green':'red'}-600 hover:bg-${details.type==='success'?'green':'red'}-800 focus:ring-2 focus:ring-red-400 font-medium rounded-sm text-base inline-flex items-center px-3 py-1.5 md:py-2.5 text-center m-2`}>
                    {submitText}
                </button>
                <button onClick={close}
                    className="text-gray-900 bg-white hover:bg-purple-100 focus:ring-2 focus:ring-purple-400 border border-purple-200 font-medium inline-flex items-center rounded-sm text-base px-3 py-1.5 md:py-2.5 text-center">
                    No, cancel
                </button>
            </div>
            {alert.status && <span className={`absolute rounded-sm px-2 bg-${alert.type === 'success'?'green':'red'}-200 bottom-0 right-0 w-full text-${alert.type === 'success'?'green':'red'}-600 text-sm py-1 text-xs md:text-sm text-center`}>{alert.message}</span>}
        </div>
    )
}

export default ConfirmModal