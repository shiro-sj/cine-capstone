import { SignUp } from '@clerk/nextjs';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from 'next/link';

export default function Page() {
  return (
    <div className="bg-gradient-to-br from-violet-900 to-slate-800 min-h-screen flex flex-col items-center">
      <div className="flex flex-col items-center justify-center flex-grow m-10 w-full">
      <Breadcrumbs aria-label="breadcrumb" className="text-white mb-6 shadow-transparent bg-none ">
          <Link color="inherit" href="/Onboarding" className="hover:underline">
            Back
          </Link>
          <span className="text-stone-300">Sign Up</span>
        </Breadcrumbs>
        <SignUp />
      </div>
    </div>
  );
}
