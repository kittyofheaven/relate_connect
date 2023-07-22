'use client'

import React, {useState} from 'react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { useSession } from 'next-auth/react'

import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  or,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where
} from 'firebase/firestore'

import db from '../utils/dbconfig'

import { tipsData } from './tipsData'

export default function Home() {

  const {data: session} = useSession({
    required: true,
    onUnauthenticated: () => {
        redirect('/profile')
      }
  })

  const [userUniqueId, setUserUniqueId] = useState('')
  const [partnerUniqueId, setPartnerUniqueId] = useState('')
  const [categories, setCategories] = useState('')


  
  
  if(session && session.user){

    async function getPartnerUniqueId(id){
      const user_1 = doc(db, `users/${id}`)
      const user_1_data = await getDoc(user_1)
      setPartnerUniqueId(user_1_data.data().partner)
      return(partnerUniqueId)
      // console.log(user_1) //bakal return promise doang, bukan data nya
    }
  
    async function getCategories(id){
        const user_1 = doc(db, `users/${id}`)
        const user_1_data = await getDoc(user_1)
        setCategories(user_1_data.data().categories)
        return(categories)
    }
  
    async function userUniqueIdFunc() {
        
        const email = session.user.email
  
        const user_ref = collection(db, 'users') //collection buat ngambil collection dari firestore
        const q = query(user_ref, where('email', '==', email), limit(1))
        const querySnapshot = await getDocs(q) //getDocs buat ngambil data dari query
        const user_id = querySnapshot.docs[0].id //docs buat ngambil data dari querySnapshot
  
        // console.log(user_id)
  
        getPartnerUniqueId(user_id)
        getCategories(user_id)
        setUserUniqueId(user_id)
  
    }
  
    userUniqueIdFunc()

    return (
  
      <div>
        <div className='text-center'>
          <div className='text-5xl my-5'>
            <h5>Hello There, {session.user.name} !</h5>
          </div>
          <div className='my-4'>
            <p>You are categorized as, </p>
          </div>
        </div>
        {/* //CARD 2 */}
        <div className='bg-white rounded-xl shadow-lg mx-24 mb-8'>
          <div className='p-5 flex flex-col'>
  
            {/* TITLE START */}
            <h5 className='text-2xl font-medium mt-3 border-b-4 border-r-4 text-center bg-pink-300 text-pink-700 py-2 rounded-lg  hover:bg-pink-500 focus:scale-95 transition-all duration-200 ease-out'>The {categories.toUpperCase()}</h5>
            {/* TITLE END */}
  
            {/* DESCRIPTION START */}
            <p className='text-lg mt-3'>
              {categories ? tipsData[categories].description : 'Loading...'}
            </p>

            <ol type='1'>
              {categories ? tipsData[categories].tips.map((tip) => {
                return (
                  <li className='text-lg mt-3'>● {tip}</li>  //! ini ada emot symbol ● barangkali klo lempar error ini kemungkinan bisa jadi penyebab
                )
              }) : 'Loading...'}
            </ol>
            {/* DESCRIPTION END */}

  
          </div>
        </div>
  
  
        <div className=' flex min-h-screen min-w-full container items-center justify-between -mt-14'>
          {/* //GRID START */}
          <div className=' grid grid-cols-4 gap-9 '>
  
            {/* //CARD 2 */}
            <div className='bg-white rounded-xl shadow-lg'>
              <div className='p-5 flex flex-col'>
                <div className='rounded-xl overflow-hidden  border-b-4 border-r-4 border-black'>
                  <img src='https://hips.hearstapps.com/hmg-prod/images/close-up-of-unrecognizable-woman-text-messaging-on-royalty-free-image-1582276818.jpg?crop=0.668xw:1.00xh;0.0442xw,0&resize=1200:*' alt='' />
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

}
