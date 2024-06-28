'use client' 
 
import { internalUrls } from '@/config/site-config'
import { Button } from '@nextui-org/react'
import Link from 'next/link'
import { useEffect } from 'react'
 
export default function GlobalError({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (     
    <main className="flex flex-col gap-4 mx-auto my-24 text-center font-bold text-sm p-3">
      <h3 className='font-mono text-current'>Something went wrong!</h3>
      <div className=''>
        <Button href={internalUrls.home} as={Link} color="primary" variant="shadow">
          Refresh the page
        </Button>
      </div>
    </main>
  )
}