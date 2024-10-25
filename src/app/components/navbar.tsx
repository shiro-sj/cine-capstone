import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'

export default function NavBar() {
  return (
    <div className='flex justify-around p-4'>
      <h1>cine</h1>
      <Link href={'/protected'}>Home</Link>
      <Link href={'/protected/stats'}>Stats</Link>
      <Link href={'/protected/profile'}>Profile</Link>
      <UserButton/>
    </div>
  )
};

