// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyC8791vESIJijViJt_gdfTbvmRAdb7qQ4k",
	authDomain: "sproink-368b5.firebaseapp.com",
	databaseURL: "https://sproink-368b5-default-rtdb.firebaseio.com",
	projectId: "sproink-368b5",
	storageBucket: "sproink-368b5.firebasestorage.app",
	messagingSenderId: "298677475054",
	appId: "1:298677475054:web:a05d17eb3ea6b3e36085ff",
	measurementId: "G-TV48RMK2QB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default database;
