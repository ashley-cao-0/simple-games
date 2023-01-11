// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore, query, where, orderBy, limit, addDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBBwgIsbFTbYdU_GPu11OZlJsbK0OyJcQY",
  authDomain: "simple-games-95942.firebaseapp.com",
  projectId: "simple-games-95942",
  storageBucket: "simple-games-95942.appspot.com",
  messagingSenderId: "355876565244",
  appId: "1:355876565244:web:8b1cbf151c4682339aa779"
};

// Initialize Firebase
initializeApp(firebaseConfig);

//initialise services
const db = getFirestore()

// collection ref
const scoresRef = collection(db, 'scores')

//get collection data
export const getTopScores = async (game) => {
  const q = query(scoresRef, where("game", "==", game), orderBy("score", "desc"), orderBy("createdAt", 'asc'))
  try {
    const snapshot = await getDocs(q)
    let scores = []
    snapshot.forEach(doc => {
      scores.push({...doc.data(), id: doc.id})
    })
    scores = scores.filter(score => score.name !== 'anonymous')
    if (scores.length > 50) {
      scores = scores.slice (0, 50)
    }
    return scores
  } catch (error) {
    console.log(error.message);
  }
}

//add new anonymous score
export const saveAnonymousScore = async (score, game) => {
  try {
    const newScoreRef = await addDoc(scoresRef, {
      name: 'anonymous',
      score: score,
      game: game,
      createdAt: serverTimestamp() 
    })
    return newScoreRef.id
  } catch (error) {
    console.log(error.message);
  }
}

//update score's name
export const saveScore = async (newName, id) => {
  const scoreRef = doc(db, 'scores', id)
  await updateDoc(scoreRef, {
    name: newName
  })
}

//save score by game
export const saveHighScore = async (game, name, score) => {
  try {
    const newScoreRef = await addDoc(scoresRef, {
      game: game,
      name: name,
      score: score,
      createdAt: serverTimestamp() 
    })
    return newScoreRef.id
  } catch (error) {
    console.log(error.message);
  }
}