import { UserButton } from '@clerk/nextjs'
import React from 'react'
import CSVUploader from './upload/csvUploader'
import ChatBot from '../../components/chatBot'
import SearchBar from '../../components/searchBar'
import { useAuth } from '@clerk/nextjs'

export default function Home(){

    return(
        <div className='container mx-auto'>

            <UserButton/>
            <SearchBar/>
            <CSVUploader/>
            <ChatBot/>
        </div>
    )
};