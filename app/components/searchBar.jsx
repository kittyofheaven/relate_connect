'use client'
import React from 'react'

export default function SearchBar() {
    return (
        <div className="items-center flex min-w[300px] lg:w-[600px]">
            <input
                placeholder="Say something about how things are going..."
                className=" w-full px-8 py-2 font-medium border border-b-4 border-r-4 border-black rounded-lg shadow-lg hover:shadow-sm"
            ></input>
        </div>
    )
}
