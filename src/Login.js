import React, {useState} from 'react'
import Input from './form/Input'
import Submit from './form/Submit'


export default function Login(props) {

  let [type, setType] = useState(true)
  let [error, setError] = useState({status:false, type:'', message:''})
  let [email, setEmail] = useState('')
  let [password, setPassword] = useState('')
  let [contact, setContact] = useState(98)
  let [address, setAddress] = useState('')
  let [name, setName] = useState('')
  let {login} = props

  const submitLogin = (e)=>{
    e.preventDefault()

    if(email === 'user@pompalace.com' && password === 'pompalace'){
      login()
    }
    else{
      setError({status: true, type: 'alert', message:'Invalid Credientials'})
    }
  }
  return (
    <div className='w-full h-screen flex justify-center items-center '>
      <div className='md:w-1/2 md:block hidden overflow-hidden text-center'>
      <img className='h-screen w-full' src="https://th.bing.com/th/id/OIP.ZJNcc_Df-H0DfYVJEweydAHaJQ?rs=1&pid=ImgDetMain" alt="dog" />
      </div>

      <div className='md:w-1/2 w-full px-4 md:px-10 lg:px-20 '>
        
        {
          type?
          <>
            <article className='p-2 text-xs md:text-sm  border-2 rounded-md mb-2 bg-white border-red-500 shadow-md shadow-purple-400'>
              
              🆗 | Use email as <strong>user@pompalace.com </strong>
              and password as <strong>pompalace</strong>. <br />
              <span className='text-xs text-red-500'>** This site is implemented without backend and for test purpose only.</span>
              </article>
            <strong className='headText text-xl'>Login</strong>
            <form onSubmit={submitLogin} className='mt-2'>
              <label htmlFor="Email" className='pt-2 text-purple-600'>Email</label>
              <Input type="email" name="email" description="Enter your Email" value={email} setvalue={setEmail}></Input>
              <label htmlFor="Password" className='pt-2 text-purple-600'>Password</label>
              <Input type="password" name="password" description="Enter your Password" value={password} setvalue={setPassword}></Input>
              <Submit name="Login"></Submit>
            </form>
            <p className='w-full flex justify-center p-2'>Don't have an account?</p>
            <strong className='block w-full text-center'><button onClick={()=>{setType(false)}} className='rounded-md hover:underline hover:ring-purple-500 hover:ring-2 px-4 py-1'>Signup</button></strong>
          </>
        
          :
          <>
            <strong className='text-xl headText '>Sign Up</strong>
            <form action="" className='mt-2'>
              <Input type="text" name="name" description="Full Name" value={name} setvalue={setName}></Input>
              <Input type="email" name="email" description="Email" value={email} setvalue={setEmail}></Input>
              <Input type="number" name="contact" description="Contact" value={contact} setvalue={setContact}></Input>
              <Input type="text" name="address" description="Address" value={address} setvalue={setAddress}></Input>
              <Input type="password" name="password" description="Password" value={password} setvalue={setPassword}></Input>
              <Submit name="SignUp"></Submit>
            </form>
            
            <strong className='block w-full text-center mt-3'><button onClick={()=>{setType(true)}} className='rounded-md hover:underline hover:ring-purple-500 hover:ring-2 px-4 py-1'>Back</button></strong>
          </>
        }
        
        {error.status && 
          <div className={`w-full flex justify-between items-center px-4 py-2 my-2 rounded-md bg-${error.type==='success'?'green':'red'}-300 shadow-md shadow-purple-300 text-${error.type==='success'?'green':'red'}-700`}>
            <article><span className='font-bold'>{error.type.toUpperCase()} </span>| {error.message}</article>
            <button onClick={()=>{setError({status:false})}} className='px-4 py-2 font-bold rounded-full '>X</button>
          </div>
        }
      </div>

      
        
      
    </div>
  )
}
