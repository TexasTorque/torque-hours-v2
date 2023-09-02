import { initializeApp } from "firebase/app";
import {
    getFirestore,
    collection,
    getDocs,
    doc,
    setDoc,
    deleteField,
    arrayUnion,
} from "firebase/firestore";

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

export const getUser = (users, name) => {
  return users.filter((doc) => doc.name === name)[0];
}

const getUID = async (name) => {
  const hoursRef = collection(db, "hours");
  const hoursSnap = await getDocs(hoursRef);
  
  return hoursSnap.docs
    .filter((doc) => doc.data().name === name)
    .map((doc) => doc.id)[0];
}

export const getAllUsers = async () => {
  const hoursRef = collection(db, "hours");
  const hoursSnap = await getDocs(hoursRef);
  
  return hoursSnap.docs.map((doc) => doc.data());
}

export const getRank = (users, user) => {
  let rank = 1;
  users.forEach(u => {
    if (u.hours > user.hours) {
      rank++;
    }
  });

  if (rank === 1) return rank + " 👑";
  else if (rank === 2) return rank + " 🥈";
  else if (rank === 3) return rank + " 🥉";
  else if (rank === users.length - 1) return rank + " 😭 ";
  else return rank;
}

export const addHours = async (user, hours) => {
  await getUID(user.name).then((val) => {
    const hoursRef = doc(db, 'hours', val);
    setDoc(hoursRef, { hours: user.hours + hours }, { merge: true });
  });
}

export const signIn = async (user) => {
  await getUID(user.name).then((val) => {
    const hoursRef = doc(db, 'hours', val);
    const date = new Date();
    setDoc(hoursRef, { 
      signin: Math.floor(date.getTime() / 1000),
      meetings: arrayUnion((date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear())
    }, { merge: true });
    
  });}

export const signOut = async (user) => {
  await getUID(user.name).then(async (val) => {
    const hoursRef = doc(db, 'hours', val);
    setDoc(hoursRef, { signin: deleteField() }, { merge: true });
  });
}