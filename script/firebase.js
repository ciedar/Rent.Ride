
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-analytics.js";
const firebaseConfig = {
    apiKey: "AIzaSyAvs_3sSltk2R5qhAhvEsKi7tqW7vHVpS0",
    authDomain: "ren-ridev2.firebaseapp.com",
    projectId: "ren-ridev2",
    storageBucket: "ren-ridev2.appspot.com",
    messagingSenderId: "522676106195",
    appId: "1:522676106195:web:2292cf925de3b586763526",
    measurementId: "G-8PFWT8351W"
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);