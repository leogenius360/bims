'use client' 

import Link from 'next/link'
import { Button } from '@nextui-org/react'
 
 
export default function NotFound() {
  return (
    <main className="h-screen flex flex-col align-middle justify-center gap-3 p-3">
      <h1 className='font-bold text-center'>Not Found!</h1>
      <p className='text-center'>Could not find requested resource</p>
      
      <div className='text-center'>
        <Button href="/home" as={Link} color="primary" variant="shadow">
          Return Home
        </Button>
      </div>
    </main>
  )
}
