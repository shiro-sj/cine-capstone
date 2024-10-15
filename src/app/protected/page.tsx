import NavBar from '@/components/navbar'
import { UserButton } from '@clerk/nextjs'
import React from 'react'

export default function Home(){
    return(
        <div className='container mx-auto'>
            <UserButton/>
        </div>
    )
};