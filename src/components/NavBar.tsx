import Link from 'next/link';
import { HomeIcon, UserIcon, ChartBarIcon } from '@heroicons/react/outline';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { checkUser } from '@/lib/checkUser';

export default async function NavBar() {
  const user = await checkUser();

  return (
    <nav className="flex justify-between items-center w-full h-16 bg-transparent border-none rounded-xl px-6 lg:px-60 sticky top-10">
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto px-4">
        
        {/* SignedIn Section */}
        <SignedIn>
          <div className="flex items-center space-x-6">
            <Link href='/pages'>
              <HomeIcon className="h-6 w-6 text-stone-400 hover:text-violet-300 hover:scale-125 transition duration-300 cursor-pointer" />
            </Link>
            <Link href='/pages/profile'>
              <UserIcon className="h-6 w-6 text-stone-400 hover:text-violet-300 hover:scale-125 transition duration-300 cursor-pointer" />
            </Link>
            <Link href='/pages/stats'>
              <ChartBarIcon className="h-6 w-6 text-stone-400 hover:text-violet-300 hover:scale-125 transition duration-300 cursor-pointer" />
            </Link>
          </div>

          <div className="ml-6">
            <UserButton/>
          </div>
        </SignedIn>

        {/* SignedOut Section */}
        <SignedOut>
          <div className="flex items-center space-x-8">
            <div className="text-stone-300 text-3xl font-bold font-departure">
              cine
            </div>
            <div className="flex gap-6 items-center">
              <Link href='/Tutorial'>
                <h3 className="text-lg text-stone-400 hover:text-violet-300 transition duration-300 cursor-pointer">Tutorial</h3>
              </Link>
              <Link href='/sign-in'>
                <h3 className="text-lg text-stone-400 hover:text-violet-300 transition duration-300 cursor-pointer">Login</h3>
              </Link>
              <Link href='/sign-up'>
                <h3 className='px-4 py-2 text-lg rounded-lg bg-violet-800 hover:bg-violet-700 transition duration-300 cursor-pointer'>
                  Create A Profile
                </h3>
              </Link>
            </div>
          </div>
        </SignedOut>
      </div>
    </nav>
  );
}
