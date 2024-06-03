'use client' 

import Link from 'next/link'
 
 
export default function LandingPageNotFound() {
  return (
    <main className="container mx-auto h-screen flex flex-col items-center py-5">
        <h1 className='font-mono font-bold text-warning-foreground text-center'>Not Found!</h1>
        <p className='text-center'>Could not find requested resource</p>
        
        <button type='button' className=''>
            <Link href="/home" className=''>Return Home</Link>
        </button>
    </main>
  )   
}