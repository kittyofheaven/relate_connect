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

import { quiz } from './data'
import { useRouter } from 'next/navigation'


export default function page({ params }) {

    const router = useRouter()

    const { data: session } = useSession({
        required: true,
        onUnauthenticated: () => {
            redirect('/profile')
        }
    })



    const [activeQuestion, setActiveQuestion] = useState(0)
    const [selectedAnswer, setSelectedAnswer] = useState('')
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null)
    const [showResult, setShowResult] = useState(false)
    const [checked, setChecked] = useState(false)

    const [result, setResult] = useState({
        romanticizerScore: 0,
        maximizerScore: 0,
        hesitaterScore: 0
    })

    const { questions } = quiz
    const { question, answers } = questions[activeQuestion]



    // console.log(quiz)
    // console.log(answers)


    // if params.id is not in question array, redirect to 404

    const romanticizer = [0, 3, 6, 9, 12, 15]
    const maximizer = [1, 4, 7, 10, 13, 16]
    const hesitater = [2, 5, 8, 11, 14, 17]



    if (session && session.user) {

        function onAnswerSelected(answer, index) {

            setChecked(true)

            const score = index + 1
            // console.log(score)

            if (romanticizer.includes(activeQuestion)) {

                setResult({ ...result, romanticizerScore: result.romanticizerScore + score })

            } else if (maximizer.includes(activeQuestion)) {

                setResult({ ...result, maximizerScore: result.maximizerScore + score })

            } else if (hesitater.includes(activeQuestion)) {

                setResult({ ...result, hesitaterScore: result.hesitaterScore + score })

            }

            if (activeQuestion === questions.length - 1) {

            } else {
                setActiveQuestion(activeQuestion + 1)
            }

        }

        async function addResultToDatabase(result) {

            const email = session.user.email

            const user_ref = collection(db, 'users') //collection buat ngambil collection dari firestore
            const q = query(user_ref, where('email', '==', email), limit(1))
            const querySnapshot = await getDocs(q) //getDocs buat ngambil data dari query
            const user_id = querySnapshot.docs[0].id //docs buat ngambil data dari querySnapshot

            const user_reference = doc(db, `users/${user_id}`)
            await updateDoc(user_reference, { categories: result })

            // console.log(docRef)

            // const res = await docRef.set({
            //     categories : result
            // }, { merge: true });

        }

        function upResult() {

            const resultArray = [result.romanticizerScore, result.maximizerScore, result.hesitaterScore]
            const maxResult = resultArray.indexOf(Math.max(...resultArray))

            let fixResult

            if (maxResult === 0) {
                fixResult = 'romanticizer'
            }
            else if (maxResult === 1) {
                fixResult = 'maximizer'
            }
            else if (maxResult === 2) {
                fixResult = 'hesitater'
            }


            //! add to database
            console.log(fixResult)
            addResultToDatabase(fixResult)

            router.push('/')



        }



        return (
            <div>
                <div className='justify-center text-4xl text-center mt-10'>{activeQuestion + 1}/{questions.length}</div>
                <div className='bg-white rounded-lg py-4 border-b-4 border-r-4 justify-center text-4xl text-center mt-10 mx-5'>{questions[activeQuestion].question}</div>
                <div className=' text-center items-center justify-between mt-4'>

                    {answers.map((answer, index) => {
                        return (
                            <button
                                key={index}
                                onClick={() => onAnswerSelected(answer, index)}
                                className='mx-4 mt-10 border-black border-b-4 border-r-4 h-20 w-30 px-7  text-center bg-pink-300 text-pink-700 py-2 rounded-lg font-semibold hover:bg-pink-500 focus:scale-95 transition-all duration-200 ease-out'>{answer}</button>
                        )
                    })}
                </div>

                <div className='mt-28 items-center text-center italic'>Don't worry about choosing the wrong option, you can retake the quiz later!
                </div>

                {activeQuestion === questions.length - 1 ? (
                    <div className='flex items-center justify-center'>
                        <button className='mx-4 mt-10 border-black border-b-4 border-r-4 h-20 w-30 px-10  text-center bg-green-300 text-green-700 py-2 rounded-lg font-semibold hover:bg-green-500 focus:scale-95 transition-all duration-200 ease-out' onClick={() => upResult()}>Finish</button>
                    </div>

                ) : (<></>)}

            </div>
        )
    }


}
