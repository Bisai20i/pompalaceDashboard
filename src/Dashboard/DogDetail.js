import React, { useState, useEffect } from 'react'
import Button from '../elements/Button'
import pompalace from '../elements/pompalace.jpg'
import Loading from '../elements/Loading'
import Alert from '../elements/Alert'
import { v4 as uuidv4 } from 'uuid'
import CryptoJS from 'crypto-js'

function DogDetail(props) {
  const { dog } = props
  let [loading, setLoaing] = useState(false)
  let [confirm, setConfirm] = useState(false)
  let [alert, setAlert] = useState({ status: false, type: 'success', message: "Alert sample" })
  const [selectedValue, setSelectedValue] = useState("");
  const [formData, setFormData] = useState({
    amount: "0",
    tax_amount: "0",
    total_amount: "0",
    transaction_uuid: uuidv4(),
    product_service_charge: "0",
    product_delivery_charge: "0",
    product_code: "EPAYTEST",
    success_url: "http://localhost:3000/pompalaceDashboard#/dogs",
    failure_url: "http://localhost:3000/pompalaceDashboard#/dogs",
    signed_field_names: "total_amount,transaction_uuid,product_code",
    signature: "",
    secret: "8gBm/:&EnhH.1/q",
  })


  useEffect(()=>{

    const {total_amount, transaction_uuid, product_code, secret} = formData
    const hashedSignature = generateSignature(
      total_amount, transaction_uuid, product_code, secret
    )
    // console.log(formData.amount)
    // console.log(hashedSignature)

    setFormData({
      ...formData,
      signature: hashedSignature
    })

  },[formData.amount])

  
  const dog_id = dog.id
  const hideModal = () => {
    document.getElementById('DetailModal').classList.add('hidden')
  }

  const placeorder = async () => {
    setLoaing(true)
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}placeorder`, {
      method: "post",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        buyername: dog.buyername,
        buyercontact: dog.buyercontact,
        dog_id: dog_id
      })
    })
    const data = await response.json()
    setLoaing(false)
    if (data.status) {
      setAlert({ status: true, type: 'success', message: data.message })
    }
    else {
      setAlert({ status: true, type: 'alert', message: data.message })
    }

  }

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    setFormData({
      ...formData,
      amount: dog.price,
      total_amount: dog.price
    })
  };

   const generateSignature = (
    total_amount,
    transaction_uuid,
    product_code,
    secret
   ) =>{
    const hashString = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`
    const hash = CryptoJS.HmacSHA256(hashString,secret)
    const hashedSignature = CryptoJS.enc.Base64.stringify(hash)
    return hashedSignature
  }

  const confirmPlacement = () => {
    
    if(selectedValue === 'esewa'){
      document.getElementById('esewaPaymentForm').submit()
    }
    setConfirm(false)
    placeorder()


  }
  return (
    <div id='DetailModal' className="hidden w-11/12 rounded-md shadow-lg bg-white shadow-purple-400 mt-2 overflow-hidden absolute right-1/2 translate-x-1/2">
      <img src={`${dog.cover ? dog.cover : pompalace}`} alt="Cover" className='w-full h-48 md:h-64 shadow-sm shadow-purple-300' />
      <img src={`${dog.profile ? dog.profile : pompalace}`} alt="Profile" className='absolute top-10 md:top-16 translate-x-1/2 translate-y-1/2 w-32 shadow-md shadow-purple-300 md:w-48 h-32 md:h-48 rounded-full right-1/2 border-4 border-white' />
      <div className='mt-6 px-4 py-2'>
        <p className='flex justify-between items-center'>
          <span>{dog.name}</span>
          <span className='px-3 py-0.5 bg-green-300 rounded-full text-green-700 text-xs md:text-sm'>{dog.status ? "Available" : "Unavailable"}</span>
        </p>
        <p className='flex justify-between items-center'>
          <span className='text-xl md:text-2xl font-bold'>{dog.price}</span>
          <span className='text-sm md:text-md'>{dog.address}</span>
        </p>
        <p className='py-2'>{dog.description}</p>
        <p className='block md:flex justify-between items-center'>
          <span className='text-lg'>Owner: <strong >{dog.owner}</strong></span>
          <span className='font-bold block md:inline'>{dog.contact}</span>
        </p>
        {alert.status && <Alert type={alert.type} message={alert.message} close={() => { setAlert({ status: false }) }} />}

        {
          confirm &&
          <div className='absolute bottom-10 p-4 left-1/2 -translate-x-1/2 bg-purple-100 rounded-sm shadow-md text-center shadow-purple-200'>

            <input type="radio" className='me-2' name='paymentType' value={'cash'} onChange={handleChange} />
            <label htmlFor="CashOnDelivery">Cash on Delivery</label>
            <input type="radio" className='me-2 ms-4' name='paymentType' value={'esewa'} onChange={handleChange} />
            <label htmlFor="CashOnDelivery">Pay visa Esewa</label>

            <p className='flex justify-between text-gray-700 my-1.5'>
              <span>Total: </span>
              <span className='font-bold'>{dog.price}</span>
            </p>

            <form action="https://rc-epay.esewa.com.np/api/epay/main/v2/form" method="POST" id='esewaPaymentForm'>
              <input type="hidden" id="amount" name="amount" 
                value={formData.amount} 
                onChange={(e)=>{
                  setFormData( {...formData, amount: e.target.value, total_amount: e.target.value })}} required />
              <input type="hidden" id="tax_amount" name="tax_amount" value={formData.tax_amount}  required />
              <input type="hidden" id="total_amount" name="total_amount" value={formData.total_amount}  required />
              <input type="hidden" id="transaction_uuid" name="transaction_uuid" value={formData.uuid}  required />
              <input type="hidden" id="product_code" name="product_code" value={formData.product_code}  required />
              <input type="hidden" id="product_service_charge" name="product_service_charge" value={formData.product_service_charge}  required />
              <input type="hidden" id="product_delivery_charge" name="product_delivery_charge" value={formData.product_delivery_charge}  required />
              <input type="hidden" id="success_url" name="success_url" value={formData.success_url}  required />
              <input type="hidden" id="failure_url" name="failure_url" value={formData.failure_url}  required />
              <input type="hidden" id="signed_field_names" name="signed_field_names" value={formData.signed_field_names}  required />
              <input type="hidden" id="signature" name="signature" value={formData.signature}  required />
            </form>

            <hr className=' my-2 border-1 border-purple-500' />
            <p className='flex justify-between mt-2'>

              <button onClick={confirmPlacement} className='px-2 py-1 flex items-center md:px-4 border-2 border-green-500 text-green-500 rounded-sm font-bold text-xs md:text-sm hover:border-green-300 hover:scale-95 transition duration-300 ease-in'>Place Order</button>
              <button onClick={() => { setConfirm(false) }} className='pe-1.5 px-0.5 py-1 flex items-center md:pe-4 md:ps-2 border-2 border-red-500 text-red-500 rounded-sm font-bold text-xs md:text-sm hover:border-red-300 hover:scale-95 transition duration-300 ease-in'><i class='bx bx-window-close mx-2 text-lg' ></i> Close</button>
            </p>

          </div>
        }
        <hr className='my-2 border-1 border-purple-500' />
        <div className='flex justify-between py-2'>
          <Button name="Book Now" onClick={() => setConfirm(true)}></Button>

          <button onClick={hideModal} className='pe-1.5 px-0.5 py-1 flex items-center md:pe-4 md:ps-2 border-2 border-red-500 text-red-500 rounded-sm font-bold text-xs md:text-sm hover:border-red-300 hover:scale-95 transition duration-300 ease-in'><i class='bx bx-window-close mx-2 text-lg' ></i> Close</button>
        </div>

      </div>
      {loading && <Loading />}
    </div>
  )
}

export default DogDetail