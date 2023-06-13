import React from "react";
import Link from "next/link";
import {GiChefToque} from "react-icons/gi"

function Landing() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div>
        {/* <img className="w-32 h-32" src="https://img.icons8.com/ios/512/man-logo.png" alt="Logo" /> */}
        <GiChefToque className="h-16 w-16 mb-2"/>
      </div>
      <h1 className="font-serif lg:text-6xl">
        Food for students... by students.
      </h1>
      <h3 className="text-slate-500 lg:text-lg m-4 italic">
        Freshly curated recipes by students around the world.
      </h3>
      <div className="flex items-center space-between">
        <Link href={`/signup`}>
          <div className="mr-8">
            <button className="text-lg text-white bg-green-600 border-2 border-green-600 rounded-md lg:hover:scale-110 pl-20 pr-20 pt-2 pb-2 transition transition-duration: 150ms">
              Sign Up
            </button>
          </div>
        </Link>
        <Link href={`/login`}>
          <div>
            <button className="text-lg text-green-600 border-solid border-2 border-green-600  pl-20 pr-20 pt-2 pb-2  rounded-md transition transition-duration: 150ms lg:hover:scale-110">
              Sign In
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Landing;
