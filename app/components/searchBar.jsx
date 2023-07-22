'use client'
import React from 'react'
import { useRouter } from 'next/navigation'

export default function SearchBar() {

    const router = useRouter()

    function handleClick() {
        router.push('/journal')
    }

    return (
        <div className="items-center flex w-8/12 mx-auto">
            <input onClick={() => handleClick()}
                placeholder="Say something about how things are going..."
                className=" w-full px-8 py-2 font-medium border border-b-4 border-r-4 border-black rounded-lg shadow-lg hover:shadow-sm"
            ></input>
        </div>
    )
}
