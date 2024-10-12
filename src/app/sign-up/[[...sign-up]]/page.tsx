import { SignUp } from '@clerk/nextjs'
import React from 'react'

export default function SignUpPage(){
    return(
        <div className='bg-black flex min-h-screen justify-center items-center'>
            <SignUp/>
        </div>
    )
};