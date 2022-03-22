import { initializeApp } from 'firebase/app'
import { getFirestore } from '@firebase/firestore'
const firebaseConfig = {
  apiKey: 'AIzaSyBS_y0j-g0TNBHlP3V0G_gmbg475aZb8qw',
  authDomain: 'tst-firebase-d6959.firebaseapp.com',
  projectId: 'tst-firebase-d6959',
  storageBucket: 'tst-firebase-d6959.appspot.com',
  messagingSenderId: '639871981297',
  appId: '1:639871981297:web:0e736124331c0823f37b50',
  measurementId: 'G-F4VJ81Z6JH'
}

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
