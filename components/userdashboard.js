import React from 'react'
import PinGallery from './pingallery'
import Mainbar from './mainbar'
import MobileMenu from './mobilemenu'
import { useMediaQuery } from '@/hooks/hooks'


function UserDashboard({session}) {
  let isMobile = useMediaQuery(640)


  return (
    <div className='flex flex-col md:ml-52'>
        {isMobile && <MobileMenu/>}
        <PinGallery session={session}/>
    </div>

  )
}

export default UserDashboard