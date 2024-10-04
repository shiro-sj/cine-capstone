import Link from 'next/link';
import { HomeIcon, UserIcon, ChartBarIcon } from '@heroicons/react/outline';
import { UserButton } from '@clerk/nextjs';
import { checkUser } from '@/lib/checkUser';
export default async function NavBar() {
  const user = await checkUser();

  return (
    <nav className="flex justify-between items-center w-full h-16 bg-transparent border-none rounded-xl p-8">
      <div className="flex items-center w-full justify-between p-10">
        <Link href='/pages'>
            <HomeIcon className="h-6 w-6 text-stone-400 hover:text-violet-300 hover:scale-125 transition duration-300 cursor-pointer" />
        </Link>
        <Link href='/pages/profile'>
            <UserIcon className="h-6 w-6 text-stone-400 hover:text-violet-300 hover:scale-125 transition duration-300 cursor-pointer" />
        </Link>
        <Link href='/pages/stats'>
            <ChartBarIcon className="h-6 w-6 text-stone-400 hover:text-violet-300 hover:scale-125 transition duration-300 cursor-pointer" />
        </Link>
        <UserButton></UserButton>

      </div>
    </nav>
  );
};


