import { SignIn, SignInButton, SignUpButton } from '@clerk/nextjs'
import React from 'react'

export default function Landing(){
    return(
        <div className='bg-black flex min-h-screen'>
            <div className='text-4xl text-white'>
            onboarding
            <SignUpButton/>
            <SignInButton/>
            </div>
           
        </div>
    )
};