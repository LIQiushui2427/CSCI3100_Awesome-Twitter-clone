import React from 'react';
import { useState, useContext } from 'react';
import { registerUser, verifyPassword, generateOTP, verifyOTP, resetPassword } from '../helper/helper';
import { registerValidation, loginValidation, sendOTPValidation, resetPasswordValidation } from '../helper/validate';
import { useFormik } from 'formik';
import toast, { Toaster } from 'react-hot-toast';
import { Router, useRouter } from 'next/router';

// Defining the Login component
const Login = () => {
    const router = useRouter();
    // Setting up state variables to determine which forms to show
    const [show_login, setShowLogin] = useState(true)
    const [show_signup, setShowSignup] = useState(false)
    const [show_reset, setShowReset] = useState(false)
    const [verify_OTP, setVerifyOTP] = useState(false)
    const [show_reset_password, setShowResetPassword] = useState(false)

    // Setting up state variables to store user inputs
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [code, setCode] = useState(null);
    const [email, setEmail] = useState(null);
    const [password2, setPassword2] = useState(null);

    // Setting up a form using the useFormik hook for registering a new user
    const formik_register = useFormik({
        initialValues: {
            username: '',
            password: '',
            email: ''
        },
        validate: registerValidation, // Validation function for the registration form
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async values => { // Action to take when the form is submitted
            let registerPromise = registerUser(values) // Call the registerUser helper function to register the new user
            toast.promise(registerPromise, {
                loading: 'Creating...',
                success: 'Register Successfully!',
                error: 'Could not register.'
            }); // Display a toast message while the promise is resolved

            registerPromise.then(function () { // Reset the form and show the login form after the promise is resolved
                setShowLogin(true),
                    setShowSignup(false),
                    setShowReset(false)
            });
        }
    })

    // Setting up a form using the useFormik hook for logging in an existing user
    const formik_login = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validate: loginValidation, // Validation function for the login form
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async values => { // Action to take when the form is submitted
            let loginPromise = verifyPassword(values) // Call the verifyPassword helper function to verify the user's password
            toast.promise(loginPromise, {
                loading: 'Logging in...',
                success: 'Login Successfully!',
                error: 'Could not login.'
            }); // Display a toast message while the promise is resolved

            loginPromise.then(res => { // Set the JWT token in local storage and redirect to the home page after the promise is resolved
                let { token } = res.data;
                localStorage.setItem('token', token);
                router.push('/');
            });
        }
    })


    // Initialize formik form for sending OTP
    const formik_sendOTP = useFormik({
        initialValues: {
            username: '',
        },
        // Validate form input using sendOTPValidation function
        validate: sendOTPValidation,
        validateOnBlur: false,
        validateOnChange: false,
        // When form is submitted, generate an OTP and show loading, success, or error message using toast.promise
        onSubmit: async values => {
            let OTPPromise = generateOTP(values)
            toast.promise(OTPPromise, {
                loading: 'Sending OTP...',
                success: 'OTP has been sent to your registered email!',
                error: 'Invalid username!'
            });
            // If OTP is generated successfully, hide the "reset password" form and show the "verify OTP" form
            OTPPromise.then(res => {
                setShowReset(false)
                setVerifyOTP(true)
            });
        }
    })

    // Initialize formik form for verifying OTP
    const formik_verifyOTP = useFormik({
        initialValues: {
            username: '',
            code: ''
        },
        validateOnBlur: false,
        validateOnChange: false,
        // When form is submitted, verify the OTP and show loading, success, or error message using toast.promise
        onSubmit: async values => {
            let verifyOTPPromise = verifyOTP(values)
            toast.promise(verifyOTPPromise, {
                loading: 'Verifying OTP...',
                success: 'OTP has been verified!',
                error: 'Incorrect OTP!'
            });
            // If OTP is verified successfully, hide the "verify OTP" form and show the "reset password" form
            verifyOTPPromise.then(res => {
                setVerifyOTP(false)
                setShowResetPassword(true)
            });
        }
    })

    // Initialize formik form for resetting password
    const formik_resetPassword = useFormik({
        initialValues: {
            username: "",
            password: "",
            password2: ""
        },
        // Validate form input using resetPasswordValidation function
        validate: resetPasswordValidation,
        validateOnBlur: false,
        validateOnChange: false,
        // When form is submitted, reset the password and show loading, success, or error message using toast.promise
        onSubmit: async values => {
            let ResetPromise = resetPassword(values)
            toast.promise(ResetPromise, {
                loading: 'Resetting your password...',
                success: 'Password has been reset for you!',
                error: 'Check your password again!'
            });
            // If password is reset successfully, hide the "reset password" form and show the "login" form
            ResetPromise.then(res => {
                setShowResetPassword(false)
                setShowLogin(true)
            });
        }
    })

    return (
        <div style={{ backgroundImage: `url('https://cdn.discordapp.com/attachments/1089880136037437460/1090532764060758016/background.jpg')` }} className="bg-bottom bg-cover h-screen justify-center items-center">
            <Toaster position='top-center' reverseOrder={false}></Toaster>

            <div className='flex py-10 items-center'>
                <div className='ml-20 font-bold text-4xl'>Twitter</div>
                <button className="ml-auto mr-20 bg-transparent border-white border-2 text-white px-10 py-3 rounded-lg hover:bg-white hover:text-gray-800 transition duration-300 ease-in-out" onClick={() => { setShowLogin(true), setShowSignup(false), setShowReset(false), setVerifyOTP(false), setShowResetPassword(false) }}>
                    Login
                </button>
            </div>

            <div className='flex justify-center items-center mt-15'>

                {show_login ?
                    <div className="w-96 p-6 shadow-lg bg-transparent rounded border-white border-2 backdrop-blur-md backdrop-brightness-35 backdrop-contrast-100">
                        <button className='w-6 h-6 absolute top-3 right-3' onClick={() => setShowLogin(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <div className="flex justify-center items-center">
                            <h1 className="text-2xl text-black font-bold">Login Twitter</h1>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="ml-2 w-6 h-6">
                                <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
                            </svg>
                        </div>
                        <hr className="mt-3" />
                        <form onSubmit={formik_login.handleSubmit}>
                            <div className="mt-3">
                                <label htmlFor="username" className="flex justify-start items-center text-base text-black font-bold mb-3 rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="mr-1 w-4 h-4">
                                        <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                                    </svg>
                                    Username
                                </label>
                                <input {...formik_login.getFieldProps('username')} type="username" id="username" className="border rounded w-full text-base px-3 py-2 text-black leading-tight focus:border-black" placeholder="Enter Username" value={username} />
                            </div>

                            <div className="mt-3">

                                <label htmlFor="password" className="flex justify-start items-center text-base text-black font-bold mb-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="mr-1 w-4 h-4">
                                        <path d="M336 352c97.2 0 176-78.8 176-176S433.2 0 336 0S160 78.8 160 176c0 18.7 2.9 36.8 8.3 53.7L7 391c-4.5 4.5-7 10.6-7 17v80c0 13.3 10.7 24 24 24h80c13.3 0 24-10.7 24-24V448h40c13.3 0 24-10.7 24-24V384h40c6.4 0 12.5-2.5 17-7l33.3-33.3c16.9 5.4 35 8.3 53.7 8.3zM376 96a40 40 0 1 1 0 80 40 40 0 1 1 0-80z" />
                                    </svg>
                                    Password
                                </label>
                                <input {...formik_login.getFieldProps('password')} type="password" id="password" className="border rounded w-full text-base px-3 py-2 text-black leading-tight focus:border-black" placeholder="Enter Password" value={password} />
                            </div>

                            <div className="mt-2 flex justify-end">
                                <div className="text-gray-600 font-bold hover:underline cursor-pointer" onClick={() => { setShowReset(true), setShowLogin(false) }}>Reset Password?</div>
                            </div>

                            <div className="mt-5 justify-center items-center">
                                <button type="submit" className="border-3 bg-sky-500 text-white py-2 w-full rounded hover:bg-sky-300" >Login</button>
                            </div>
                        </form>

                        <div className="mt-3 flex justify-center">
                            <span className="text-gray-500">Don&apos;t have an account yet?&nbsp;</span>
                            <div className="text-gray-600 font-bold hover:underline cursor-pointer" onClick={() => { setShowLogin(false), setShowSignup(true) }}>Sign Up Now</div>
                        </div>
                    </div> : null
                }

                {show_signup ?
                    <div className="w-96 p-6 shadow-lg bg-transparent rounded border-white border-2 backdrop-blur-md backdrop-brightness-35 backdrop-contrast-100">
                        <button className='w-6 h-6 absolute top-3 right-3' onClick={() => setShowSignup(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <div className="flex justify-center items-center">
                            <h1 className="text-2xl text-black font-bold">Signup Twitter</h1>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="ml-2 w-6 h-6">
                                <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
                            </svg>
                        </div>
                        <hr className="mt-3" />
                        <form onSubmit={formik_register.handleSubmit}>
                            <div className="mt-3">
                                <label htmlFor="username" className="flex justify-start items-center text-base text-black font-bold mb-3 rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="mr-1 w-4 h-4">
                                        <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                                    </svg>
                                    Username
                                </label>
                                <input {...formik_register.getFieldProps('username')} type="username" id="username" className="border rounded w-full text-base px-3 py-2 text-black leading-tight focus:border-black" placeholder="Enter Username" value={username} />
                            </div>

                            <div className="mt-3">

                                <label htmlFor="password" className="flex justify-start items-center text-base text-black font-bold mb-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="mr-1 w-4 h-4">
                                        <path d="M336 352c97.2 0 176-78.8 176-176S433.2 0 336 0S160 78.8 160 176c0 18.7 2.9 36.8 8.3 53.7L7 391c-4.5 4.5-7 10.6-7 17v80c0 13.3 10.7 24 24 24h80c13.3 0 24-10.7 24-24V448h40c13.3 0 24-10.7 24-24V384h40c6.4 0 12.5-2.5 17-7l33.3-33.3c16.9 5.4 35 8.3 53.7 8.3zM376 96a40 40 0 1 1 0 80 40 40 0 1 1 0-80z" />
                                    </svg>
                                    Password
                                </label>
                                <input {...formik_register.getFieldProps('password')} type="password" id="password" className="border rounded w-full text-base px-3 py-2 text-black leading-tight focus:border-black" placeholder="Enter Password" value={password} />
                            </div>
                            <div className="mt-3">
                                <label htmlFor="email" className="flex justify-start items-center text-base text-black font-bold mb-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="mr-1 w-4 h-4">
                                        <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
                                    </svg>
                                    Email
                                </label>
                                <input {...formik_register.getFieldProps('email')} type="email" id="email" className="border rounded w-full text-base px-3 py-2 text-black leading-tight focus:border-black" placeholder="Enter your email" value={email} />
                            </div>


                            <div className="mt-5 justify-center items-center">
                                <button type="submit" className="border-3 bg-sky-500 text-white py-2 w-full rounded hover:bg-sky-300" /*onClick = {formik_register.handleSubmit}*/>Sign Up</button>
                            </div>
                        </form>

                        <div className="mt-3 flex justify-center">
                            <span className="text-gray-500">Already have an account! </span>
                            <div className="text-gray-600 font-bold hover:underline ml-5 cursor-pointer" onClick={() => { setShowLogin(true), setShowSignup(false) }}>Login</div>
                        </div>
                    </div> : null
                }

                {show_reset ?
                    <div className="w-96 p-6 shadow-lg bg-transparent rounded border-white border-2 backdrop-blur-md backdrop-brightness-35 backdrop-contrast-100">
                        <button className='w-6 h-6 absolute top-3 right-3' onClick={() => setShowReset(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <div className="flex justify-center items-center">
                            <h1 className="text-2xl text-black font-bold">Reset Password</h1>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="ml-2 w-6 h-6">
                                <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
                            </svg>
                        </div>
                        <hr className="mt-3" />
                        <form onSubmit={formik_sendOTP.handleSubmit}>
                            <div className="mt-3">
                                <label htmlFor="username" className="flex justify-start items-center text-base text-black font-bold mb-3 rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="mr-1 w-4 h-4">
                                        <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                                    </svg>
                                    Username
                                </label>
                                <input {...formik_sendOTP.getFieldProps('username')} type="username" id="username" className="border rounded w-full text-base px-3 py-2 text-black leading-tight focus:border-black" placeholder="Enter Username" value={username} />
                            </div>

                            <div className="mt-5 justify-center items-center">
                                <button type="submit" className="border-3 bg-sky-500 text-white py-2 w-full rounded hover:bg-sky-300">Send OTP</button>
                            </div>
                        </form>
                        <div className="mt-3 flex justify-center">
                            <span className="text-gray-500">Don&apos;t have an account yet?&nbsp;</span>
                            <div className="text-gray-600 font-bold hover:underline cursor-pointer" onClick={() => { setShowLogin(false), setShowSignup(true), setShowReset(false) }}>Sign Up Now</div>
                        </div>
                    </div> : null
                }
                {verify_OTP ?
                    <div className="w-96 p-6 shadow-lg bg-transparent rounded border-white border-2 backdrop-blur-md backdrop-brightness-35 backdrop-contrast-100">
                        <button className='w-6 h-6 absolute top-3 right-3' onClick={() => setVerifyOTP(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <div className="flex justify-center items-center">
                            <h1 className="text-2xl text-black font-bold">Verify OTP</h1>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="ml-2 w-6 h-6">
                                <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
                            </svg>
                        </div>
                        <hr className="mt-3" />
                        <form onSubmit={formik_verifyOTP.handleSubmit}>
                            <div className="mt-3">
                                <label htmlFor="username" className="flex justify-start items-center text-base text-black font-bold mb-3 rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="mr-1 w-4 h-4">
                                        <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                                    </svg>
                                    Username
                                </label>
                                <input {...formik_verifyOTP.getFieldProps('username')} type="username" id="username" className="border rounded w-full text-base px-3 py-2 text-black leading-tight focus:border-black" placeholder="Enter Username" value={username} />
                            </div>
                            <div className="mt-3">
                                <label htmlFor="username" className="flex justify-start items-center text-base text-black font-bold mb-3 rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="mr-1 w-4 h-4">
                                        <path d="M336 352c97.2 0 176-78.8 176-176S433.2 0 336 0S160 78.8 160 176c0 18.7 2.9 36.8 8.3 53.7L7 391c-4.5 4.5-7 10.6-7 17v80c0 13.3 10.7 24 24 24h80c13.3 0 24-10.7 24-24V448h40c13.3 0 24-10.7 24-24V384h40c6.4 0 12.5-2.5 17-7l33.3-33.3c16.9 5.4 35 8.3 53.7 8.3zM376 96a40 40 0 1 1 0 80 40 40 0 1 1 0-80z" />
                                    </svg>
                                    OTP
                                </label>
                                <input {...formik_verifyOTP.getFieldProps('code')} type="code" id="code" className="border rounded w-full text-base px-3 py-2 text-black leading-tight focus:border-black" placeholder="Enter OTP" value={code} />
                            </div>

                            <div className="mt-5 justify-center items-center">
                                <button type="submit" className="border-3 bg-sky-500 text-white py-2 w-full rounded hover:bg-sky-300">Verify OTP</button>
                            </div>
                        </form>

                    </div> : null
                }
                {show_reset_password ?
                    <div className="w-96 p-6 shadow-lg bg-transparent rounded border-white border-2 backdrop-blur-md backdrop-brightness-35 backdrop-contrast-100">
                        <button className='w-6 h-6 absolute top-3 right-3' onClick={() => setShowResetPassword(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <div className="flex justify-center items-center">
                            <h1 className="text-2xl text-black font-bold">Enter New Password</h1>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="ml-2 w-6 h-6">
                                <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
                            </svg>
                        </div>
                        <hr className="mt-3" />
                        <form onSubmit={formik_resetPassword.handleSubmit}>
                            <div className="mt-3">
                                <label htmlFor="username" className="flex justify-start items-center text-base text-black font-bold mb-3 rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="mr-1 w-4 h-4">
                                        <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                                    </svg>
                                    Username
                                </label>
                                <input {...formik_resetPassword.getFieldProps('username')} type="username" id="username" className="border rounded w-full text-base px-3 py-2 text-black leading-tight focus:border-black" placeholder="Enter Username" value={username} />
                            </div>
                            <div className="mt-3">
                                <label htmlFor="username" className="flex justify-start items-center text-base text-black font-bold mb-3 rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="mr-1 w-4 h-4">
                                        <path d="M336 352c97.2 0 176-78.8 176-176S433.2 0 336 0S160 78.8 160 176c0 18.7 2.9 36.8 8.3 53.7L7 391c-4.5 4.5-7 10.6-7 17v80c0 13.3 10.7 24 24 24h80c13.3 0 24-10.7 24-24V448h40c13.3 0 24-10.7 24-24V384h40c6.4 0 12.5-2.5 17-7l33.3-33.3c16.9 5.4 35 8.3 53.7 8.3zM376 96a40 40 0 1 1 0 80 40 40 0 1 1 0-80z" />
                                    </svg>
                                    New Password
                                </label>
                                <input {...formik_resetPassword.getFieldProps('password')} type="password" id="password" className="border rounded w-full text-base px-3 py-2 text-black leading-tight focus:border-black" placeholder="Enter New Password" value={password} />
                            </div>
                            <div className="mt-3">
                                <label htmlFor="username" className="flex justify-start items-center text-base text-black font-bold mb-3 rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="mr-1 w-4 h-4">
                                        <path d="M336 352c97.2 0 176-78.8 176-176S433.2 0 336 0S160 78.8 160 176c0 18.7 2.9 36.8 8.3 53.7L7 391c-4.5 4.5-7 10.6-7 17v80c0 13.3 10.7 24 24 24h80c13.3 0 24-10.7 24-24V448h40c13.3 0 24-10.7 24-24V384h40c6.4 0 12.5-2.5 17-7l33.3-33.3c16.9 5.4 35 8.3 53.7 8.3zM376 96a40 40 0 1 1 0 80 40 40 0 1 1 0-80z" />
                                    </svg>
                                    New Password Again
                                </label>
                                <input {...formik_resetPassword.getFieldProps('password2')} type="password" id="password" className="border rounded w-full text-base px-3 py-2 text-black leading-tight focus:border-black" placeholder="Enter New Password" value={password2} />
                            </div>

                            <div className="mt-5 justify-center items-center">
                                <button type="submit" className="border-3 bg-sky-500 text-white py-2 w-full rounded hover:bg-sky-300">Reset Password</button>
                            </div>

                        </form>
                    </div> : null
                }
            </div>
        </div>
    )
}

export default Login;
