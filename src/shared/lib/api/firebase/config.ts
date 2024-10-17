import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'
import { getReactNativePersistence, initializeAuth } from '@firebase/auth'

import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

export const firebaseConfig = {
  apiKey: 'AIzaSyBaCZ5IPVSb3fQSG01jX2m1JS4sDrELG1g',
  authDomain: 'ecoinvest-54a60.firebaseapp.com',
  projectId: 'ecoinvest-54a60',
  storageBucket: 'ecoinvest-54a60.appspot.com',
  messagingSenderId: '372799000557',
  appId: '1:372799000557:web:f93dd28a9f2377f35a61e4',
  measurementId: 'G-FKY6GVXFBH',
}

export const app = initializeApp(firebaseConfig)

export const auth = initializeAuth(app, { persistence: getReactNativePersistence(ReactNativeAsyncStorage) })

export const firestore = getFirestore(app)
