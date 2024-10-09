import { SignInButton } from '@clerk/nextjs'
import React from 'react'

export default function Onboarding(){
    return(
        <div className='bg-black flex min-h-screen'>
            <div className='text-4xl text-white'>
            onboarding
            <SignInButton></SignInButton>
            

            </div>
           
        </div>
    )
};