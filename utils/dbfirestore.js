import { initFirestore } from "@auth/firebase-adapter"; //ini cuma bisa di import di server component jadi hati2 ngimportnya kemana
import { cert } from "firebase-admin/app";

export const firestore = initFirestore({
    credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
    }),
});

export default { firestore } // ini juga cuma bisa di server component