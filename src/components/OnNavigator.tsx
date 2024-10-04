import Link from 'next/link';
import React from 'react';

const OnNavigator = () => {
    return (
        <nav className="flex justify-between items-center h-16 p-10 bg-transparent border-none rounded-xl">
            <div className="text-stone-300 text-3xl font-bold font-departure">
                cine 
            </div>
            <div className="flex gap-8 items-center">
                <Link href='/Tutorial'>
                    <h3 className="text-lg text-stone-400 hover:text-violet-300 transition duration-300 cursor-pointer">Tutorial</h3>
                </Link>
                <Link href='/sign-in'>
                    <h3 className="text-lg text-stone-400 hover:text-violet-300 transition duration-300 cursor-pointer">Login</h3>
                </Link>
                <Link href='/sign-up'>
                    <h3 className='p-3 text-lg rounded-lg bg-violet-800 hover:bg-violet-700 transition duration-300 cursor-pointer'>Create A Profile</h3>
                </Link>
            </div>
        </nav>
    );
};

export default OnNavigator;
