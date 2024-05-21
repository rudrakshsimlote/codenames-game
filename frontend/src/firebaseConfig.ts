// src/firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAF8caICuUpvkcv5IT2ICIE7J5AX7L3U94",
  authDomain: "codenames-game-e2513.firebaseapp.com",
  databaseURL: "https://codenames-game-e2513-default-rtdb.firebaseio.com/",
  projectId: "codenames-game-e2513",
  storageBucket: "codenames-game-e2513.appspot.com",
  messagingSenderId: "366936624356",
  appId: "1:366936624356:web:859906bf972a0555eaf0f1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the database service
const database = getDatabase(app);

export { database };
