
import { useState } from "react";
import { FileDrop } from "react-file-drop";
import { PulseLoader } from "react-spinners";
import { updateUser } from "../helper/helper";
import convertToBase64 from '../helper/convert';
import toast, { Toaster } from 'react-hot-toast';

/**
 * EditableImage component displays an image with the ability to edit it, either by dropping a new image file
 * or clicking on the image to select a new file.
 *
 * @param type         Indicates whether the image is a "cover" image or a "profile" image
 * @param src          The source URL of the image to be displayed
 * @param onChange     Callback function to be executed after a new image has been uploaded and processed
 * @param className    Additional classes to be added to the component's HTML element
 * @param editable     Boolean indicating whether the image is editable (default: false)
 * @return             A React component
 */
export default function EditableImage({ type, src, onChange, className, editable = false }) {

  /**
   * State variables to keep track of the user's interaction with the component
   */
  const [isFileNearby, setIsFileNearby] = useState(false);
  const [isFileOver, setIsFileOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  /**
   * CSS classes to be applied to the component's HTML element based on the user's interaction
   */
  let extraClasses = '';
  if (isFileNearby && !isFileOver) extraClasses += ' bg-blue-500 opacity-40';
  if (isFileOver) extraClasses += ' bg-blue-500 opacity-90';
  if (!editable) extraClasses = '';

  /**
   * Variables to store the base64-encoded image data
   */
  let coverbase = '';
  let profilebase = '';

  /**
   * Function to handle the image upload and processing
   *
   * @param files The image file(s) to be uploaded and processed
   * @param e     The event object for the image upload event
   */
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

  /**
   * Render the component's HTML element
   */
  return (
    // Use the FileDrop component to allow dragging and dropping an image file onto the component
    <FileDrop
      onDrop={updateImage} // Call the updateImage function when a file is dropped onto the component
      onDragOver={() => setIsFileOver(true)} // Set isFileOver state to true when a file is dragged over the component
      onDragLeave={() => setIsFileOver(false)} // Set isFileOver state to false when a file is dragged off the component
      onFrameDragEnter={() => setIsFileNearby(true)} // Set isFileNearby state to true when a file is dragged over the component
      onFrameDragLeave={() => setIsFileNearby(false)} // Set isFileNearby state to false when a file is dragged off the component
      onFrameDrop={() => {
        setIsFileNearby(false); // Set isFileNearby state to false when a file is dropped onto the component
        setIsFileOver(false); // Set isFileOver state to false when a file is dropped onto the component
      }}
    >
      {/* The wrapper div for the component */}
      <div className={"bg-twitterBorder text-white relative"}>
        {/* The absolute positioned div used for the background color */}
        <div className={'absolute inset-0 ' + extraClasses}></div>
        {/* Show a loading spinner if isUploading state is true */}
        {isUploading && (
          <div className="absolute inset-0 flex items-center justify-center"
            style={{ backgroundColor: 'rgba(48, 140, 216,0.9)' }}>
            <PulseLoader size={14} color={'#fff'} />
          </div>
        )}
        {/* The container for the image */}
        <div className={"cover flex items-center overflow-hidden " + className}>
          {/* Only show the image if a source is provided */}
          {src && (<img src={src} className="w-full" alt="" />)}
        </div>
      </div>
    </FileDrop>
  );
}
