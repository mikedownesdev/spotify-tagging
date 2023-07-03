import Image from 'next/image'
import { Inter } from 'next/font/google'
import { signOut, useSession } from 'next-auth/react'
import WebPlayback from '../../components/WebPlaypack'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const { data: session, status } = useSession()

  console.log('status', status)
  console.log('session', session)
  
  if (status === 'loading') {
    return (
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div>Loading...</div>
      </main>
    )
  } else if (status === 'unauthenticated') {
    return (
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1>unauthenticated</h1>
      </main>
    )
  } else if (status === 'authenticated') {
    return (
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <button
          className='bg-blue-500 text-white px-4 py-2 rounded-md' 
          onClick={() => signOut()}>
          Log out
        </button>
        <div>Logged in</div>
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
          <WebPlayback token={session?.user?.accessToken}/>
        </div>
      </main>
    )
  }
  
}
