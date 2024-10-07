import { SignIn } from '@clerk/nextjs'
import { Breadcrumbs } from '@mui/material'
import Link from 'next/link'

export default function Page() {
  return (
    <div className="bg-gradient-to-br from-violet-900 to-slate-800 min-h-screen flex flex-col items-center">
    <div className="flex flex-col items-center justify-center flex-grow m-10 w-full">
    <Breadcrumbs aria-label="breadcrumb" className="p-5 bg-none shadow-none ">
        <Link href="/Onboarding" className="hover:underline">
        <p>Back</p>
        </Link>
        <Link href="/Onboarding" className="hover:underline">
        <p>Sign In</p>
        </Link>
        
      </Breadcrumbs>
      <SignIn />
    </div>
  </div>

  )
}