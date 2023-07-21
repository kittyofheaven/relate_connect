"use client";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

const SigninButton = () => {

    const { data: session } = useSession(); //harus data variabelnya habis itu datanya direname jadi session pake : session

    if (session && session.user) {
        return (
        <div className="flex gap-4 ml-auto">
            <Link href="/profile" className="">{session.user.name}</Link>
            {/* <button onClick={() => signOut()} className="dark:text-white">
            Sign Out
            </button> */}
        </div>
        );
    }
    return (
        <Link href="/profile" className="ml-auto">
        Sign In
        </Link>
    );
};

export default SigninButton;