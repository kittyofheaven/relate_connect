'use client'
import React, { useState } from 'react'

import db from '../../utils/dbconfig'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
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
import { useRouter } from 'next/navigation'




export default function page() {

    const router = useRouter()

    const { data: session } = useSession({
        required: true,
        onUnauthenticated: () => {
            redirect('/profile')
        }
    })

    const [userExist, setUserExist] = useState(false)
    const [partnerUniqueId, setPartnerUniqueId] = useState('')

    if (session && session.user) {

        async function getUserExist(id) {
            const user_1 = doc(db, `users/${id}`)
            const user_1_data = await getDoc(user_1)
            setUserExist(user_1_data.exists())
            return (userExist)
            // console.log(user_1) //bakal return promise doang, bukan data nya
        }


        const search = (e) => {
            e.preventDefault()
            setPartnerUniqueId(e.target[0].value)

            if (e.target[0].value.replace(/\s/g, '') === '') {

            } else {
                getUserExist(e.target[0].value.replace(/\s/g, ''))

            }
        }

        async function addPartnerToDatabase(partner) {

            const email = session.user.email

            const user_ref = collection(db, 'users') //collection buat ngambil collection dari firestore
            const q = query(user_ref, where('email', '==', email), limit(1))
            const querySnapshot = await getDocs(q) //getDocs buat ngambil data dari query
            const user_id = querySnapshot.docs[0].id //docs buat ngambil data dari querySnapshot

            const user_reference = doc(db, `users/${user_id}`)
            await updateDoc(user_reference, { partner: partner })

            // console.log(docRef)

            // const res = await docRef.set({
            //     categories : result
            // }, { merge: true });

            router.push('/profile')

        }


        return (
            <div>
                <h1 className='text-4xl text-center font-bold mt-28'>Add your partner to start!</h1>
                <p>{userExist ? ('User Found!') : ('')}</p>

                <form onSubmit={search}>
                    <div className='w-fit mt-10 mx-auto'>
                        <input type="text" placeholder='Partner Unique ID' className=' font-medium border border-b-4 border-r-4  rounded-full shadow-lg hover:shadow-sm p-4'></input>
                        <button className=' border-pink-700 border-b-4 border-r-4 text-center bg-pink-300 text-pink-700 rounded-full font-semibold mt-4 hover:bg-pink-500 focus:scale-95 transition-all duration-200  ml-4 p-4'>Search Profile</button>
                    </div>
                    {userExist ? (
                        <button onClick={() => addPartnerToDatabase(partnerUniqueId)}>Add as your partner</button>
                    ) : (
                        <></>
                    )}

                </form>

            </div>
        )


    }

}
