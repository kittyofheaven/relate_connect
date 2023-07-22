"use client"

import React, { useState } from 'react'
import { signIn, signOut, useSession } from "next-auth/react";
import { BiLogoGoogle } from 'react-icons/bi'
import { PiGithubLogoBold } from 'react-icons/pi'
import { BsPersonFillAdd } from 'react-icons/bs'
import { GoSignOut } from 'react-icons/go'
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
import Link from 'next/link'

export default function page() {

    const { data: session } = useSession()
    const [userUniqueId, setUserUniqueId] = useState('')
    const [partnerUniqueId, setPartnerUniqueId] = useState('')
    const [categories, setCategories] = useState('')

    const [profpic, setProfpic] = useState('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png')

    if (session && session.user) {

        async function getPartnerUniqueId(id) {
            const user_1 = doc(db, `users/${id}`)
            const user_1_data = await getDoc(user_1)
            setPartnerUniqueId(user_1_data.data().partner)
            return (partnerUniqueId)
            // console.log(user_1) //bakal return promise doang, bukan data nya
        }

        async function getCategories(id) {
            const user_1 = doc(db, `users/${id}`)
            const user_1_data = await getDoc(user_1)
            setCategories(user_1_data.data().categories)
            return (categories)
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

        async function profPicsFunc() {

            const email = session.user.email

            const user_ref = collection(db, 'users') //collection buat ngambil collection dari firestore
            const q = query(user_ref, where('email', '==', email), limit(1))
            const querySnapshot = await getDocs(q) //getDocs buat ngambil data dari query
            // return user image link
            const userImageLink = await querySnapshot.docs[0].data().image //docs buat ngambil data dari querySnapshot

            setProfpic(userImageLink)
        }

        userUniqueIdFunc()
        profPicsFunc()





        return (

            //* PROFILE PAGE START

            <div className='bg-white rounded-lg flex min-h-screen max-w-4xl flex-col items-center p-24 mx-auto mb-8'>

                <img src={profpic} height={200} width={200} className='rounded-full m-8'/>

                <h3 className='mb-4'>Hello There! {session.user.name}</h3>
                <button
                    onClick={() => signOut()}
                    className='bg-pink-300 text-pink-700  px-4 py-4 rounded-full m-2 flex transition-all hover:bg-gray-400'>
                    <GoSignOut size={25} className='my-auto mr-2' />
                    Sign out as {session.user.name}
                </button>

                <p>{partnerUniqueId ? (<p>Partner id : {partnerUniqueId} </p>) : (
                    <Link className='gap-3  bg-pink-300 text-pink-700  px-7 py-4 rounded-full m-2 flex transition-all hover:bg-gray-400' href='/partner'><BsPersonFillAdd size={25}></BsPersonFillAdd> Set your partner</Link>
                )}</p>
                <div className='items-center text-center mt-44'>
                    <p>Categories : {categories}</p>
                    <p>Unique id : {userUniqueId}</p>
                </div>
            </div>

            //* PROFILE PAGE END
        )
    }

    return (

        //* SIGNIN PAGE START

        <div className='flex min-h-screen max-w-4xl flex-col items-center p-24 mx-auto'>
            <h3 className='mb-4'>You're not logged in</h3>
            <button
                onClick={() => signIn('google', { callbackUrl: 'http://localhost:3000/' })}
                className='dark:bg-white dark:text-black bg-black text-white px-4 py-4 rounded-full m-2 flex transition-all hover:bg-gray-400'>
                <BiLogoGoogle size={25} className='my-auto mr-2' />
                Sign in with Google
            </button>
            <button
                onClick={() => signIn('github', { callbackUrl: 'http://localhost:3000/' })}
                className='dark:bg-white dark:text-black bg-black text-white px-4 py-4 rounded-full m-2 flex transition-all hover:bg-gray-400'>
                <PiGithubLogoBold size={25} className='my-auto mr-2' />
                Sign in with Github
            </button>
        </div>

        //* SIGIN PAGE END
    )
}
