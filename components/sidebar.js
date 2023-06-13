import React, { useState } from "react";
import Link from "next/link";
import {GiChefToque} from "react-icons/gi"
import { useRouter } from "next/router";



function Sidebar({ categories }) {

  const router = useRouter()

  return (
    <>
  
      <aside className="h-full w-48  fixed overflow-scroll">
        <Link href={'/main'}>
          <GiChefToque className="h-32 w-32 m-auto pt-4 pb-4"/>
        </Link>
        

        <div className="pl-8">
          <h2 className="text-xl mt-4 mb-4 text-bold font-bold">
            Discover Food
          </h2>
          <nav className="child-hover:text-blue-500 child:list-none">
            {categories &&
              categories.map((category, index) => {
                return (
                  <li className="pb pt-2 cursor-pointer italic text-gray-500" key={index} onClick={() => router.push(`/main?category=${category.name}`)}>
                    {category.name}
                  </li>
                );
              })}
          </nav>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
