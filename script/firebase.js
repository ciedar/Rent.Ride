
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { signOut, onAuthStateChanged, getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";
import { getFirestore, getDocs, getDoc, collection, addDoc, doc, where, query } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";
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
export const logOut = signOut;
export let currentUser = null;
export const user = onAuthStateChanged;
export let userId;
export let currentUserData;

export const getCurrentUser = async (userId) => {
    const ref = doc(db, "users", userId);
    console.log(ref);
    try {
        const docSnap = await getDoc(ref);
        if (docSnap.exists()) {
            console.log(docSnap.data());
        } else {
            console.log("Nie ma");
        }
    } catch (error) {
        console.error(error);
    }
};

export const loginAccount = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        userId = user.uid;
        console.log(userId);
        console.log("Zalogowano jako:", user);
    } catch (error) {
        console.error("Błąd logowania:", error);
    }
};

export const googleAuth = new GoogleAuthProvider();
export const signPop = () => signInWithPopup(auth, googleAuth);

export const showData = async (type) => {
    try {
        const data = await getDocs(collection(db, type));
        console.log(data);
        return data;
    } catch (error) {
        console.error("Error:", error);
    }
};

export const refURL = async (url) => {
    const link = ref(storage, url);
    return getDownloadURL(link);
};

export const createUserData = async (data, info) => {
    const userData = collection(db, "users");
    try {
        await addDoc(userData, {
            id: data.uid,
            email: data.email,
            username: info,
        });
    } catch (error) {
        console.error(error);
    }
};

export const getCurrentUserData = async (type, userId) => {
    const col = collection(db, "users");
    const data = query(col, where(type, "==", userId));
    try {
        const result = await getDocs(data);
        return result.docs.map((doc) => doc.data());
    } catch (error) {
        console.error(error);
    }
};
