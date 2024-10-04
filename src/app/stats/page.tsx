import DayGraph from '@/components/DayGraph';
import WatchHistory from '@/components/WatchHistory';
import WeekDayGraph from '@/components/WeekDayGraph';
import React from 'react';

function page() {
  return (
    <div className="bg-gradient-to-br from-dark-purple to-slate-800 min-h-screen flex flex-col items-center justify-center gap-40">

      <div className="flex flex-col items-center justify-center h-20">
        <h1>Stats</h1>
      </div>

      {/* Watch History */}
      <div className="flex flex-col items-center justify-center">
        <WatchHistory />
      </div>

      {/* Year 2024 Section */}
      <div className="flex flex-col items-center justify-center gap-10">
        <h2 className="text-xl text-white">2024 Stats</h2>

        {/* Day Graph for 2024 */}
        <div className="flex flex-col items-center justify-center">
          <DayGraph year={2024} />
        </div>

        {/* Weekday Graph for 2024 */}
        <div className="flex flex-col items-center justify-center">
          <WeekDayGraph year={2024} />
        </div>
      </div>

      {/* Year 2023 Section */}
      <div className="flex flex-col items-center justify-center gap-10">
        <h2 className="text-xl text-white">2023 Stats</h2>

        {/* Day Graph for 2023 */}
        <div className="flex flex-col items-center justify-center">
          <DayGraph year={2023} />
        </div>

        {/* Weekday Graph for 2023 */}
        <div className="flex flex-col items-center justify-center">
          <WeekDayGraph year={2023} />
        </div>
      </div>

      {/* Year 2023 Section */}
      <div className="flex flex-col items-center justify-center gap-10">
        <h2 className="text-xl text-white">2022 Stats</h2>

        {/* Day Graph for 2023 */}
        <div className="flex flex-col items-center justify-center">
          <DayGraph year={2022} />
        </div>

        {/* Weekday Graph for 2023 */}
        <div className="flex flex-col items-center justify-center">
          <WeekDayGraph year={2022} />
        </div>
      </div>


      {/* Year 2023 Section */}
      <div className="flex flex-col items-center justify-center gap-10">
        <h2 className="text-xl text-white">2020 Stats</h2>

        {/* Day Graph for 2023 */}
        <div className="flex flex-col items-center justify-center">
          <DayGraph year={2020} />
        </div>

        {/* Weekday Graph for 2023 */}
        <div className="flex flex-col items-center justify-center">
          <WeekDayGraph year={2020} />
        </div>
      </div>
      
      
    </div>
  );
}

export default page;
