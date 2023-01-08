import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyDtDNxPkfBecQyd0jnU6A7O5frV3t8FTMQ",
    authDomain: "gis-task-fb42d.firebaseapp.com",
    projectId: "gis-task-fb42d",
    storageBucket: "gis-task-fb42d.appspot.com",
    messagingSenderId: "70362723385",
    appId: "1:70362723385:web:221ef971f40577ec7549e8",
    measurementId: "G-8JV0N6V6S4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default firebaseConfig

