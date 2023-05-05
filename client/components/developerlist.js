// DevelopersList.js

import { useRouter } from 'next/router';
/*
This component is used to display the list of developers on the right side of the page.
It will be used in the home page and the profile page.
*/
const DevelopersList = ({ developers }) => {
  const router = useRouter();

  const handleRedirect = (link) => {
    router.push(link);
  };

  return (
    <div className="bg-gray-800 p-4 rounded-md">
      <p className="text-white text-lg font-bold mb-4">Developers</p>
      <ul className="space-y-2">
        {developers.map((developer, index) => (
          <li key={index} className="flex items-center">
            <button
              className="text-white hover:underline"
              onClick={() => handleRedirect(developer.link)}
            >
              {developer.name}
            </button>
            <p className="ml-auto text-gray-300 text-sm">{developer.contact}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DevelopersList;
