import NavBar from '@/components/NavBar';
import React from 'react'
import CSVUpload from '../upload/page';
import WatchTime from '../watchTime/page';

function page() {
  return (
    <div className="bg-gradient-to-br from-dark-purple to-slate-800 min-h-screen flex flex-col items-center justify-center gap-8">
      <div className="flex flex-col items-center justify-center h-96">
        <CSVUpload/>
        <WatchTime/>
      </div>
      <div className="flex flex-col items-center justify-center h-96">
      </div>
    </div>
  )
}

export default page;