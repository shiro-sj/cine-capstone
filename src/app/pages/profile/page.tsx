"use client"
import React, { useState } from 'react'
import CSVUpload from '../upload/page';
import WatchTime from '../watchTime/page';

function page() {
  const [uploaded, setUploaded] = useState(false);
  return (
    <div className="bg-gradient-to-br from-dark-purple to-slate-800 min-h-screen flex flex-col items-center justify-center gap-8">
      <div className="flex flex-col items-center justify-center h-96">
        <CSVUpload/>
      </div>
      <div className="flex flex-col items-center justify-center h-96">
      </div>
    </div>
  )
}

export default page;