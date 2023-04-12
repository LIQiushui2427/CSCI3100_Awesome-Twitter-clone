import React, { useState, useEffect, useRef } from 'react';
import axios from '../../config.js';
import { useFormik } from 'formik';
import toast, { Toaster } from 'react-hot-toast';
import useFetch from '../../hooks/fetch.hook';
import convertToBase64 from '../../helper/convert';
import { getUsername, checkLoginStatus } from '../../helper/helper';

import {
    PhotographIcon,
    XIcon,
} from '@heroicons/react/outline';
import { updateTweet } from '@/helper/helper.js';
import { set } from 'local-storage';

const Post = ({ onTweet }) => {
    const [selectedFile, setSelectedFile] = useState("");
    const filePickerRef = useRef(null);
    const [{ isLoading, apiData, serverError }] = useFetch(null);
    const [input, setInput] = useState('');
    const [username, setUsername] = useState(''); // Added useState to store username

    useEffect(() => {
        getUsername().then((value) => {
            setUsername(value); // Update username state with resolved value
        });
    }, []); // Use useEffect to fetch username once, when component mounts

    console.log(username); // Use console.log inside useEffect callback or after the promise is resolved

    const handleFileInputChange = async e => {
        const base64 = await convertToBase64(e.target.files[0]);

        setSelectedFile(base64);
    };

    const resetForm = () => {
        formik.resetForm();
        setSelectedFile("");
        setInput("");
    };

    const formik = useFormik({
        initialValues: {
            username: username || '',
            nickname: apiData?.nickname || username,
            content: "",
        },
        enableReinitialize: true,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async values => {
            values = await Object.assign(values, { images: selectedFile || '' })
            console.log(values)
            let updatePromise = updateTweet(values);
            toast.promise(updatePromise, {
                loading: 'Posting...',
                success: <b>Post Successfully...!</b>,
                error: <b>Fail to post!</b>
            }).then(() => {
                onTweet(values);
                resetForm();
            });
        }
    })
    
    return (<div>
        <div className="text-[#d9d9d9] flex items-center sm:justify-between py-2 px-3 sticky top-0 z-50 bg-black border-b border-gray-700">
            <h2 className="text-lg sm:text-xl font-bold">Home</h2>
            <div className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0 ml-auto">
            </div>
        </div>
        <div className="border-b border-gray-700 p-3 flex space-x-3 overflow-y-scroll scrollbar-hide">
            <img
                src={apiData?.profile || 'https://www.w3schools.com/howto/img_avatar.png'}
                alt=""
                className="h-11 w-11 rounded-full cursor-pointer"
            />
            <div className="divide-y divide-gray-700 w-full">
                <form onSubmit={formik.handleSubmit}>

                    <div className={`${selectedFile ? 'pb-7' : ''} ${input ? 'space-y-2.5' : ''}`}>
                        <textarea
                            name="content"
                            value={formik.values.content}
                            onChange={(e) => {
                                formik.handleChange(e);
                                setInput(e.target.value);
                            }}
                            onBlur={formik.handleBlur}
                            placeholder="What's happening?"
                            rows="2"
                            className="bg-transparent outline-none text-[#d9d9d9] text-lg placeholder-gray-500 tracking-wide w-full min-h-[100px]"
                        />
                        {selectedFile && (
                            <div className="relative">
                                <div
                                    className="absolute w-8 h-8 bg-[#15181c] hover:bg-[#272c26] bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer"
                                    onClick={() => setSelectedFile("")}
                                >
                                    <XIcon className="text-white h-5" />
                                </div>
                                <img src={selectedFile} alt="" className="rounded-2xl max-h-80 object-contain" />
                            </div>
                        )}
                    </div>

                    <div className="flex items-center justify-between pt-2.5">
                        <div className="flex items-center">
                            <div className="icon" onClick={() => filePickerRef.current.click()}>
                                <PhotographIcon className="text-[#1d9bf0] h-[22px]" />
                                <input type="file" ref={filePickerRef} hidden onChange={handleFileInputChange} />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="bg-[#1d9bf0] text-white rounded-full px-4 py-1.5 font-bold shadow-md hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-default"
                            disabled={!input && !selectedFile}
                        >
                            Tweet
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    )
};
export default Post;