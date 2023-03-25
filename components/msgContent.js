import React from 'react';
import { MsgBubble } from './msgBubble';

const MsgContent = ({ msg, time }) => {
    return(
        <div className="">
            <div className="bg-black w-auto h-screen float-right top-0 p-4">
                <div className="flex justify-between items-center">
                    <div className="p-4 flex items-center">
                        <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="User profile" className="w-8 h-8 rounded-full mr-2"/>
                        <div>
                        <h2 className="font-bold">John Doe</h2>
                        <p className="text-gray-400">@johndoe</p>
                        </div>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-8 h-8">
                        <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/>
                    </svg>
                </div>

                <div className="mt-5">
                    <div className="flex w-full justify-center items-center">
                        <span className="font-bold text-base text-white mr-2">John Doe</span>
                        <span className="text-base text-gray-400">@johndoe</span>
                    </div>
                    <div className="mt-3 flex justify-center items-center text-gray-400">
                        <div className="flex items-center text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                            </svg>
                            <div className="flex ml-2 text-gray-400">
                                Joined March 2023
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center items-center text-gray-400">
                        <div className="text-white font-bold">0</div>
                        <div className="pl-2">followers</div>
                        <div className="text-white font-bold pl-5">0</div>
                        <div className="pl-2">following</div>
                    </div>
                </div>

                <hr className="mt-3"/>

                <div>
                    <MsgBubble msgType="msgSent" msg="Hi, I&apos;m John Doe." time="00:00"/>
                    <MsgBubble msgType="msgReceived" msg="Hello, my name is John Doe too." time="00:01"/>
                    <MsgBubble msgType="msgSent" msg="What are you doing right now?" time="00:01"/>
                    <MsgBubble msgType="msgReceived" msg="I am writing sample chat messages for my Twitter-clone project." time="00:02"/>
                    <MsgBubble msgType="msgReceived" msg="CSCI3100 is very hard." time="00:03"/>
                </div>
                
                <div className="flex fixed bottom-0 w-full p-4">
                    <div className="flex w-full justify-between items-center pr-4">
                        <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-6 h-6 mr-2">
                                <path d="M448 80c8.8 0 16 7.2 16 16V415.8l-5-6.5-136-176c-4.5-5.9-11.6-9.3-19-9.3s-14.4 3.4-19 9.3L202 340.7l-30.5-42.7C167 291.7 159.8 288 152 288s-15 3.7-19.5 10.1l-80 112L48 416.3l0-.3V96c0-8.8 7.2-16 16-16H448zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm80 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z" fill="white"/>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-6 h-6 mr-2">
                                <path d="M149.1 64.8L138.7 96H64C28.7 96 0 124.7 0 160V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H373.3L362.9 64.8C356.4 45.2 338.1 32 317.4 32H194.6c-20.7 0-39 13.2-45.5 32.8zM256 192a96 96 0 1 1 0 192 96 96 0 1 1 0-192z" fill="white"/>
                            </svg>
                        </div>
                        <label htmlFor="msg" className="flex border border-gray-400 rounded-full w-full pl-16 pr-10 px-3 py-2 leading-tight focus:border-white">
                            <div className="flex justify-between items-center">
                                <input type="msg" id="msg" className="appearence-none flex w-full pl-2 pr-10 bg-transparent placeholder-opacity-70 placeholder-white leading-tight focus:outline-none" placeholder="Start a new message" value={msg}/>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-6 h-6 mr-2">
                                    <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM164.1 325.5C182 346.2 212.6 368 256 368s74-21.8 91.9-42.5c5.8-6.7 15.9-7.4 22.6-1.6s7.4 15.9 1.6 22.6C349.8 372.1 311.1 400 256 400s-93.8-27.9-116.1-53.5c-5.8-6.7-5.1-16.8 1.6-22.6s16.8-5.1 22.6 1.6zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" fill="white"/>
                                </svg>
                            </div>
                        </label>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-6 h-6">
                            <path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z" fill="white"/>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MsgContent;