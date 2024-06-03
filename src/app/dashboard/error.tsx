'use client' 
 
import { useEffect } from 'react'
 
export default function Error({
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
    <main className="container mx-auto flex justify-center align-middle py-5">
      <h2 className='font-mono font-semibold text-warning-foreground'>Something went wrong!</h2>
      <button className='bg-success-50 rounded-md'
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
      Try again
      </button>
    </main>
  )
}