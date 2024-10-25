import { UserButton,useUser } from '@clerk/nextjs'
import React from 'react'
import CSVUploader from '../components/csvUploader'
import WatchHistory from '@/app/components/watchHistory'
import NavBar from '@/app/components/navbar'
import ChatBot from '../../components/chatBot'
import SearchBar from '../../components/searchBar'


export default function Home(){

    const {user} = useUser();

    return(
        <div className=''>
            <NavBar/>
            <a href= {`/profile/${user?.username}`}>profile</a>
            <SearchBar/>
            <ChatBot/>
        </div>
    )
};