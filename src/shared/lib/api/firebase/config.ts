import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'
import { getReactNativePersistence, initializeAuth } from '@firebase/auth'
import {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId,
  // @ts-expect-error
} from 'react-native-dotenv'
import { initializeApp } from 'firebase/app'

export const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId,
  measurementId: measurementId,
}

export const app = initializeApp(firebaseConfig)
export const auth = app && initializeAuth(app, { persistence: getReactNativePersistence(ReactNativeAsyncStorage) })
