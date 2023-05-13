
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
// console.log(doc(`msoNTvV67HSjjDPo0XpjKoVKpG02`))
// export const user = onAuthStateChanged(auth, (user) => {
//     if (user) {
//         console.log(user, user.uid)
//         return user;
//     } else {
//         console.log("error")
//     };
// })

// onAuthStateChanged(auth, (user) => {
//     currentUser = user;
//     console.log(currentUser)
// })
// export const getCurrentUser = async (userId) => {
//     const ref = db.collection("users").doc(userId);
//     console.log(ref);
//     ref.then((doc) => {
//         if (doc.exsists) {
//             console.log(doc.data())
//         } else {
//             console.log(`Nie ma`);
//         }
//     }).catch((error) => {
//         console.error(error)
//     })
// }

// const klak = await getCurrentUser(`msoNTvV67HSjjDPo0XpjKoVKpG02`);
// console.log(klak)
export const loginAccount = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        userId = user.uid;
        console.log(userId)
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

export const createUserData = async (data, info) => {
    const userData = collection(db, `users`);
    console.log(userData);
    await addDoc(userData, {
        id: data.uid,
        email: data.email,
        username: info
    })
}


// po id
// const lolo = doc(db, "users", "msoNTvV67HSjjDPo0XpjKoVKpG02");

// getDoc(lolo).then((info) => {
//     if (info.exists()) {
//         console.log(info.data())
//     } else {
//         console.log('nope');
//     }
// }).catch((error) => {
//     console.log(error)
// })
const col = collection(db, "users");
const q = query(col, where("id", "==", "msoNTvV67HSjjDPo0XpjKoVKpG02"));

const result = await getDocs(q);

result.forEach((a) => { console.log(a.data()) })
