import { SignIn, SignInButton, SignUpButton } from '@clerk/nextjs'
import React from 'react'

export default function Landing(){
    return(
        <div>
            <div>
            onboarding
            <SignUpButton/>
            <SignInButton/>
            </div>
           
        </div>
    )
};