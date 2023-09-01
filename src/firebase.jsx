import { initializeApp } from "firebase/app";
import {
    getFirestore,
    collection,
    getDocs,
} from "firebase/firestore";
import { useState } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyC4f31MUqRVckOcA5bDvCNH6GGdOGB2D0Y",
  authDomain: "torquehours.firebaseapp.com",
  projectId: "torquehours",
  storageBucket: "torquehours.appspot.com",
  messagingSenderId: "484455943281",
  appId: "1:484455943281:web:524d3d8ab2cb24b11f5fd0",
  measurementId: "G-MK938HZZHQ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const getUser = async (users, name) => {
  return users.filter((doc) => doc.name === name)[0];
}

export const getAllUsers = async () => {
  const hoursRef = collection(db, "hours");
  const hoursSnap = await getDocs(hoursRef);
  
  return hoursSnap.docs.map((doc) => doc.data());
}