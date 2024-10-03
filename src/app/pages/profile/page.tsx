import NavBar from '@/app/components/NavBar';
import React from 'react'

function page() {
  return (
    <div className="bg-gradient-to-br from-dark-purple to-slate-800 min-h-screen flex flex-col items-center justify-center gap-40">
      
      <header className='w-full px-60 sticky top-10'>
        <NavBar />
      </header>

      <div className="flex flex-col items-center justify-center h-96">
        <h1>Profile</h1>
      </div>
      <div className="flex flex-col items-center justify-center h-96">
        <h1>Profile</h1>
      </div>
    </div>
  )
}

export default page;