// Firebase Configuration
// Instructions:
// 1. Go to https://console.firebase.google.com/
// 2. Create a new project (or use existing)
// 3. Click "Add app" and select "Web"
// 4. Copy your Firebase configuration and replace the values below
// 5. Enable Firestore Database in Firebase Console (Build > Firestore Database)

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwGVCKCVb3-eDLb72IfKu8hTwFQXIT0lQ",
  authDomain: "transform-sites-job-tracker.firebaseapp.com",
  projectId: "transform-sites-job-tracker",
  storageBucket: "transform-sites-job-tracker.firebasestorage.app",
  messagingSenderId: "794543463532",
  appId: "1:794543463532:web:d84ca424ad00bb0cf9cc49"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = firebase.firestore();

// Collection references
const notesCollection = db.collection('notes');
const jobsCollection = db.collection('jobs');
const prospectsCollection = db.collection('prospects');
const clientsCollection = db.collection('clients');
const financesCollection = db.collection('finances');

console.log('Firebase initialized successfully');
