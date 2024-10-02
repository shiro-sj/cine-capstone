import React from 'react';
import Image from 'next/image';
import logo from './public/assets/logo.png'; 

function Onboarding() {
  return (
    <div className="bg-gradient-to-br from-amber-800 via-violet-900 to-slate-800 min-h-screen flex items-center justify-center flex-column">
        <div className='justify-center text-center'>
            <Image src={logo} alt="Company Logo" className="max-w-60 h-auto" layout="responsive"/>
            <h1 className="text-3xl mt-4 text-stone-300">cine</h1>
        </div>
      
    </div>
  );
}

export default Onboarding;
