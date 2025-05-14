import React, { useState } from 'react'
import { NavLink } from 'react-router'
import Input from '../form/Input'
import Submit from '../form/Submit'
// import Alert from '../elements/Alert'

function Recover() {
    let [submit, setSubmit] = useState('Find Account')
    let [email, setEmail] = useState('')
    let [found, setFound] = useState(false)
    let [otp, setOTP] = useState()
    let [contact, setContact] = useState()
    let [password, setPassword] = useState('')
    let [confirmpass, setConfirmpass] = useState('')
    let [otpConfirmed, setOTPconfirmed] = useState(false)
    let [successMessage, setSuccessMessage] = useState('')
    let [alert, setAlert] = useState("*Email and Contact must match for proceeding.")

    const findAccount = async (e) => {
        e.preventDefault()
        setSubmit('Searching....')
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}forgotpassword`, {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify({
                email: email,
                contact: contact
            })
        })
        const data = await response.json()
        if (data.status) {
            setAlert("Enter OTP withihn 5 minutes.")
            setSubmit("Submit Token")
            setFound(true)
        } else {
            setAlert(data.message)
        }
    }

    const submitCred = async (e) => {
        e.preventDefault()

        if (!otpConfirmed) {
            setSubmit('Matching Token...')
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}checktoken`, {
                method: "POST",
                headers: {
                    'Content-Type': "application/json",
                },
                body: JSON.stringify({
                    reset_token: otp
                })
            })
            const data = await response.json()
            if (data.status) {
                setSubmit("Reset Password")
                setAlert("Passwords must be of at least 6 length!")
                setOTPconfirmed(true)
            } else {
                setSubmit("Try Again")
                setAlert(data.message)
            }
        }
        else {
            if (password === confirmpass) {
                setSubmit('Resetting...')
                const response = await fetch(`${process.env.REACT_APP_BASE_URL}resetpassword`, {
                    method: "POST",
                    headers: {
                        'Content-Type': "application/json",
                    },
                    body: JSON.stringify({
                        reset_token: otp,
                        password: password
                    })
                })
                const data = await response.json()
                if (data.status) {
                    setSubmit("Successfull")
                    setSuccessMessage(data.message + ' Now procced for login!')

                } else {
                    setSubmit("Try Again")
                    setAlert(data.message)
                }
            }
            else {
                setAlert("Passwords didnot Matched.")
            }
            // fetch changepassword
        }
    }
    return (
        <>
            {
                found ?
                    <div>
                        <strong className='headText text-xl'>User Verification</strong>
                        {
                            !otpConfirmed && <p className='mt-3 text-xs md:text-sm text-green-500'>Reset Token / OTP has been sent to your Mail.</p>
                        }
                        <form onSubmit={submitCred} className='mt-2'>
                            <label htmlFor="token" className='pt-2 text-purple-600'>Reset Token</label>
                            <Input type="number" name="otp" description="Enter your OTP (Reset Token)" value={otp} setvalue={setOTP}></Input>

                            {
                                otpConfirmed && <>
                                    <p className='my-1 text-green-500 text-xs md:text-sm'>OTP has been verified</p>
                                    <label htmlFor="password" className='pt-2 text-purple-600'>New Password</label>
                                    <Input type="password" name="otp" description="Enter new password" value={password} setvalue={setPassword}></Input>

                                    <label htmlFor="token" className='pt-2 text-purple-600'>Confirm Password</label>
                                    <Input type="password" name="otp" description="Confirm your passwsord" value={confirmpass} setvalue={setConfirmpass}></Input>

                                </>
                            }

                            <span className='my-1 text-xs md:text-sm text-red-500'>{alert}</span>
                            <Submit name={submit}></Submit>
                        </form>
                        {
                            !otpConfirmed && <><p className='my-2 text-xs md:text-sm text-red-500'>Please check your email for <strong>OTP</strong>, Reset Token will expire in 5 Minutes from Now. </p>
                                <p className='my-2 text-xs md:text-sm text-red-500'>Also Check you <strong>Spam Section</strong>, Sometimes it is delevired to spam. </p></>
                        }

                    </div>
                    :
                    <div>
                        <strong className='headText text-xl'>Recover</strong>
                        <form onSubmit={findAccount} className='mt-2'>
                            <label htmlFor="Email" className='pt-2 text-purple-600'>Email</label>
                            <Input type="email" name="email" description="Enter your Email" value={email} setvalue={setEmail}></Input>
                            <label htmlFor="contact" className='pt-2 text-purple-600'>Contact</label>
                            <Input type="number" name="contact" description="Enter your Contact number" value={contact} setvalue={setContact}></Input>
                            <Submit name={submit}></Submit>
                        </form>
                        <p className='my-2 text-xs md:text-sm text-purple-500'>Enter your Email and Contact Number that you used while signing up!</p>
                        <span className='my-1 text-xs md:text-sm text-red-500'>{alert}</span>
                    </div>
            }
            <p className='mt-4 text-center'><NavLink to={'/'} className="font-semibold px-4 py-1.5 text-purple-700 hover:underline transitioin duration-300 ease-in cursor-pointer">Login</NavLink>
            </p>
            <span className='text-green-500 text-xs md:text-sm'>{successMessage}</span>
            {/* {alert.status && <Alert type={alert.type} message={alert.message} close={()=>{setAlert({status:false})}}/> } */}

        </>
    )
}

export default Recover