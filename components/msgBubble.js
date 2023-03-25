import React from 'react';

export function MsgBubble(props) {
    switch (props.msgType) {
        case "msgSent":
            return(
                <div>
                    <div className="mt-3 flex justify-end items-center">
                        <div className="flex bg-sky-500 rounded-full rounded-br-lg p-2">
                            <p className="text-white">{props.msg}</p>
                        </div>
                    </div>
                    <div className="flex justify-end items-center text-gray-400">
                        <span className="font-light">{props.time}</span>
                    </div>
                </div>
            )
        case "msgReceived":
            return(
                <div>
                    <div className="mt-3 flex items-center">
                        <img src="https://randomuser.me/api/portraits/men/1.jpg" className="w-8 h-8 rounded-full mr-2"/>
                        <div className="flex bg-gray-700 rounded-full rounded-bl-lg p-2">
                            <p className="text-white">{props.msg}</p>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="w-8 h-8 mr-4"></div>
                        <div className="flex justify-start items-center text-gray-400">
                            <span className="font-light">{props.time}</span>
                        </div>
                    </div>
                </div>
            )
    }
}