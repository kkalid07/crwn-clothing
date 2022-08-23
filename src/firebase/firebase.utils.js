import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';


const config = {
    apiKey: "AIzaSyBzPz6u8aQ-Dij1Fz9haWnaxvbqM5-w9Ho",
    authDomain: "crwn-db-40bf4.firebaseapp.com",
    projectId: "crwn-db-40bf4",
    storageBucket: "crwn-db-40bf4.appspot.com",
    messagingSenderId: "434891305920",
    appId: "1:434891305920:web:1ff50c143bfb6123068e25",
    measurementId: "G-1M8RXCP0VJ"
  };

  export const createUserProfilDocument = async(userAuth, additionalData) =>{
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapshot = await userRef.get();

    if(!snapshot.exists){
      const { displayName , email} = userAuth;
      const createdAt = new Date();

      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData 
        })
      }catch (error){
        console.log('error creating user', error.message)
      }
    }


    return userRef;
  }


  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account'});
  export  const signInWithGoogle = () =>auth.signInWithPopup(provider);

  export default firebase;