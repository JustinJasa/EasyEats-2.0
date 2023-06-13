import React from 'react'
import { useSession } from "next-auth/react"
import User from '@/components/user'
import PinGallery from '@/components/pingallery'


function UserPage() {
const { data: session } = useSession()



  return (
    <div className='flex flex-col md:ml-52'>
        <User session={session}/>
        <div className='flex items-center text-center w-full justify-center'>
          <h3 className='text-center text-xl mt-6 mb-2 font-bold'>Your Recipes 📜</h3>
        </div>
        <PinGallery session={session}/>
    </div>
  )
}

export default UserPage;