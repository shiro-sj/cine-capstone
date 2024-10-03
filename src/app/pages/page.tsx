import React from 'react'
import NavBar from '../components/NavBar';

function Home() {
  return (
    <div className="bg-gradient-to-br from-dark-purple to-slate-800 min-h-screen flex flex-col items-center justify-center gap-40 max-w-screen">
            <div className='m-32 flex flex-col items-center justify-center gap-40'>
                <header className='w-full'><NavBar/></header>
        </div>
    </div>
  )
}

export default Home;