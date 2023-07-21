'use client'
import React from 'react'
import db from '../../../utils/dbconfig'
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

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'


const question_array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]

async function getQuestions() {
    const questions_ref = collection(db, 'quiz')
    const questions_query = query(questions_ref, limit(18), orderBy('number', 'asc'))
    const questions_snapshot = await getDocs(questions_query)
    const questions = questions_snapshot.docs.map(doc => doc.data())
    return questions
}

async function handleAnswerClick(id, answer){
    
}

export default async function page({ params }) {

    const {data: session} = useSession({
        required: true,
        onUnauthenticated: () => {
            redirect('/')
        }
    })

    console.log(session)

    const questions = await getQuestions()
    // console.log(questions)

    // if params.id is not in question array, redirect to 404
    if (!question_array.includes(parseInt(params.id))) {
        return (
            <div className='text-4xl text-center mt-10'>404</div>
        )
    }



    return (
        <div>
            <div className='justify-center text-4xl text-center mt-10'>{questions[params.id - 1].question}</div>
            <div className='text-center items-center justify-between mt-4'>
                <button className='mx-4 border-black border-b-4 border-r-4 bg-green-500 rounded-lg h-20 w-30 px-7'>Very unlike me</button>
                <button className='mx-4 border-black border-b-4 border-r-4 bg-green-500 rounded-lg h-20 w-30 px-7'>Somewhat like me</button>
                <button className='mx-4 border-black border-b-4 border-r-4 bg-green-500 rounded-lg h-20 w-30 px-7'>That's so me</button>
            </div>
        </div>
    )
}
