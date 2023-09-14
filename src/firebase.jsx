import { initializeApp } from "firebase/app";
import {
    getFirestore,
    collection,
    getDocs,
    doc,
    setDoc,
    deleteField,
    arrayUnion,
    addDoc,
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
  return users.filter((user) => user.name === name)[0];
}

export const getUserFromUID = async (uid) => {
  const hoursRef = collection(db, "hours");
  const hoursSnap = await getDocs(hoursRef);
  
  return hoursSnap.docs
    .filter((doc) => doc.id === uid)
    .map((doc) => doc.data())[0];
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
  else if (rank === users.length) return rank + " 😭";
  else if (rank === 2) return rank + " 🥈";
  else if (rank === 3) return rank + " 🥉";
  else return rank;
}

export const addHours = async (user, hours) => {
  const hoursRef = doc(db, 'hours', user.uid);
  setDoc(hoursRef, { hours: user.hours + hours }, { merge: true });
}

export const signIn = async (user) => {
  const hoursRef = doc(db, 'hours', user.uid);
  const date = new Date();
  setDoc(hoursRef, { 
    signin: Math.floor(date.getTime() / 1000),
    meetings: arrayUnion((date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear())
  }, { merge: true });
}

export const signOut = async (user) => {
  const hoursRef = doc(db, 'hours', user.uid);
  setDoc(hoursRef, { signin: deleteField() }, { merge: true });
}

export const checkPassword = async (password) => {
  const passwordSnap = await getDocs(collection(db, "settings"));
  return password === passwordSnap.docs[0]._document.data.value.mapValue.fields.password.stringValue;
}

export const setStats = async (user, newName, newHours, volunteerHours, newMeetings, newGraduation) => {
  const hoursRef = doc(db, 'hours', user.uid);
  setDoc(hoursRef, { 
    name: newName,
    hours: newHours,
    volunteer: volunteerHours,
    meetings: newMeetings,
    graduation: newGraduation,
  }, { merge: true });
}

export const createUser = async (name) => {
  return await addDoc(collection(db, "hours"), {name: name, hours: 0, meetings: [], volunteer: 0, graduation: new Date().getFullYear() + 4}).then(doc => {
    setDoc(doc, { uid: doc.id }, { merge: true });
    return doc.id;
  });
}