"use client"
import React from 'react';
import Image from 'next/image';
import logo from '../public/assets/logo.png'; 
import netflixlogo from '../public/assets/netflix-logo.png';
import letterboxdlogo from '../public/assets/letterboxd-logo.png';
import { useRouter } from 'next/navigation';
import OnNavigator from '../../components/OnNavigator';

function Onboarding() {
    const router = useRouter();

    const handleClick = () => {
        router.push('/sign-up'); 
    };
    

    return (
        <div className="bg-gradient-to-br from-amber-800 via-violet-900 to-slate-800 min-h-screen flex flex-col items-center justify-center gap-40 max-w-screen">
            <div className='m-32 flex flex-col items-center justify-center gap-40'>
                <header className='w-full'><OnNavigator/></header>
                <div className="text-center flex flex-col items-center">
                    <Image src={logo} alt="Company Logo" className="max-w-60 h-auto" layout="responsive" />
                    <h1 className="text-8xl mt-4 animate-float">cine</h1>
                    <h2 className="text-2xl mt-4 animate-float">View your watch histories and more</h2>
                    <button onClick={handleClick} className='text-stone-300'>Take me to the past</button>
                </div>

                <div className="text-center flex flex-col items-center">
                    <h2 className='text-4xl'>Your watch history <span className='font-departure animate-float'>VISUALIZED</span></h2>
                    <div className='flex flex-row justify-center m-10 gap-4'>
                        <Image src={netflixlogo} alt="Netflix Logo" className="max-h-32 w-auto" layout="intrinsic" />
                        <Image src={letterboxdlogo} alt="Letterboxd Logo" className="max-h-32 w-auto" layout='intrinsic' />
                    </div>
                    <div className='flex flex-row flex-wrap justify-center m-10 gap-8'>
                        <img src='https://image-placeholder.com/images/actual-size/416x352.png' alt="Placeholder" className='max-h-60 rounded-xl transition-transform duration-200 hover:scale-110' />
                        <img src='https://image-placeholder.com/images/actual-size/416x352.png' alt="Placeholder" className='max-h-60 rounded-xl transition-transform duration-200 hover:scale-110' />
                        <img src='https://image-placeholder.com/images/actual-size/416x352.png' alt="Placeholder" className='max-h-60 rounded-xl transition-transform duration-200 hover:scale-110' />
                    </div>
                </div>

                <div className="text-center flex flex-col items-center">
                    <h2 className='text-4xl'>You choose how to view your history</h2>
                    <div className='flex flex-row flex-wrap justify-center p-20 gap-12'>
                        <img src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftottministries.org%2Fwordpress%2Fwp-content%2Fuploads%2F2016%2F05%2Fblack-placeholder-768x432.jpg&f=1&nofb=1&ipt=347db2b95d41bb45275462585d6943f81de5e91926e8b2b8ca0f5d34a1503041&ipo=images' alt="Placeholder" className='min-w-60 h-48 rounded-xl transition-transform duration-200 hover:scale-110 shadow-violet-700 shadow-xl blur-lg' />
                        <img src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftottministries.org%2Fwordpress%2Fwp-content%2Fuploads%2F2016%2F05%2Fblack-placeholder-768x432.jpg&f=1&nofb=1&ipt=347db2b95d41bb45275462585d6943f81de5e91926e8b2b8ca0f5d34a1503041&ipo=images' alt="Placeholder" className='min-w-60 h-48 rounded-xl transition-transform duration-200 hover:scale-110 shadow-violet-700 shadow-xl blur-lg' />
                    </div>
                </div>

                <div className="text-center flex flex-col items-center">
                    <h2 className='text-4xl mb-5'>Don&apos;t miss out</h2>
                    <h2 className='text-5xl font-departure'>Create a profile now</h2>
                    <button className='m-20' onClick={handleClick}>Get Started</button>
                </div>

                <footer><p className='text-stone-300'>2024 Cine. All Rights Reserved.</p></footer>
            </div>
        </div>

    );
}

export default Onboarding;
