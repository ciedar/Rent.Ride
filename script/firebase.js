import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { deleteUser, signOut, onAuthStateChanged, getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, updatePassword } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";
import { deleteField, deleteDoc, getFirestore, getDocs, getDoc, collection, addDoc, doc, where, query, updateDoc } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";
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
export const deleteDataField = deleteField();

// displaying currentUser data from database
export const getCurrentUser = async (userId) => {
    const ref = doc(db, "users", userId);
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


// Checking if user is currently logged or no
export const checkCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            unsubscribe();
            resolve(user);
        }, reject);
    });
};

// loggin function
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


// register/login with google
export const googleAuth = new GoogleAuthProvider();
export const signPop = () => signInWithPopup(auth, googleAuth);


// showing data collection depends on type like - cars/users
export const showData = async (type) => {
    try {
        const data = await getDocs(collection(db, type));
        return data;
    } catch (error) {
        console.error("Error:", error);
    }
};


// dwonloading img from storage 
export const refURL = async (url) => {
    const link = ref(storage, url);
    return getDownloadURL(link);
};

// creating new user in databse when new user create account
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


// Displaying curren user information from database
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

// allow user to change his password
export const changePassword = async (newPassword) => {
    try {
        const user = auth.currentUser;
        await updatePassword(user, newPassword);
        console.log('Hasło zostało pomyślnie zmienione.');
    } catch (error) {
        console.error('Wystąpił błąd podczas zmiany hasła:', error);
    }
};


// updating user infomration in database

export const updateUserInfo = async (userId, userData) => {
    try {
        const userRef = doc(db, "users", userId)
        await updateDoc(userRef, userData)
        console.log("zaktualizowano");

    } catch (error) {
        console.log('cos poszło nie tak', error.message);
    }
}

// update car information in database
export const updateCarInfo = async (carId, data) => {
    try {
        const carRef = doc(db, "cars", carId)
        await updateDoc(carRef, data)
        console.log("zaktualizowano");

    } catch (error) {
        console.log('cos poszło nie tak', error.message);
    }
}


// allow user to delete his own account
export const deleteAccount = () => {
    const user = auth.currentUser;
    deleteUser(user)
        .then(() => {
            console.log("Konto użytkownika zostało usunięte.");
        })
        .catch((error) => {
            console.error("Błąd podczas usuwania konta użytkownika:", error);
        });
}
/// when user delete his account delete all information in database about him
export const deleteUserDataFromDataBase = (userId) => {
    deleteDoc(doc(db, "users", userId))
        .then(() => {
            console.log(`Dane o użytkowniku nr ${userId} zostały pomyslnie usunięte`)
        }).catch(() => {
            console.log(`Cos poszlo nie tak`);
        })
}


// get car data from database 
export const getData = async (id) => {
    const ref = doc(db, "cars", id);
    const data = await getDoc(ref);
    return data;
}