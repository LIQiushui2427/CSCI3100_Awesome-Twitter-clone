// tobedone.js

import Router from "next/router";

const Tobedone = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <p className="text-white text-center text-2xl">
        This feature is yet to be implemented.
      </p>
      <button
        onClick={() => Router.push("/")}
        className="mt-4 px-4 py-2 bg-white text-black rounded-md shadow"
        >
        Go back to main page
        </button>
    </div>
  );
};

export default Tobedone;