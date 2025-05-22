import React, { useState } from 'react'
import logo from '../elements/pompalace.png'
import Input from '../form/Input'
import Submit from '../form/Submit'
import { NavLink } from 'react-router-dom'

function Login(props) {
    let { setError, setLoading, login } = props
    let [type, setType] = useState(true)
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let [contact, setContact] = useState()
    let [address, setAddress] = useState('')
    let [name, setName] = useState('')

    const submitLogin = async (e) => {
        e.preventDefault()
        setLoading(true)
        await fetch(`${process.env.REACT_APP_BASE_URL}login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password
            }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.status) {
                    localStorage.setItem('POM_TOKEN', data.token)
                    login(true)
                }
                else {
                    setError({ status: true, type: 'alert', message: data.message })
                }
                // console.log(data.status)
            })
            .catch(err => {
                console.error(err)
                setError({ status: true, type: 'alert', message: "Internal Server Error" })
            })
        setLoading(false)

        // if(email === 'user@pompalace.com' && password === 'pompalace'){
        //   login()
        // }
        // else{
        //   setError({status: true, type: 'alert', message:'Invalid Credientials'})
        // }
    }

    const sumbitSignup = async (e) => {
        e.preventDefault()
        setLoading(true)
        await fetch(`${process.env.REACT_APP_BASE_URL}signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                email: email,
                address: address,
                contact: contact,
                password: password
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.status) {
                    setError({ status: true, type: 'success', message: data.message })
                    setLoading(false)
                    setType(true)
                } else {
                    setError({ status: true, type: 'alert', message: data.message })
                }
            })
            .catch(error => {
                console.error('Error:', error)
            })
        setLoading(false)

    }

    return (
        <>
            {
                type ?
                    <div>
                        {/* <article className='p-2 text-xs md:text-sm  border-2 rounded-md mb-2 bg-white border-red-500 shadow-md shadow-purple-400'>
              
              🆗 | Use email as <strong>user@pompalace.com </strong>
              and password as <strong>pompalace</strong>. <br />
              <span className='text-xs text-red-500'>** This site is implemented without backend and for test purpose only.</span>
              </article> */}
                        <div className='flex justify-center h-24'>
                            <img src={logo} className='h-full w-auto' alt="logo" />
                        </div>
                        <strong className='headText text-xl'>Login</strong>
                        <form onSubmit={submitLogin} className='mt-2'>
                            <label htmlFor="Email" className='pt-2 text-purple-600'>Email</label>
                            <Input type="email" name="email" description="Enter your Email" value={email} setvalue={setEmail}></Input>
                            <label htmlFor="Password" className='pt-2 text-purple-600'>Password</label>
                            <Input type="password" name="password" description="Enter your Password" value={password} setvalue={setPassword}></Input>
                            <Submit name="Login"></Submit>
                        </form>
                        <p>Forgot password? <NavLink to={'/recover'} className="font-semibold text-purple-700 hover:underline transitioin duration-300 ease-in cursor-pointer">Click Here !</NavLink>
                        </p>
                        <p className='w-full flex justify-center p-2'>Don't have an account?</p>
                        <strong className='block w-full text-center'><button onClick={() => { setType(false) }} className='rounded-sm hover:underline hover:ring-purple-500 hover:ring-2 px-4 py-1'>Signup</button></strong>
                    </div>
                    :
                    <div>
                        <strong className='text-xl headText '>Sign Up</strong>
                        <form onSubmit={sumbitSignup} className='mt-2'>
                            <Input type="text" name="name" description="Full Name" value={name} setvalue={setName}></Input>
                            <Input type="email" name="email" description="Email" value={email} setvalue={setEmail}></Input>
                            <Input type="number" name="contact" description="Contact" value={contact} setvalue={setContact}></Input>
                            <Input type="text" name="address" description="Address" value={address} setvalue={setAddress}></Input>
                            <Input type="password" name="password" description="Password (Min: 6 character)" value={password} setvalue={setPassword}></Input>
                            <Submit name="SignUp"></Submit>
                        </form>

                        <strong className='block w-full text-center mt-3'><button onClick={() => { setType(true) }} className='rounded-sm hover:underline hover:ring-purple-500 hover:ring-2 px-4 py-1'>Back</button></strong>
                    </div>
            }
        </>

    )
}

export default Login