/**
 * Borrow some part of the code from https://github.com/dejwid/twitter-clone/blob/master/components/EditableImage.js
 */

import { useState } from "react";
import { FileDrop } from "react-file-drop";
import { PulseLoader } from "react-spinners";
import { updateUser } from "../helper/helper";
import convertToBase64 from '../helper/convert';
import toast, { Toaster } from 'react-hot-toast';

export default function EditableImage({ type, src, onChange, className, editable = false }) {
  const [isFileNearby, setIsFileNearby] = useState(false);
  const [isFileOver, setIsFileOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  let extraClasses = '';
  if (isFileNearby && !isFileOver) extraClasses += ' bg-blue-500 opacity-40';
  if (isFileOver) extraClasses += ' bg-blue-500 opacity-90';
  if (!editable) extraClasses = '';
  let coverbase = '';
  let profilebase = '';
  async function updateImage(files, e) {
    if (!editable) {
      return;
    }
    e.preventDefault();
    setIsFileNearby(false);
    setIsFileOver(false);
    setIsUploading(true);
    const base64 = await convertToBase64(files[0]);
    if (type == "cover") {
      coverbase = base64
    }
    else {
      profilebase = base64
    }
    let values = {}
    if (type == "cover") {
      values = await Object.assign(values, { cover: coverbase || '' })
    }
    else {
      console.log(profilebase)
      values = await Object.assign(values, { profile: profilebase || '' })
    }
    let updatePromise = updateUser(values);
    updatePromise.then((res) => {
      if (type == "cover") {

        onChange(coverbase);
      }
      else {
        onChange(profilebase);
      }
      setIsUploading(false);
    });
  }
  return (
    <FileDrop
      onDrop={updateImage}
      onDragOver={() => setIsFileOver(true)}
      onDragLeave={() => setIsFileOver(false)}
      onFrameDragEnter={() => setIsFileNearby(true)}
      onFrameDragLeave={() => setIsFileNearby(false)}
      onFrameDrop={() => {
        setIsFileNearby(false);
        setIsFileOver(false);
      }}
    >
      <div className={"bg-twitterBorder text-white relative"}>
        <div className={'absolute inset-0 ' + extraClasses}></div>
        {isUploading && (
          <div className="absolute inset-0 flex items-center justify-center"
            style={{ backgroundColor: 'rgba(48, 140, 216,0.9)' }}>
            <PulseLoader size={14} color={'#fff'} />
          </div>
        )}
        <div className={"cover flex items-center overflow-hidden " + className}>
          {src && (<img src={src} className="w-full" alt="" />)}
        </div>
      </div>
    </FileDrop>
  );
}