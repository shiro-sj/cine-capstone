import { UserButton } from '@clerk/nextjs'
import React from 'react'
import CSVUploader from './upload/csvUploader'
import ChatBot from '../../components/chatBot'

export default function Home(){
    return(
        <div className='container mx-auto'>
            <UserButton/>
            <CSVUploader/>
            <ChatBot/>
        </div>
    )
};