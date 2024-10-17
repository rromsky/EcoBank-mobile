import { collection, getDocs, query, where, setDoc, addDoc, doc } from 'firebase/firestore'
import { firestore } from './firebase/config'
import { auth } from 'shared/lib/api/firebase'
import { User } from 'shared/store'

export const getCurrentUser = () => auth.currentUser

export const gatewayLoadUser = async ({ userID }: { userID?: string }): Promise<User> => {
  const userRef = query(collection(firestore, 'users'), where('id', '==', userID || getCurrentUser()))
  const fetchedUser = (await getDocs(userRef)) as any
  const data = fetchedUser.docs.map((el: any) => {
    return { ...el.data() }
  })
  return data[0] || null
}

export const gatewaySetUser = async ({ user }: { user: User }): Promise<void> => {
  const userCollection = collection(firestore, 'users')
  const userDocRec = doc(userCollection, `${user.uid}`)

  setDoc(userDocRec, user)
}
export * from './firebase'
