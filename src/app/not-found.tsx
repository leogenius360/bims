'use client' 

import Link from 'next/link'
import { Button } from '@nextui-org/react'
import { internalUrls } from '@/config/site-config'
 
 
export default function GlobalNotFound() {
  return (
    <main className="h-[80vh] flex flex-col align-middle justify-center gap-3 p-3">
      <h1 className='font-bold text-center'>Not Found!</h1>
      <p className='text-center'>Could not find requested route</p>
      
      <div className='text-center'>
        <Button href={internalUrls.home} as={Link} color="primary" variant="shadow">
          Return Home
        </Button>
      </div>
    </main>
  )
}
