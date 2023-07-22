'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import db from '../../utils/dbconfig'

import {
    collection,
    query,
    onSnapshot,
    doc,
    orderBy,
    getDocs,
    getDoc,
} from 'firebase/firestore'

import {
    tryFunction, 
    tryFunction2, 
    getUserWithId, 
    getChatWithId, 
    newChat,
    timeConverter
} from '../../utils/dbfunctions'

export default function PublicChat() {

    const {data: session} = useSession({
        required: true,
        onUnauthenticated: () => {
            redirect('/profile')
        }
    })

    //! Chat realtime get system
    //* https://youtu.be/ig91zc-ERSE
    const [chats, setChats] = useState([]) // ini buat get
    const [postChat, setPostChat] = useState('') // ini buat post

    const [username, setUsername] = useState('') 

    
    const sendMsg = (e) => {
        e.preventDefault() // biar ga refresh
        // setPostChat(e.target[0].value) // karena input pertama jadi 0, klo kedua ya 1
        newChat(e.target[0].value, session.user.email) //? menurutku email ga mungkin duplicate
        // setPostChat('') // buat reset formnya
    }

    async function getChats() { 

        let chatsCollection = collection(db, 'chats') //collection reference
        let chatsCollectionQuery = query(
            chatsCollection, orderBy('time', 'asc') // ini buat agar mereka chatnya sesuai waktu soalnya idnya itu random jadi ga urut
        ) //query reference 
        const querySnapshot = await getDocs(chatsCollectionQuery) //query snapshot
        const newList = querySnapshot.docs.map(doc => ({...doc.data(), id: doc.id}))

        // console.log(newList)

        setChats(newList)
        
    }

    async function getUserWithId(user_id){
        const user_ref = doc(db, `users/${user_id}`) //take two statement the first one is the database, and the second one is the path collection/document
        const mySnapshot = await getDoc(user_ref) // snapshot it's like a picture of the data(promises)
        // you can add some if else handling here ex:
        if(mySnapshot.exists()){
            setUsername(mySnapshot.data())
        }
        else{
            return ('No such document')
        }
    }

    useEffect(() => {
        getChats()
    }, [])


    // useEffect(() => {  
    //     const unsubscribe = onSnapshot(chatsCollectionQuery, querySnapshot => { //take two statement the first one is the document reference, and the second one is the callback function
            
    //         setChats(querySnapshot.docs.map(doc => ({...doc.data(), id: doc.id})))//* jadi kita pake ({...doc.data(), id: doc.id}) biar dia ga map doc.data() doang tapi idnya juga ke map karena kita butuh itu // map itu tyt return array baru jadi mending pake ini daripada si forEach
    //         // querySnapshot.forEach(snap => setChats(snap.data())) //? aku gatau kenapa tapi klo pake yang ini dia bakal nge set chats nya cuma 1 data doang, jadi klo ada data baru dia bakal nge set chats nya jadi 1 data doang
    //         // console.log(querySnapshot.docs.map(doc => doc.id()))
    //     })
    //     return unsubscribe // defaultnya tinggal diginiin biar dia unsub otomatis dan ga bebanin sistem
    // }, []) // empty array nandain klo kita mau komponen ini di run once doang pas ke mount


    return (
        <div>
            <h1 className='text-4xl text-center'>Journal</h1>

            <div className='mx-10'>

                {/* {console.log(chats)} */}

                {chats.map(item => {
                    return (
                        <div className='flex' key={doc.id}>  
                            {console.log(item)}
                            <p>Hazel Handrata : {item.chat}</p>
                            <p className='mt-4 ml-2 text-xs text-red-800'>{timeConverter(item.time.seconds)[3]}:{timeConverter(item.time.seconds)[4]}</p>
                        </div>
                    )
                })}


            </div>

            <form onSubmit={sendMsg} className='flex justify-center mt-10 mx-10'>
                <input className='w-3/4 p-2 border border-gray-300 rounded-md dark:text-black' type='text' placeholder='Type your message here' />
                <button className='w-1/4 p-2 ml-2 text-white bg-gray-500 rounded-md'>Send</button>
            </form>
            
        </div>
    )
}
