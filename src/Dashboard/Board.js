import React, { useState, useEffect } from 'react'
import Card from '../elements/Card'
import spinner from '../elements/spinner.gif'
import Alert from '../elements/Alert'
import Button from '../elements/Button'



function Board(props) {
  let [details, setDetails] = useState({})
  let [approvebtn, setApprovebtn] = useState('Approve Order')
  let [orders, setOrders] = useState({ status: false, name: "View All Orders ⬇️", data: null })
  let [loading, setLoading] = useState(false)
  let [alert, setAlert] = useState({ status: false, type: 'success', message: "Alert sample" })
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}dashboard`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("POM_TOKEN")}`
          }
        });
        const data = await response.json();
        if (data.status) {
          setDetails({
            totalEarning: data.data.totalearning,
            totalDogs: data.data.totaldogs,
            soldDogs: data.data.solddogs
          });
          // console.log(data.data);
        } else {
          setAlert({ status: true, type: 'alert', message: data.message });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setAlert({ status: true, type: 'alert', message: 'An error occurred while fetching data.' });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchOrders = async () => {
    setOrders({ status: false, name: "Loading ...." })
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}userorders`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("POM_TOKEN")}`
      }
    })
    const data = await response.json()
    if (data.status) {
      setOrders({ status: true, name: "Refresh 🔃", data: data.data })
    }
    else {
      setAlert({ status: true, type: 'alert', message: data.message })
    }
  }

  const approveOrder= async(id, rate)=>{
    // console.log(id,rate)
    // let order = {}
    // if(rate){
    //   order = {
    //     order_id: id,
    //     approved_rate: rate
    //   }
    // }else{
    //   order={
    //     order_id: id
    //   }
    // }
    setApprovebtn('Approving....')
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}approveorder`,{
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("POM_TOKEN")}`,
        'X-HTTP-Method-Override': "PUT",
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        order_id: id,
        approved_rate: rate
      })
    })
    const data = await response.json()
    
    if(data.status){
      setAlert({ status: true, type: 'success', message: data.message })
    }
    else{
      setAlert({ status: true, type: 'alert', message: data.message })
      console.error(data.errors)
    }
    setApprovebtn('Approve Order')
  }


  return (
    <>
      {loading && <div className='w-full flex justify-center my-1'><img src={spinner} className='h-24' alt='loading' /></div>}
      {alert.status && <Alert type={alert.type} message={alert.message} close={() => { setAlert({ status: false }) }} />}
      <div className='py-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        <Card head="Total Dogs" important={details.totalDogs} bgcolor="blue"></Card>
        <Card head="Total Earnings" important={details.totalEarning} beforeimp="NPR." bgcolor="green"></Card>
        <Card head="Dogs Sold" important={details.soldDogs} bgcolor="cyan"></Card>

      </div>
      <div className="flex justify-center my-3">
        <Button name={orders.name} onClick={fetchOrders}></Button>
      </div>
      {
        orders.status &&
        <div className="my-2">
          <h1 className='p-2'><strong className='text-lg md:text-xl font-bold flex items-center'><i class='bx bx-receipt me-2' ></i>Your Orders:</strong></h1>
          <hr className='border-1 border-purple-500 mb-2' />
          <div className="overflow-x-auto overflow-y-auto min-h-64">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="py-2 px-4 bg-purple-200 text-purple-800 text-left">OrderId</th>
                  <th className="py-2 px-4 bg-purple-200 text-purple-800 text-left">DogId</th>
                  <th className="py-2 px-4 bg-purple-200 text-purple-800 text-left">BuyerName</th>
                  <th className="py-2 px-4 bg-purple-200 text-purple-800 text-left">BuyerContact</th>
                  <th className="py-2 px-4 bg-purple-200 text-purple-800 text-left">ReceivedDate</th>
                  <th className="py-2 px-4 bg-purple-200 text-purple-800 text-left">Rate</th>
                  <th className="py-2 px-4 bg-purple-200 text-purple-800 text-left">Approve</th>
                </tr>
              </thead>
              <tbody>
                {
                  orders.data.map((order, index) => {
                    const date = new Date(order.created_at).toLocaleDateString();
                    return (
                      <tr key={index} className={order.status ? 'bg-green-200' : 'bg-red-200'}>
                        <td className="border px-4 py-2">{order.id}</td>
                        <td className="border px-4 py-2">{order.dog_id}</td>
                        <td className="border px-4 py-2">{order.buyer_name}</td>
                        <td className="border px-4 py-2">{order.buyer_contact}</td>
                        <td className="border px-4 py-2">{date}</td>
                        <td className="border px-4 py-2">{order.approved_rate}</td>
                        <td className="border px-4 py-2 text-green-500">{order.status ? 'Completed' :
                          <button className='relative bg-transparent flex items-center border-2 border-green-500 hover:border-green-300 rounded-sm text-xs md:text-sm ps-0.5 pe-1 py-0.5 md:pe-2 md:ps-1 md:py-1 text-green-500 group' aria-label="Approve"><i class='bx bx-check-double mx-1.5'></i> Approve
                            <div className='shadow-md absolute overflow-hidden right-full bg-white/90 top-0 -translate-y-1/2 p-0 group-hover:p-2 w-0 group-hover:w-64 text-start h-0 group-hover:h-auto transition duration-300 ease-in'>
                              <h1 className='my-1 text-center font-bold'>Approve Dog</h1>
                              <hr />
                              <form onSubmit={(e) => { 
                                e.preventDefault(); 
                                e.preventDefault();
                                const dogId = e.target.querySelector('input[name="dogId"]').value;
                                const approvedRate = e.target.querySelector('input[name="approvedrate"]').value;
                                approveOrder(dogId, approvedRate);
                                }}>
                                <input type="hidden" name="dogId" value={order.id} />
                                <label htmlFor="approvedrate" className='text-purple-500 text-sm my-1'>Approve Rate</label>
                                <input type="number" name='approvedrate' className='px-1 my-1.5 md:px-1.5 py-0.5 md:py-1 w-full rounded-sm focus:outline-none ring-2 ring-purple-400 focus:ring-purple-600 text-black' />
                                <button type="submit" className='mt-2 flex items-center bg-green-500 text-white ps-1 pe-2 py-1 rounded-sm hover:bg-green-600'><i class='bx bx-check-double mx-1.5'></i>{approvebtn}</button>
                              </form>
                            </div>
                          </button>}</td>
                      </tr>
                    );
                  })
                }

              </tbody>
            </table>
          </div>
        </div>
      }

    </>
  )
}

export default Board