import React, { useState } from 'react';

const Signup = ({ name, email, birthday, gender, username, password }) => {
    const [currentPage, setCurrentPage] = useState(1);
    
    function NextPage() {
        setCurrentPage(currentPage + 1);
    }

    function PrevPage() {
        setCurrentPage(currentPage - 1);
    }

    switch (currentPage) {
        case 1: {
            return (
                <div className="flex justify-center items-center h-screen bg-sky-500">
                    <div className="w-96 p-6 shadow-lg bg-white rounded">
                        <div className="flex justify-center items-center">
                            <h1 className="text-2xl text-black font-bold">Sign Up for Twitter</h1>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="ml-2 w-6 h-6">
                                <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"/>
                            </svg>
                        </div>
                        <hr className="mt-3"/>

                        <div className="block justify-start items-center">
                            <h1 className="mt-1 text-base text-black font-bold">Step 1 of 2</h1>
                        </div>

                        <div className="mt-3">
                            <label htmlFor="name" className="flex justify-start items-center text-base text-black font-bold mb-3">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="mr-1 w-4 h-4">
                                    <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/>
                                </svg>
                                Name
                            </label>
                            <input type="name" id="name" className="border rounded w-full text-base px-3 py-2 text-black leading-tight focus:border-black" placeholder="Enter your name" value={name}/>
                        </div>

                        <div className="mt-3">
                            <label htmlFor="email" className="flex justify-start items-center text-base text-black font-bold mb-3">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="mr-1 w-4 h-4">
                                    <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/>
                                </svg>
                                Email
                            </label>
                            <input type="email" id="email" className="border rounded w-full text-base px-3 py-2 text-black leading-tight focus:border-black" placeholder="Enter your email" value={email}/>
                        </div>

                        <div className="mt-3">
                            <label htmlFor="birthday" className="flex justify-start items-center text-base text-black font-bold">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="mr-1 w-4 h-4">
                                    <path d="M86.4 5.5L61.8 47.6C58 54.1 56 61.6 56 69.2V72c0 22.1 17.9 40 40 40s40-17.9 40-40V69.2c0-7.6-2-15-5.8-21.6L105.6 5.5C103.6 2.1 100 0 96 0s-7.6 2.1-9.6 5.5zm128 0L189.8 47.6c-3.8 6.5-5.8 14-5.8 21.6V72c0 22.1 17.9 40 40 40s40-17.9 40-40V69.2c0-7.6-2-15-5.8-21.6L233.6 5.5C231.6 2.1 228 0 224 0s-7.6 2.1-9.6 5.5zM317.8 47.6c-3.8 6.5-5.8 14-5.8 21.6V72c0 22.1 17.9 40 40 40s40-17.9 40-40V69.2c0-7.6-2-15-5.8-21.6L361.6 5.5C359.6 2.1 356 0 352 0s-7.6 2.1-9.6 5.5L317.8 47.6zM128 176c0-17.7-14.3-32-32-32s-32 14.3-32 32v48c-35.3 0-64 28.7-64 64v71c8.3 5.2 18.1 9 28.8 9c13.5 0 27.2-6.1 38.4-13.4c5.4-3.5 9.9-7.1 13-9.7c1.5-1.3 2.7-2.4 3.5-3.1c.4-.4 .7-.6 .8-.8l.1-.1 0 0 0 0s0 0 0 0s0 0 0 0c3.1-3.2 7.4-4.9 11.9-4.8s8.6 2.1 11.6 5.4l0 0 0 0 .1 .1c.1 .1 .4 .4 .7 .7c.7 .7 1.7 1.7 3.1 3c2.8 2.6 6.8 6.1 11.8 9.5c10.2 7.1 23 13.1 36.3 13.1s26.1-6 36.3-13.1c5-3.5 9-6.9 11.8-9.5c1.4-1.3 2.4-2.3 3.1-3c.3-.3 .6-.6 .7-.7l.1-.1c3-3.5 7.4-5.4 12-5.4s9 2 12 5.4l.1 .1c.1 .1 .4 .4 .7 .7c.7 .7 1.7 1.7 3.1 3c2.8 2.6 6.8 6.1 11.8 9.5c10.2 7.1 23 13.1 36.3 13.1s26.1-6 36.3-13.1c5-3.5 9-6.9 11.8-9.5c1.4-1.3 2.4-2.3 3.1-3c.3-.3 .6-.6 .7-.7l.1-.1c2.9-3.4 7.1-5.3 11.6-5.4s8.7 1.6 11.9 4.8l0 0 0 0 0 0 .1 .1c.2 .2 .4 .4 .8 .8c.8 .7 1.9 1.8 3.5 3.1c3.1 2.6 7.5 6.2 13 9.7c11.2 7.3 24.9 13.4 38.4 13.4c10.7 0 20.5-3.9 28.8-9V288c0-35.3-28.7-64-64-64V176c0-17.7-14.3-32-32-32s-32 14.3-32 32v48H256V176c0-17.7-14.3-32-32-32s-32 14.3-32 32v48H128V176zM448 394.6c-8.5 3.3-18.2 5.4-28.8 5.4c-22.5 0-42.4-9.9-55.8-18.6c-4.1-2.7-7.8-5.4-10.9-7.8c-2.8 2.4-6.1 5-9.8 7.5C329.8 390 310.6 400 288 400s-41.8-10-54.6-18.9c-3.5-2.4-6.7-4.9-9.4-7.2c-2.7 2.3-5.9 4.7-9.4 7.2C201.8 390 182.6 400 160 400s-41.8-10-54.6-18.9c-3.7-2.6-7-5.2-9.8-7.5c-3.1 2.4-6.8 5.1-10.9 7.8C71.2 390.1 51.3 400 28.8 400c-10.6 0-20.3-2.2-28.8-5.4V480c0 17.7 14.3 32 32 32H416c17.7 0 32-14.3 32-32V394.6z"/>
                                </svg>
                                Date of Birth
                            </label>
                            <p className="text-gray-500 font-light text-sm mb-3">This will not be shown publicly. Confirm your own age, even if this account is for a business, a pet, or something else.</p>
                            <div className="flex w-full justify-between items-center">
                                <div className="relative inline-block">
                                    <select className="block appearance-none w-full border-gray-900 box-border bg-white shadow rounded text-base px-3 py-2 pr-12 text-gray-400 leading-tight focus:border-black">
                                        <option value="" disabled selected className="hidden">Month</option>
                                        <option value="01">January</option>
                                        <option value="02">February</option>
                                        <option value="03">March</option>
                                        <option value="04">April</option>
                                        <option value="05">May</option>
                                        <option value="06">June</option>
                                        <option value="07">July</option>
                                        <option value="08">August</option>
                                        <option value="09">September</option>
                                        <option value="10">October</option>
                                        <option value="11">November</option>
                                        <option value="12">December</option>
                                    </select>
                                    <div className="pointer-events-none absolute flex inset-y-0 right-0 px-2 items-center text-gray-900">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="fill-current h-4 w-4">
                                            <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"/>
                                        </svg>
                                    </div>
                                </div>
                                <div className="relative inline-block">
                                    <select className="block appearance-none w-full border-gray-900 box-border bg-white shadow rounded text-base px-3 py-2 pr-12 text-gray-400 leading-tight focus:border-black">
                                        <option value="" disabled selected className="hidden">Day</option>
                                    </select>
                                    <div className="pointer-events-none absolute flex inset-y-0 right-0 px-2 items-center text-gray-900">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="fill-current h-4 w-4">
                                            <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"/>
                                        </svg>
                                    </div>
                                </div>
                                <div className="relative inline-block">
                                    <select className="block appearance-none w-full border-gray-900 box-border bg-white shadow rounded text-base px-3 py-2 pr-12 text-gray-400 leading-tight focus:border-black">
                                        <option value="" disabled selected className="hidden">Year</option>
                                    </select>
                                    <div className="pointer-events-none absolute flex inset-y-0 right-0 px-2 items-center text-gray-900">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="fill-current h-4 w-4">
                                            <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-3">
                            <fieldset>
                                <legend className="flex justify-start items-center text-base text-black font-bold mb-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="mr-1 w-4 h-4">
                                        <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/>
                                    </svg>
                                    Gender
                                </legend>
                                <div className="flex justify-between items-center">
                                    <label htmlFor="gender-female" className="border rounded w-[32%] text-base px-3 py-2 text-black leading-tight focus:border-black">
                                        <input type="radio" id="gender-female" name="gender" value="Female" className="mr-2"/>
                                        Female
                                    </label>
                                    <label htmlFor="gender-male" className="border rounded w-[32%] text-base px-3 py-2 text-black leading-tight focus:border-black">
                                        <input type="radio" id="gender-male" name="gender" value="Male" className="mr-2"/>
                                        Male
                                    </label>
                                    <label htmlFor="gender-others" className="border rounded w-[32%]} text-base px-3 py-2 text-black leading-tight focus:border-black">
                                        <input type="radio" id="gender-others" name="gender" value="Others" className="mr-2"/>
                                        Others
                                    </label>
                                </div>
                            </fieldset>
                        </div>

                        <div className="mt-5 justify-center items-center">
                            <button onClick={NextPage} type="submit" className="border-3 bg-black text-white py-2 w-full rounded hover:bg-gray-500">Next</button>
                        </div>

                        <div className="mt-3 flex justify-center">
                            <span className="text-gray-500">Already have an account?&nbsp;</span>
                            <a href="" className="text-sky-500">Login Now</a>
                        </div>
                    </div>
                </div>
            )
        }
    
        case 2: {
            return(
                <div className="flex justify-center items-center h-screen bg-sky-500">
                    <div className="w-96 p-6 shadow-lg bg-white rounded">
                        <div className="flex justify-center items-center">
                            <h1 className="text-2xl text-black font-bold">Sign Up for Twitter</h1>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="ml-2 w-6 h-6">
                                <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"/>
                            </svg>
                        </div>
                        <hr className="mt-3"/>

                        <div className="block justify-start items-center">
                            <h1 className="mt-1 text-base text-black font-bold">Step 2 of 2</h1>
                        </div>

                        <div className="mt-3">
                            <label htmlFor="username" className="flex justify-start items-center text-base text-black font-bold mb-3">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="mr-1 w-4 h-4">
                                    <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/>
                                </svg>
                                Create Username
                            </label>
                            <input type="username" id="username" className="border rounded w-full text-base px-3 py-2 text-black leading-tight focus:border-black" placeholder="Enter Username" value={username}/>
                        </div>

                        <div className="mt-3">
                            <label htmlFor="password" className="flex justify-start items-center text-base text-black font-bold mb-3">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="mr-1 w-4 h-4">
                                    <path d="M336 352c97.2 0 176-78.8 176-176S433.2 0 336 0S160 78.8 160 176c0 18.7 2.9 36.8 8.3 53.7L7 391c-4.5 4.5-7 10.6-7 17v80c0 13.3 10.7 24 24 24h80c13.3 0 24-10.7 24-24V448h40c13.3 0 24-10.7 24-24V384h40c6.4 0 12.5-2.5 17-7l33.3-33.3c16.9 5.4 35 8.3 53.7 8.3zM376 96a40 40 0 1 1 0 80 40 40 0 1 1 0-80z"/>
                                </svg>
                                Create Password
                            </label>
                            <input type="password" id="password" className="border rounded w-full text-base px-3 py-2 text-black leading-tight focus:border-black" placeholder="Enter Password" value={password}/>
                        </div>

                        <div className="mt-5 flex justify-center items-center">
                            <button onClick={PrevPage} type="submit" className="border-3 bg-black text-white py-2 w-2/5 rounded hover:bg-gray-500">Back</button>
                            <button onClick={SubmitEvent} type="submit" className="ml-8 border-3 bg-sky-500 text-white py-2 w-2/5 rounded hover:bg-sky-300">Submit</button>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default Signup;