import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

// firebase init
const firebaseConfig = {
  apiKey: "AIzaSyDBUnR4uH7x0m-IOELkT8Ts7BoSdXCNjPo",
  authDomain: "glospowiatupanel.firebaseapp.com",
  databaseURL: "https://glospowiatupanel.firebaseio.com",
  projectId: "glospowiatupanel",
  storageBucket: "glospowiatupanel.appspot.com",
  messagingSenderId: "666929591792",
  appId: "1:666929591792:web:c3b4f012ff87f9300fd935",
  measurementId: "G-75VXJVLWVG"
}
firebase.initializeApp(firebaseConfig)

// utils
const db = firebase.firestore()
const auth = firebase.auth()

// collection references
const usersCollection = db.collection('users')
const articlesCollection = db.collection('articles')
const postsCollection = db.collection('posts')
const commentsCollection = db.collection('comments')
const likesCollection = db.collection('likes')
const subjectsCollection = db.collection('subjects')
// export utils/refs
export {
  db,
  auth,
  articlesCollection,
  usersCollection,
  postsCollection,
  commentsCollection,
  likesCollection,
  subjectsCollection
}
