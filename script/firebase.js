
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { deleteUser, signOut, onAuthStateChanged, getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, updatePassword } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";
import { deleteDoc, getFirestore, getDocs, getDoc, collection, addDoc, doc, where, query, updateDoc } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";
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
export let currentUser = auth.currentUser;
export const user = onAuthStateChanged;
export let userId;
export let currentUserData;


// export const logged = () => {
//     onAuthStateChanged(auth, (user) => {
//         if (user) {
//             console.log("zalogowany")
//         } else {
//             console.log("nie")
//         }
//     })
// }
// logged()

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

export const checkCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            unsubscribe();
            resolve(user);
        }, reject);
    });
};

export const loginAccount = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        userId = user.uid;
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

export const createUserData = async (data, info, password) => {
    const userData = collection(db, "users");
    try {
        await addDoc(userData, {
            id: data.uid,
            email: data.email,
            username: info,
            password: password
        });
    } catch (error) {
        console.error(error);
    }
};

// export const getCurrentUserData = async (type, userId) => {
//     const col = collection(db, "users");
//     const data = query(col, where(type, "==", userId));
//     try {
//         const result = await getDocs(data);
//         return result.docs.map((a) => a.data());
//     } catch (error) {
//         console.error(error);
//     }
// };
export const getCurrentUserData = async (type, userId) => {
    const col = collection(db, "users");
    const data = query(col, where(type, "==", userId));
    try {
        const result = await getDocs(data);
        return result.docs.map((doc) => {
            return {
                id: doc.id,
                data: doc.data()
            };
        });
    } catch (error) {
        console.error(error);
    }
};



export const changePassword = async (newPassword) => {
    try {
        const user = auth.currentUser;
        await updatePassword(user, newPassword);
        console.log('Hasło zostało pomyślnie zmienione.');
    } catch (error) {
        console.error('Wystąpił błąd podczas zmiany hasła:', error);
    }
};



export const updateUserInfo = async (userId, userData) => {
    try {
        const userRef = doc(db, "users", userId)
        await updateDoc(userRef, userData)
        console.log("zaktualizowano");

    } catch (error) {
        console.log('cos poszło nie tak', error.message);
    }
}


export const deleteAccount = () => {
    const user = auth.currentUser;
    console.log(user);
    deleteUser(user)
        .then(() => {
            console.log("Konto użytkownika zostało usunięte.");
        })
        .catch((error) => {
            console.error("Błąd podczas usuwania konta użytkownika:", error);
        });
}

export const deleteUserDataFromDataBase = (userId) => {
    // const userRef = doc(db, "users", userId);    
    deleteDoc(doc(db, "users", userId))
        .then(() => {
            console.log(`Dane o użytkowniku nr ${userId} zostały pomyslnie usunięte`)
        }).catch(() => {
            console.log(`Cos poszlo nie tak`);
        })
}