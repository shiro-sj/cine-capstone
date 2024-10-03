import React from 'react';
import Image from 'next/image';
import logo from './public/assets/logo.png'; 
import netflixlogo from './public/assets/netflix-logo.png';
import letterboxdlogo from './public/assets/letterboxd-logo.png';
import { useRouter } from 'next/navigation';

function Onboarding() {
    const router = useRouter();

  const handleClick = () => {
    router.push('/sign-up'); 
  };
  return (
    <div className="bg-gradient-to-br from-amber-800 via-violet-900 to-slate-800 min-h-screen flex flex-col items-center justify-center gap-40">

        <div className="text-center flex flex-col items-center">
        <Image src={logo} alt="Company Logo" className="max-w-60 h-auto" layout="responsive" />
        <h1 className="text-8xl mt-4 animate-float">cine</h1>
        <h2 className="text-2xl mt-4 animate-float">View your watch histories and more</h2>
        <button onClick={handleClick} className='text-stone-300'>Take me to the past</button>
        </div>

        <div className="text-center flex flex-col items-center">
            <h2 className='text-2xl'>Your watch history <span className='font-departure animate-float'>VISUALIZED</span></h2>
            <div className='flex flex-row m-10'>
                <Image src={netflixlogo} alt="Netflix Logo" className="max-h-32" layout="responsive" />
                <Image src={letterboxdlogo} alt="Letterboxd Logo" className="max-h-32" layout="responsive" />
            </div>

        </div>
    </div>


      
  );
}

export default Onboarding;
