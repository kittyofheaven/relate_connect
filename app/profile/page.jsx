"use client"

import React, {useState} from 'react'
import { signIn, signOut, useSession } from "next-auth/react";
import { BiLogoGoogle } from 'react-icons/bi'
import { PiGithubLogoBold } from 'react-icons/pi'
import {GoSignOut} from 'react-icons/go'
import db from '../../utils/dbconfig'
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
                    
export default  function page() {

    const {data : session} = useSession()
    const [userUniqueId, setUserUniqueId] = useState('')
    
    if(session && session.user){


        async function userUniqueIdFunc() {
            
            const email = session.user.email
    
            const user_ref = collection(db, 'users') //collection buat ngambil collection dari firestore
            const q = query(user_ref, where('email', '==', email), limit(1))
            const querySnapshot = await getDocs(q) //getDocs buat ngambil data dari query
            const user_id = querySnapshot.docs[0].id //docs buat ngambil data dari querySnapshot

            console.log(user_id)

            setUserUniqueId(user_id)

        }

        userUniqueIdFunc()
        


        return (

            //* PROFILE PAGE START

            <div className='flex min-h-screen max-w-4xl flex-col items-center p-24 mx-auto'>
                <h3 className='mb-4'>Hello There! {session.user.name}</h3>
                <button 
                    onClick={() => signOut()}
                    className='dark:bg-white dark:text-black bg-black text-white px-4 py-4 rounded-full m-2 flex transition-all hover:bg-gray-400'>
                    <GoSignOut size={25} className='my-auto mr-2'/>
                    Sign out as {session.user.name}
                </button>
                <p>Unique id : {userUniqueId}</p>
            </div>

            //* PROFILE PAGE END
        )
    }

    return (

        //* SIGNIN PAGE START

        <div className='flex min-h-screen max-w-4xl flex-col items-center p-24 mx-auto'>
            <h3 className='mb-4'>You're not logged in</h3>
            <button 
                onClick={() => signIn('google', {callbackUrl: 'http://localhost:3000/'})}
                className='dark:bg-white dark:text-black bg-black text-white px-4 py-4 rounded-full m-2 flex transition-all hover:bg-gray-400'>
                <BiLogoGoogle size={25} className='my-auto mr-2'/>
                Sign in with Google
            </button>
            <button 
                onClick={() => signIn('github', {callbackUrl: 'http://localhost:3000/'})}
                className='dark:bg-white dark:text-black bg-black text-white px-4 py-4 rounded-full m-2 flex transition-all hover:bg-gray-400'>
                <PiGithubLogoBold size={25} className='my-auto mr-2'/>
                Sign in with Github
            </button>
        </div>

        //* SIGIN PAGE END
)
}
