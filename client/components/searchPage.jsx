import React from 'react';
//import Tweet from './tweet/tweet';
import UserList from './userlist';
function SearchPage() {
  return (
    <div className="w-1/2 mx-auto mt-10">
      <div className="flex items-center bg-white rounded-full shadow-xl">
        <input
          className="rounded-l-full w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none"
          id="search"
          type="text"
          placeholder="Search..."
        />
        <div className="p-4">
          <button
            className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-400 focus:outline-none w-12 h-12 flex items-center justify-center"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        </div>
      </div>
        
        <div className="mt-10 w-20">
            <UserList />
        </div>
    </div>
  );
}

export default SearchPage;
/*
<div className="mt-10  w-20">
            <Tweet author="Testauthor" content="Testcontent" picture= "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbDFi9koI1_dNL4G-ln4LJgP4RXx6jgERift0PWrSr4w&usqp=CAU&ec=48665701://via.placeholder.com/150"/>
        </div>
        */