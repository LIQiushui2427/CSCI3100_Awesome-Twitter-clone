import React from 'react';

const Login = ({ username, password }) => {
    return (
        <div className="flex justify-center items-center h-screen bg-sky-500">
            <div className="w-96 p-6 shadow-lg bg-white rounded">
                <div className="flex justify-center items-center">
                    <h1 className="text-2xl text-black font-bold">Login Twitter</h1>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="ml-2 w-6 h-6">
                        <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"/>
                    </svg>
                </div>
                <hr className="mt-3"/>

                <div className="mt-3">
                    <label htmlFor="username" className="flex justify-start items-center text-base text-black font-bold mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="mr-1 w-4 h-4">
                            <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/>
                        </svg>
                        Username
                    </label>
                    <input type="username" id="username" className="border rounded w-full text-base px-3 py-2 text-black leading-tight focus:border-black" placeholder="Enter Username" value={username}/>
                </div>

                <div className="mt-3">
                    <label htmlFor="password" className="flex justify-start items-center text-base text-black font-bold mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="mr-1 w-4 h-4">
                            <path d="M336 352c97.2 0 176-78.8 176-176S433.2 0 336 0S160 78.8 160 176c0 18.7 2.9 36.8 8.3 53.7L7 391c-4.5 4.5-7 10.6-7 17v80c0 13.3 10.7 24 24 24h80c13.3 0 24-10.7 24-24V448h40c13.3 0 24-10.7 24-24V384h40c6.4 0 12.5-2.5 17-7l33.3-33.3c16.9 5.4 35 8.3 53.7 8.3zM376 96a40 40 0 1 1 0 80 40 40 0 1 1 0-80z"/>
                        </svg>
                        Password
                    </label>
                    <input type="password" id="password" className="border rounded w-full text-base px-3 py-2 text-black leading-tight focus:border-black" placeholder="Enter Password" value={password}/>
                </div>

                <div className="mt-2 flex justify-end">
                    <a href="" className="text-gray-500 underline">Forgot Password?</a>
                </div>

                <div className="mt-5 justify-center items-center">
                    <button type="submit" className="border-3 bg-sky-500 text-white py-2 w-full rounded hover:bg-sky-300">Login</button>
                </div>

                <div className="mt-3 flex justify-center">
                    <span className="text-gray-500">Don&apos;t have an account yet?&nbsp;</span>
                    <a href="" className="text-sky-500">Sign Up Now</a>
                </div>
            </div>
        </div>
    )
}

export default Login;