import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase-firestore'

const firebaseApp = firebase.initializeApp({
    apiKey: 'AIzaSyCFxaQLuo2RJfr7PsD8npYmzbV00hg6ZJU',
    authDomain: 'todo-app-practice-ae0a0.firebaseapp.com',
    projectId: 'todo-app-practice-ae0a0',
    storageBucket: 'todo-app-practice-ae0a0.appspot.com',
    messagingSenderId: '978043077786',
    appId: '1:978043077786:web:eedb37e6494d42260f4b23',
    measurementId: 'G-GSDM3T5T1G',
})

const db = firebaseApp.firestore()
const auth = firebaseApp.auth()

export { db, auth }
