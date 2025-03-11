import { getFirestore } from "firebase-admin/firestore"
import "server-only"

export const getData = async () => {
    const firestore = getFirestore();
    const snapshot = await firestore.collection('promoPages').get();
    const documents = snapshot.docs.map(doc => doc.data());
    
    return documents[0];
};

export const getLogo = async () => {
    const firestore = getFirestore();
    const snapshot = await firestore.collection('promoPages').doc('logo').get();
    const logos = snapshot.data() 
    
    return logos;
}