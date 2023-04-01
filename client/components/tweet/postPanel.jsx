import React, { useState, useEffect } from 'react';
import axios from '../../config';
import {checkLoginStatus,getUsername} from '../../helper/helper'
const PostPanel = () => {
  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);

const [username,setUsername]=useState('getUsername');

    useEffect(() => {
    getUsername().then(res => setUsername(res));
    }, []);
  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    setImages(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      // handle case where token is not found in localStorage
      return;
    }
    const formData = new FormData();
    formData.append("username", username);
    formData.append("content", content);

    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }
    console.log("username", username);
    console.log("content", content);
    console.log("images", images);
    console.log("formData", formData);
    try {
      await axios.post(`/tweet/createTweet`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "multipart/form-data",
        },
      });
      // handle success
      setContent("");
      setImages([]);
    } catch (error) {
      console.log(error);
      // handle error
    }
  }; 
  

  return (
    <form onSubmit={handleSubmit} className="px-4 py-3 rounded-lg shadow-md">
      <div>
        <textarea
          value={content}
          onChange={handleContentChange}
          className="block w-full border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50 shadow-sm sm:text-sm"
          style={{ backgroundColor: 'white', color: 'black' }}
        />
      </div>
      <div>
        <input type="file" accept="image/*" multiple onChange={handleImageChange} className="block mt-1 w-full" />
      </div>
      <button
        type="submit"
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Tweet
      </button>
    </form>
  );
};

export default PostPanel;