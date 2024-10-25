import { UserButton,useUser } from '@clerk/nextjs'
import React from 'react'
import CSVUploader from './upload/csvUploader'
import ChatBot from '../../components/chatBot'
import SearchBar from '../../components/searchBar'


export default function Home(){

    const {user} = useUser();

    return(
        <div className='container mx-auto'>

            <UserButton/>
            <a href= {`/profile/${user?.username}`}>profile</a>
            <SearchBar/>
            <CSVUploader/>
            <ChatBot/>

        </div>
    )
};