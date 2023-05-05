import React from "react";
import Button from "@/components/follow_button";
import { Router, useRouter } from 'next/router';


const userDefault = {
  'avatar': 'https://inews.gtimg.com/newsapp_bt/0/12614599781/1000',
  'name': 'Carlos',
  'id': 'carlos',
  'signature': 'Work hard, play hard!'

};

function UserRow({ hostname= 'host', user = userDefault, isfollowing=true}) { //parameter to insert: user

   const router = useRouter();
   const username = user.id??'host';


  return (

    <div className="grid grid-cols-3 gap-0">
    <div onClick={() => router.push(`/profile/${username}`)} className="container col-span-2 ml-auto mx-auto pt-3 pl-20 cursor-pointer">
          <ul>
              <li key={user.id} className="flex items-center py-4 px-15">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img src={user.avatar} alt={user.name} />
                </div>
                <div className="ml-4">
                 <h2><b>{user.name}</b></h2>
                  <p className="text-gray-500">@{user.id}</p>
                  <p className="text-white-300">{user.signature}</p>
                </div>
              </li>
          </ul>
      </div>
      <div className="flex justify-center items-center col-span-1">
        <div className="align-left">
          <Button hostname={hostname} guestname={user.id} isfollowing={isfollowing}/>
        </div>
      </div>
    </div>

  );

}

export default UserRow;
