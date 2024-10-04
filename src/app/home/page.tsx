"use client"
import Link from 'next/link';


export default function Home() {

  return (
    <div className="bg-gradient-to-br from-dark-purple to-slate-800 min-h-screen flex items-center justify-center gap-40">
        <div className='text-center justify-center'>
          <h1>Upload to get started</h1>
          <Link href='/profile'><button>Go to Profile</button></Link>
          <a href="https://www.netflix.com/settings/viewing-history"><button>Download CSV</button></a>
        </div>
      </div>
  );
};
