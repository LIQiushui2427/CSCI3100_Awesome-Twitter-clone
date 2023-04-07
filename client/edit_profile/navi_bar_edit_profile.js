import React from 'react';
import { FaTimes, FaSave } from 'react-icons/fa';
import { useState } from 'react';
import tw from 'twin.macro';

const NavBar = tw.nav`
  bg-black
  text-white
  sticky
  top-0
  flex
  justify-between
  items-center
  px-4
  py-2
`;

const Title = tw.h1`
  text-lg
  font-bold
`;

const Button = tw.button`
  text-white
  bg-black
  border-2
  border-white
  rounded
  px-4
  py-2
  hover:bg-white
  hover:text-black
`;

const CancelButton = tw.button`
  text-white
  bg-black
  rounded-full
  p-2
  hover:bg-white
  hover:text-black
`;

const EditProfileNavBar = () => {
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(true);
    // Add save functionality here
  };

  return (
    <NavBar>
      <div>
        <CancelButton>
          <FaTimes />
        </CancelButton>
        <Title>Edit Profile</Title>
      </div>
      <Button onClick={handleSave}>
        {isSaved ? 'Saved' : 'Save'}
        <FaSave className="ml-2" />
      </Button>
    </NavBar>
  );
};

export default EditProfileNavBar;