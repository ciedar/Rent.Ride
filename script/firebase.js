import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, RecaptchaVerifier } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";
import { getFirestore, getDocs, collection } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";
import { getStorage, ref, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-storage.js";




const firebaseConfig = {
    apiKey: "AIzaSyAvs_3sSltk2R5qhAhvEsKi7tqW7vHVpS0",
    authDomain: "ren-ridev2.firebaseapp.com",
    projectId: "ren-ridev2",
    storageBucket: "ren-ridev2.appspot.com",
    messagingSenderId: "522676106195",
    appId: "1:522676106195:web:2292cf925de3b586763526",
    measurementId: "G-8PFWT8351W"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const createAccount = createUserWithEmailAndPassword;
export const loginAcc = signInWithEmailAndPassword;


export const loginAccount = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log(`Zalogowano jako:`, user)
    } catch (error) {
        console.error(`Błąd logowania:`, error)
    }
}

export const googleAuth = new GoogleAuthProvider();
export const signPop = () => signInWithPopup(auth, googleAuth);

export const showData = async (type) => {
    try {
        const data = await getDocs(collection(db, `${type}`));
        console.log(data)
        return data;
    } catch (error) {
        console.error("Error:", error);
    }
};

export const refURL = async (url) => {
    const link = ref(storage, `${url}`);
    return getDownloadURL(link);
};


