import Link from 'next/link';
import { HomeIcon, UserIcon, ChartBarIcon } from '@heroicons/react/outline';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { checkUser } from '@/lib/checkUser';

export default async function NavBar() {
  const user = await checkUser();
  console.log(user);

  return (
    <div className='justify-center flex'>
    <nav className="fixed top-10 z-50">
          {/* SignedIn Section */}
          <SignedIn>
            <div className="flex items-center justify-between mx-40 p-4 gap-32">
              <Link href='/pages'>
                <HomeIcon className="h-6 w-6 text-stone-400 hover:text-violet-300 hover:scale-125 transition duration-300 cursor-pointer" />
              </Link>
              <Link href='/pages/profile'>
                <UserIcon className="h-6 w-6 text-stone-400 hover:text-violet-300 hover:scale-125 transition duration-300 cursor-pointer" />
              </Link>
              <Link href='/pages/stats'>
                <ChartBarIcon className="h-6 w-6 text-stone-400 hover:text-violet-300 hover:scale-125 transition duration-300 cursor-pointer" />
              </Link>
              <UserButton />
              </div>
          </SignedIn>

          {/* SignedOut Section */}
          <SignedOut>
            <div className="flex-row flex items-center justify-between p-4 mx-20 gap-52">
              <div className="flex text-stone-300 text-3xl font-bold font-departure justify-start">
                cine
              </div>
              <div className="flex gap-8 items-center justify-end">
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
    </nav>
    </div>
  );
}
