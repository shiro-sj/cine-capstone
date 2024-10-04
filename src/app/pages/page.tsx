import React from 'react';
import NavBar from '../components/NavBar';
import { currentUser } from '@clerk/nextjs/server';
import prisma from '../../../lib/prisma';

export default async function Home() {
  const user = await currentUser();
    if(!user){
        return null;
    }

    const loggedInUser = await prisma.user.findUnique({
        where:{ clerkId: user.id, email: user.emailAddresses[0].emailAddress}
    });
    if(!loggedInUser){
      await prisma.user.create({
        data:{
          clerkId: user.id,
          username: user.username || 'No username available.',
          email: user.emailAddresses[0].emailAddress
        }
      })
    }

  return (
    <div className="bg-gradient-to-br from-dark-purple to-slate-800 min-h-screen flex flex-col items-center justify-center gap-40">
      
      <header className='w-full px-60 sticky top-10'>
        <NavBar />
      </header>

      <div className="flex flex-col items-center justify-center h-96">
        <h1>Home</h1>
      </div>
      <div className="flex flex-col items-center justify-center h-96">
        <h1>Home</h1>
      </div>
      <div className="flex flex-col items-center justify-center h-96">
        <h1>Home</h1>
      </div>

    </div>
  );
};
