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
      <div className=' flex min-h-screen min-w-full container items-center justify-between -mt-14'>
        {/* //GRID START */}
        <div className=' grid grid-cols-4 gap-9 '>

          {/* //CARD 2 */}
          <div className='bg-white rounded-xl shadow-lg'>
            <div className='p-5 flex flex-col'>
              <div className='rounded-xl overflow-hidden  border-b-4 border-r-4 border-black'>
                <img src='https://www.boredpanda.com/blog/wp-content/uploads/2022/02/103-620262024d41d__700.jpg' alt='' />
              </div>
              <h5 className='text-2xl font-medium mt-3 '>AI Text Rater</h5>
              <p className='text-lg mt-3'>Practice with an AI on how you should text
                your partner, the AI will then rate your responses and in that way, you will be able to know how you should and shouldn't  text your partner. </p>
              <a href='#' className='border-b-4 border-r-4 text-center bg-pink-300 text-pink-700 py-2 rounded-lg font-semibold mt-4 hover:bg-pink-500 focus:scale-95 transition-all duration-200 ease-out'>Explore</a>
            </div>
          </div>

          {/* //CARD 1 */}
          <div className='bg-white rounded-xl shadow-lg'>
            <div className='p-5 flex flex-col'>
              <div className='rounded-xl overflow-hidden border-black border-b-4 border-r-4'>
                <img src='https://commit30.com/cdn/shop/products/WeeklyDayPlannerInside_1280x.jpg?v=1688748909' alt='' />
              </div>
              <h5 className='text-2xl font-medium mt-3 '>Auto Date Planner</h5>
              <p className='text-lg mt-3'>Ask an AI to plan a date for you since you're too busy thinking about everything else! You may be busy but a date is always necessary if you still want a relationship. </p>
              <a href='#' className='border-b-4 border-r-4 text-center bg-pink-300 text-pink-700 py-2 rounded-lg font-semibold mt-4 hover:bg-pink-500 focus:scale-95 transition-all duration-200 ease-out'>Explore</a>
            </div>
          </div>

          {/* //CARD 3 */}
          <div className='bg-white rounded-xl shadow-lg'>
            <div className='p-5 flex flex-col'>
              <div className='rounded-xl overflow-hidden border-black border-b-4 border-r-4'>
                <img src='https://hips.hearstapps.com/hmg-prod/images/img-20200415-110729-1586974804.jpg?crop=0.752xw:1.00xh;0.119xw,0&resize=1200:*' alt='' />
              </div>
              <h5 className='text-2xl font-medium mt-3 '>His/Her Journal</h5>
              <p className='text-lg mt-3'> Sometimes it's hard being honest, but this time it doesn't have to. The journal allows you to write about how your relationship has been going & you could read it again and reflect on it. </p>
              <a href='#' className='border-b-4 border-r-4 text-center bg-pink-300 text-pink-700 py-2 rounded-lg font-semibold mt-4 hover:bg-pink-500 focus:scale-95 transition-all duration-200 ease-out'>Explore</a>
            </div>
          </div>

          {/* //CARD 4 */}
          <div className='bg-white rounded-xl shadow-lg'>
            <div className='p-5 flex flex-col'>
              <div className='rounded-xl overflow-hidden border-black border-b-4 border-r-4'>
                <img src='https://www.hobbycraft.co.uk/on/demandware.static/-/Sites-hobbycraft-uk-master/default/dw4a34cd26/images/Ideas/papercraft/main/ideas_main_how-to-make-a-calendar-scrapbook.jpg' alt='' />
              </div>
              <h5 className='text-2xl font-medium mt-3 '>My Calendar</h5>
              <p className='text-lg mt-3'>Keeping track of dates are mundane, But through the calender it would allow you to keep track of special events with you and your partner. For e.g, Birthdays, Anniversaries, etc. </p>
              <a href='#' className=' border-b-4 border-r-4 text-center bg-pink-300 text-pink-700 py-2 rounded-lg font-semibold mt-4 hover:bg-pink-500 focus:scale-95 transition-all duration-200 ease-out'>Explore</a>
            </div>
          </div>
        </div>
        {/* //GRID END */}
      </div>


      <div className='flex flex-col items-center justify-center'>
        <Link href='/quiz' className=' border-b-4 border-r-4 mb-5 -mt-6 text-center bg-pink-300 text-pink-700 py-2 px-5 rounded-lg font-semibold mt-4 hover:bg-pink-500 focus:scale-95 transition-all duration-200 ease-out'>Retake the tendency Quiz ✨</Link>
      </div>
    </div>



  )
}
