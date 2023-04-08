import React, { useState } from 'react';
//import { useHistory } from 'react-router-dom';
//import { XIcon } from '@heroicons/react/outline';
//import { SaveIcon } from '@heroicons/react/solid';

function EditProfile({onClose}) {

  const [avatar, setAvatar] = useState(null);
  const [background, setBackground] = useState(null);
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [website, setWebsite] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');

  const handleAvatarChange = (e) => {
    setAvatar(e.target.files[0]);
  }

  const handleBackgroundChange = (e) => {
    setBackground(e.target.files[0]);
  }


  //const history = useHistory();

  const handleSaveChanges = () => {
    // TODO: Implement saving changes to backend API
    history.push('/profile');
  };

  return (
    
      <div className="z=30 relative bg-main-background rounded-2xl max-w-xl w-full h-[672px] overflow-hidden">
        <p>This is edit profile</p>
        {/*navigation*/}

        <div className="bg-black text-white sticky top-0 px-4 py-2 flex justify-between items-center">
          <button className="text-white text-xl" onClick={onClose}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
         </button>
         <h2 className="text-xl font-bold">Edit Profile</h2>
          <button className="text-white text-xl" onClick={onClose}>
          Save
          </button>
        </div>
        
      
        <div className="h-500 px-4 py-6 overflow-y-scroll">

        <div className="flex flex-col items-center mb-4">
          <label htmlFor="avatar" className="block text-gray-700 font-bold mb-2">
            Avatar
          </label>
          <input type="file" id="avatar" onChange={handleAvatarChange} />
          {avatar && <img src={URL.createObjectURL(avatar)} alt="avatar preview" className="h-32 mt-4" />}
        </div>

        <div className="flex flex-col items-center mb-4">
          <label htmlFor="background" className="block text-gray-700 font-bold mb-2">
            Background Picture
          </label>
          <input type="file" id="background" onChange={handleBackgroundChange} />
          {background && <img src={URL.createObjectURL(background)} alt="background preview" className="h-32 mt-4" />}
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="username-input">
            Username (Handle)
          </label>
          <input
            id="username-input"
            type="text"
            className="w-full px-3 py-2 border rounded-md border-gray-400"
            maxLength={15}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="bio-input">
            Bio
          </label>
          <textarea
            id="bio-input"
            className="w-full px-3 py-2 border rounded-md border-gray-400"
            maxLength={160}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="location-input">
            Location
          </label>
          <input
            id="location-input"
            type="text"
            className="w-full px-3 py-2 border rounded-md border-gray-400"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="display-name-input">
            Website
          </label>
          <input
            id="website-input"
            type="text"
            className="w-full px-3 py-2 border rounded-md border-gray-400"
            maxLength={50}
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="display-name-input">
            Date of birth
          </label>
          <input
            id="date-of-birth-input"
            type="text"
            className="w-full px-3 py-2 border rounded-md border-gray-400"
            maxLength={50}
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
        </div>
        
        
    </div>
    </div>
  

  )

}

export default EditProfile;
        
 
           
