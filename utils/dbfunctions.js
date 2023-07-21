import { getServerSession } from 'next-auth/next'
import db  from './dbconfig'
import { 
    addDoc, 
    collection, 
    doc, 
    getDoc, 
    getDocs, 
    limit, 
    onSnapshot, 
    query, 
    setDoc, 
    updateDoc, 
    where 
} from 'firebase/firestore'

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

function serverStamp(){
    return firebase.firestore.Timestamp.now()
}

const tryFunction = () => {
    console.log('tryFunction')
}

function tryFunction2() {
    console.log('tryFunction2')
}

async function getUserWithId(user_id){
    const user_ref = doc(db, `users/${user_id}`) //take two statement the first one is the database, and the second one is the path collection/document
    const mySnapshot = await getDoc(user_ref) // snapshot it's like a picture of the data(promises)
    // console.log(mySnapshot) // this will return a promises
    // console.log(mySnapshot.data()) // this will return the data

    // you can add some if else handling here ex:
    if(mySnapshot.exists()){
        return (mySnapshot.data())
    }
    else{
        return ('No such document')
    }
}



async function getChatWithId(chat_id){
    const user_ref = doc(db, `chats/${chat_id}`) //take two statement the first one is the database, and the second one is the path collection/document
    const mySnapshot = await getDoc(user_ref) // snapshot it's like a picture of the data(promises)
    // you can add some if else handling here ex:
    if(mySnapshot.exists()){
        return (mySnapshot.data())
    }
    else{
        return ('No such document')
    }
}

async function newChat(chat, user_email){

    //* get user_id from users collection with user_email
    const user_ref = collection(db, 'users') //collection buat ngambil collection dari firestore
    const q = query(user_ref, where('email', '==', user_email), limit(1)) //query buat ngambil data dari collection
    const querySnapshot = await getDocs(q) //getDocs buat ngambil data dari query
    const user_id = querySnapshot.docs[0].id //docs buat ngambil data dari querySnapshot

    const chatsCollection = collection(db, 'chats') //collection buat ngambil collection dari firestore
    const newDoc = await addDoc(chatsCollection,  { //addDoc buat nambahin document baru
        time : serverStamp(),
        chat : chat,
        user : user_id
    })

    return (newDoc.path) //buat kasih path nya
}

function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();

    if (min < 10) {
        min = "0" + min;
    }

    var sec = a.getSeconds();

    if (sec < 10) {
        sec = "0" + sec;
    }

    var time = [date, month, year, hour, min, sec] ;
    // console.log(time)
    return time;
}

// function that use users email as input and return users.image
async function getUserImage(email){
    //function that use users email as input and return users.image
    const user_ref = collection(db, 'users') //collection buat ngambil collection dari firestore
    const q = query(user_ref, where('email', '==', email), limit(1)) //query buat ngambil data dari collection
    const querySnapshot = await getDocs(q) //getDocs buat ngambil data dari query
    const user_id = querySnapshot.docs[0].id //docs buat ngambil data dari querySnapshot
    const user_ref2 = doc(db, `users/${user_id}`) //take two statement the first one is the database, and the second one is the path collection/document
    const mySnapshot = await getDoc(user_ref2) // snapshot it's like a picture of the data(promises)
    // console.log(mySnapshot) // this will return a promises
    return (mySnapshot.data().image) // this will return the data


}

export {
    timeConverter,
    tryFunction, 
    tryFunction2, 
    getUserWithId, 
    getChatWithId, 
    newChat,
    getUserImage
}