import React from 'react';

const MsgLeftPane = () => {
    const developers = [
        { name: 'John Doe', username: '@johndoe', imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg', latestMsg: { msg: "CSCI3100 is very hard.", time: '00:03' } },
        { name: 'Jane Doe', username: '@janedoe', imageUrl: 'https://randomuser.me/api/portraits/women/2.jpg', latestMsg: { msg: "Hi, I'm Jane Doe.", time: '01:23' } },
        { name: 'Bob Smith', username: '@bobsmith', imageUrl: 'https://randomuser.me/api/portraits/men/3.jpg', latestMsg: { msg: "Hi, I'm Bob Smith.", time: '12:34' } },
        { name: 'Sara Johnson', username: '@sarajohnson', imageUrl: 'https://randomuser.me/api/portraits/women/4.jpg', latestMsg: { msg: "Hi, I'm Sara Johnson.", time: '23:41' } },
    ]

    return (
        <div className="bg-black w-96 h-screen fixed left-72 top-0 p-4">
            <div className="p-4 flex justify-between items-center">
                <h1 className="text-2xl text-white font-bold">Messages</h1>
                <div className="flex">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="mr-1 w-4 h-4">
                        <path d="M481.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-30.9 28.1c-7.7 7.1-11.4 17.5-10.9 27.9c.1 2.9 .2 5.8 .2 8.8s-.1 5.9-.2 8.8c-.5 10.5 3.1 20.9 10.9 27.9l30.9 28.1c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-39.7-12.6c-10-3.2-20.8-1.1-29.7 4.6c-4.9 3.1-9.9 6.1-15.1 8.7c-9.3 4.8-16.5 13.2-18.8 23.4l-8.9 40.7c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-8.9-40.7c-2.2-10.2-9.5-18.6-18.8-23.4c-5.2-2.7-10.2-5.6-15.1-8.7c-8.8-5.7-19.7-7.8-29.7-4.6L69.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l30.9-28.1c7.7-7.1 11.4-17.5 10.9-27.9c-.1-2.9-.2-5.8-.2-8.8s.1-5.9 .2-8.8c.5-10.5-3.1-20.9-10.9-27.9L8.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l39.7 12.6c10 3.2 20.8 1.1 29.7-4.6c4.9-3.1 9.9-6.1 15.1-8.7c9.3-4.8 16.5-13.2 18.8-23.4l8.9-40.7c2-9.1 9-16.3 18.2-17.8C213.3 1.2 227.5 0 242 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l8.9 40.7c2.2 10.2 9.4 18.6 18.8 23.4c5.2 2.7 10.2 5.6 15.1 8.7c8.8 5.7 19.7 7.7 29.7 4.6l39.7-12.6c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM242 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z" fill="white"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-4 h-4">
                        <path d="M240 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H176V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H384c17.7 0 32-14.3 32-32s-14.3-32-32-32H240V80z" fill="white"/>
                    </svg>
                </div>
            </div>
            
            <div className="p-4 flex justify-start items-center">
                <div className="flex w-full items-center justify-center bg-gray-300 p-2 rounded-full shadow-md text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4 mr-2">
                        <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
                    </svg>
                    Search for people and groups
                </div>
            </div>

            <ul className="list-none">
                {developers.map((developer) => ( 
                    <li key={developer.name} className="mb-4 flex w-full items-center">
                        <div className="p-4 flex w-full border-gray-900 items-center mr-2 hover:bg-gray-700">
                            <img src={developer.imageUrl} alt="User profile" className="w-8 h-8 rounded-full mr-2"/>
                            <div className="flex flex-col w-full">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center">
                                        <span className="text-white font-bold mr-2">{developer.name}</span>
                                        <span className="text-gray-300 mr-2">{developer.username}</span>
                                    </div>
                                    <div className="flex justify-end items-center">
                                        <span className="text-gray-300">{developer.latestMsg.time}</span>
                                    </div>
                                </div>
                                <div className="block text-gray-300">
                                    {developer.latestMsg.msg}
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default MsgLeftPane;