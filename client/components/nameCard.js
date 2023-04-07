import React from "react";


function NameCard (){
    return(
        <div className="flex flex-col w-96 my-5 rounded shadow-lg bg-white ">
        <div className="mx-8  flex flex-row justify-between">
            <img className="rounded-full h-24 w-24  mt-3  " src="https://pbs.twimg.com/profile_images/1440624750808625171/7kSNddJC_400x400.jpg" alt="/"></img>
            <div className="my-auto">
            <button className=" b-4 rounded-full border px-4 py-2 text-sm font-medium bg-black text-white" >Following</button>
            </div>
        </div>
        <h2 className="mt-4 px-8 font-bold ">Florin Pop</h2>
        <h3 className="font-light text-sm px-8">@florinpop1705</h3>
        <p className="text-sm font-light px-8 py-2  ">Dev and YouTuber Building In Public 💜 
        - 💻 YouTube: <a className="text-cyan-400" href="http://youtube.com/florinpop">http://youtube.com/florinpop</a>
        - 📚 eBook: <a className="text-cyan-400" href="http://florinpop17.gumroad.com/l/makemoneydev">http://florinpop17.gumroad.com/l/makemoneydev</a>
        </p>
        <div className="flex flex-row mt-5 mx-8 my-4">
          <p className="text-[11px] text-slate-900 mr-5">• 1,864 Following</p>
          <p className="text-[11px] text-slate-900 mr-5 ">• 149.5K Followers</p>
          <p className="text-[11px] text-slate-900">• Since October 2012</p>
        </div>

      </div>

    );
}

export default NameCard;