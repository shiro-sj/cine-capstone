import DayGraph from '@/components/DayGraph';
import WatchHistory from '@/components/WatchHistory';
import React from 'react'

function page() {
  return (
    <div className="bg-gradient-to-br from-dark-purple to-slate-800 min-h-screen flex flex-col items-center justify-center gap-40">

      <div className="flex flex-col items-center justify-center h-20">
        <h1>Stats</h1>
      </div>
      <div className="flex flex-col items-center justify-center">
       <WatchHistory/>
      </div>
      <div className="flex flex-col items-center justify-center">
       <DayGraph/>
      </div>
      

    </div>
  )
}

export default page;