import React, { useState } from 'react';

function Button() {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
    // do some other following stuff
  };

  return (
    <button
      className={`px-4 py-2 rounded-lg ${isActive ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
      onClick={handleClick}
    >
      {isActive ? 'Followed' : 'Follow'}
    </button>
  );
}

export default Button;