"use client";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { BiPaperPlane, BiUser } from "react-icons/bi";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { useState, useEffect } from "react";

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

export default function SigninButton() {
    const { data: session } = useSession(); //harus data variabelnya habis itu datanya direname jadi session pake : session
    const [profpic, setProfpic] = useState('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png')



    if (session && session.user) {

        // const email = session.user.email

        // useEffect({



        // },[])  //! where the problem is

        async function profPicsFunc() {

            const email = session.user.email

            const user_ref = collection(db, 'users') //collection buat ngambil collection dari firestore
            const q = query(user_ref, where('email', '==', email), limit(1))
            const querySnapshot = await getDocs(q) //getDocs buat ngambil data dari query
            // return user image link
            const userImageLink = await querySnapshot.docs[0].data().image //docs buat ngambil data dari querySnapshot

            setProfpic(userImageLink)
        }

        profPicsFunc()


        return (


            <div className="ml-auto flex items-center gap-5 mr-4">
                {/* NOTIFICATION BELL START */}
                <div className="bg-slate-100 flex flex items-center p4 border-b-4 border-r-4 border-black rounded-md shadow-lg hover:bg-pink-200 ">
                    <MdOutlineNotificationsNone size={35} />
                </div>
                {/* NOTIFICATION BELL END */}

                {/* PROFPIC START */}
                <Link href="/profile" className="flex gap-5 mr-4">
                    <img
                        src={profpic}
                        className="w-10 h-10 rounded-full border-b-4 border-r-4 border-black"
                    />
                </Link>
                {/* PROFPIC END */}

                {/* <button onClick={() => signOut()} className="dark:text-white">
                Sign Out
                </button> */}
            </div>
        );
    }
    return (
        <Link href="/profile" className="ml-auto flex items-center">
            <div className="flex gap-5 items-center mr-4">
                <div className="bg-slate-100 flex items-center p4 border-b-4 border-r-4 border-black rounded-md shadow-lg hover:bg-pink-200 ">
                    <MdOutlineNotificationsNone size={35} />
                </div>
                <div className="bg-pink-500 flex items-center p4 border-b-4 border-r-4 border-black rounded-md shadow-lg hover:bg-pink-200  ">
                    <BiUser size={35} />
                </div>
            </div>
        </Link>
    );
};

