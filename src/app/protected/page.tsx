import { UserButton } from '@clerk/nextjs'
import React from 'react'
import CSVUploader from './upload/csvUploader'
import ChatBot from '../../components/chatBot'
import SearchBar from '../../components/searchBar'
import { useAuth } from '@clerk/nextjs'

export default function Home(){

    const {userId} = useAuth();

    console.log(userId)

    return(
        <div className='container mx-auto'>
            <h1>{userId}</h1>
            <UserButton/>
            <SearchBar/>
            <CSVUploader/>
            <ChatBot/>
        </div>
    )
};