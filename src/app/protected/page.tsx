import React from 'react'
import WatchHistory from '@/app/components/watchHistory'
import NavBar from '@/app/components/navbar'
import SearchBar from '@/app/components/searchBar'

export default function Home(){

    return(
        <div className=''>
            <NavBar/>
            <SearchBar/>
            <WatchHistory/>
        </div>
    )
};