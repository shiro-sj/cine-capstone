import React from 'react'
import WatchHistory from '@/app/components/watchHistory'
import NavBar from '@/app/components/navbar'
import SearchBar from '@/app/components/searchBar'
import { UserButton } from '@clerk/nextjs'

export default function Home(){

    return(
        <div className=''>
            <UserButton/>
            <NavBar/>
            <SearchBar/>
            <WatchHistory/>
        </div>
    )
};