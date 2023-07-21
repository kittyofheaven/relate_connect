import Link from 'next/link'

import { getServerSession } from 'next-auth/next'
import { authOptions } from './api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

export default async function Home() {

  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/profile')
  }


  return (
    <div>
      <div className='flex items-center justify-center min-h-screen container'>
        {/* //GRID START */}
        <div className='grid grid-cols-4 gap-8'>
          {/* //CARD */}
          <div className='rounded-xl shadow-lg'>
            <div className='p-5 flex flex-col'>
              <div className='rounded-xl overflow-hidden'>
                <img src='https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80' alt='' />
              </div>
              <h5 className='text-2xl font-medium mt-3 '>Auto Date Planner</h5>
              <p className='text-lg mt-3'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
              <a href='#' className='text-center bg-blue-400 text-blue-800 py-2 rounded-lg font-semibold mt-4 hover:bg-blue-300 focus:scale-95 transition-all duration-200 ease-out'>Explore</a>
            </div>
          </div>
          {/* //CARD 2 */}
          <div className='rounded-xl shadow-lg'>
            <div className='p-5 flex flex-col'>
              <div className='rounded-xl overflow-hidden'>
                <img src='https://media.istockphoto.com/id/500798563/photo/city-skyline-at-sunset-jakarta-indonesia.jpg?s=612x612&w=0&k=20&c=6v7sNMfwW56F5TxfvXH7lEh7nZynm1aRSK3fF0lICjU=' alt='' />
              </div>
              <h5 className='text-2xl font-medium mt-3 '>Auto Date Planner</h5>
              <p className='text-lg mt-3'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
              <a href='#' className='text-center bg-blue-400 text-blue-800 py-2 rounded-lg font-semibold mt-4 hover:bg-blue-300 focus:scale-95 transition-all duration-200 ease-out'>Explore</a>
            </div>
          </div>

          {/* //CARD 3 */}
          <div className='rounded-xl shadow-lg'>
            <div className='p-5 flex flex-col'>
              <div className='rounded-xl overflow-hidden'>
                <img src='https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80' alt='' />
              </div>
              <h5 className='text-2xl font-medium mt-3 '>Auto Date Planner</h5>
              <p className='text-lg mt-3'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
              <a href='#' className='text-center bg-blue-400 text-blue-800 py-2 rounded-lg font-semibold mt-4 hover:bg-blue-300 focus:scale-95 transition-all duration-200 ease-out'>Explore</a>
            </div>
          </div>

          {/* //CARD 4 */}
          <div className='rounded-xl shadow-lg'>
            <div className='p-5 flex flex-col'>
              <div className='rounded-xl overflow-hidden'>
                <img src='https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80' alt='' />
              </div>
              <h5 className='text-2xl font-medium mt-3 '>Auto Date Planner</h5>
              <p className='text-lg mt-3'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
              <a href='#' className='text-center bg-blue-400 text-blue-800 py-2 rounded-lg font-semibold mt-4 hover:bg-blue-300 focus:scale-95 transition-all duration-200 ease-out'>Explore</a>
            </div>
          </div>
        </div>
        {/* //GRID END */}

      </div>


      <Link href='/quiz'>Quiz</Link>
    </div>



  )
}
