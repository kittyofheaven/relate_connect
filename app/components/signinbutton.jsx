"use client";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { BiPaperPlane, BiUser } from "react-icons/bi";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { useState, useEffect } from "react";

export default function SigninButton() {
    const { data: session } = useSession(); //harus data variabelnya habis itu datanya direname jadi session pake : session


    if (session && session.user) {

        // const email = session.user.email
        // const [imageLink, setImageLink] = useState('')

        // useEffect({



        // },[])  //! where the problem is




        return (


            <div className="ml-auto flex items-center gap-5 mr-4">
                {/* NOTIFICATION BELL START */}
                <div className="bg-green-500 flex flex items-center p4 border-b-4 border-r-4 border-black rounded-md shadow-lg hover:bg-blue-500 ">
                    <MdOutlineNotificationsNone size={35} />
                </div>
                {/* NOTIFICATION BELL END */}

                {/* PROFPIC START */}
                <Link href="/profile" className="flex gap-5 mr-4">
                    <img
                        src="https://pbs.twimg.com/profile_images/1663819132234784770/2A7NJSJg_400x400.jpg"
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
                <div className="bg-green-500 flex items-center p4 border-b-4 border-r-4 border-black rounded-md shadow-lg hover:bg-blue-500 ">
                    <MdOutlineNotificationsNone size={35} />
                </div>
                <div className="bg-pink-500 flex items-center p4 border-b-4 border-r-4 border-black rounded-md shadow-lg hover:bg-blue-500 ">
                    <BiUser size={35} />
                </div>
            </div>
        </Link>
    );
};

