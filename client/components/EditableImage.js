import {useState} from "react";
import {FileDrop} from "react-file-drop";
import {PulseLoader} from "react-spinners";

export default function EditableImage({type,src,onChange,className,editable=false}) {
  let extraClasses = '';
  return (
    <div className={"bg-twitterBorder text-white relative"}>
      <div className={'absolute inset-0 '+extraClasses}></div>
      <div className={"cover flex items-center overflow-hidden "+className}>
        {src && (<img src={src} className="w-full" alt=""/>)}
      </div>
    </div>
  );
}