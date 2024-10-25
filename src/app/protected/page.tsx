import { UserButton } from '@clerk/nextjs'
import React from 'react'
import CSVUploader from '../components/csvUploader'
import WatchHistory from '@/app/components/watchHistory'
import NavBar from '@/app/components/navbar'

export default function Home(){
    return(
        <div className=''>
            <NavBar/>
        </div>
    )
};