//import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'
import { useUser } from '@clerk/nextjs';

export default function NavBar() {
  // const { user, isSignedIn } = useUser();

  return (
    <div className='flex justify-around p-4'>
      <h1>cine</h1>
      <Link href={'/protected'}>Home</Link>
      <Link href={'/protected/stats'}>Stats</Link>
      <Link href={'/protected/profile'}>profile
        {/* <img src ={user?.imageUrl}
          className='w-9 h-9 rounded-full object-cover'
        /> */}
      </Link>
    </div>
  )
};

