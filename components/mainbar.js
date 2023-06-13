import React, { useEffect, useState } from "react";
import { UserIcon, PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";

function Mainbar({ session }) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  console.log(session)

  return (
    <div className="flex flex-row justify-end md:p-6 md:mt-6 md:mb-6">
      <div className="md:mr-12 flex justify-center items-center">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search"
            className="md:w-72 w-48 py-2 px-4 border-gray-300 rounded-l-lg focus:outline-none shadow-lg drop-shadow-md"
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-r-lg shadow-lg drop-shadow-md"
            onClick={() => router.push(`/main?search=${query}`)}
          >
            🔎 Search
          </button>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <Link href={`/create`}>
          <div className="flex bg-black justify-center items-center mr-4 rounded-lg p-2 text-white hover:bg-gray-700">
            <PlusIcon className="h-8 w-8 sm:h-4 sm:w-4 mr-2" />
            <p className="hidden sm:block">Create Recipe</p>
          </div>
        </Link>
        {session && (
            <div className="flex bg-green-600 justify-center items-center mr-4 rounded-lg p-2 text-white hover:bg-green-800" onClick={() => router.push(`/users/${session.user.accountData[0].user_id}`)}>
              <UserIcon className="h-8 w-8 sm:h-4 sm:w-4 mr-2" />
              <p className="hidden sm:block">
                {session.user.accountData[0].username}
              </p>
            </div>
        )}
      </div>
    </div>
  );
}

export default Mainbar;
