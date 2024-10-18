import { collection, getDocs, query, where, setDoc, addDoc, updateDoc, doc } from 'firebase/firestore'
import { firestore } from './firebase/config'
import { auth } from 'shared/lib/api/firebase'
import { User } from 'shared/store'
import { ItemType } from 'src/processes/market/screens/types.ts'

export const getCurrentUser = () => auth.currentUser

export const gatewayLoadUser = async ({ userID }: { userID?: string }): Promise<User> => {
  const userRef = query(collection(firestore, 'users'), where('uid', '==', userID || getCurrentUser()))
  const fetchedUser = (await getDocs(userRef)) as any
  const data = fetchedUser.docs.map((el: any) => {
    return { ...el.data() }
  })
  return data[0] || null
}

export const gatewaySetUser = async ({ user }: { user: User }): Promise<void> => {
  const userCollection = collection(firestore, 'users')
  const userDocRec = doc(userCollection, `${user.uid}`)

  setDoc(userDocRec, { ...user, marketData: { favouriteItems: [] } })
}
export * from './firebase'

export const gatewaySetUserOnboarded = () => {
  const userId = getCurrentUser()?.uid
  if (!userId) return
  const userCollection = collection(firestore, 'users')
  const userDocRef = doc(userCollection, `${userId}`)

  updateDoc(userDocRef, { isOnboarded: true })
}

export const gatewayUpdateUserFavourite = async (newList: string[]) => {
  const userId = getCurrentUser()?.uid
  if (!userId) return
  const userCollection = collection(firestore, 'users')
  const userDocRef = doc(userCollection, `${userId}`)

  updateDoc(userDocRef, { marketData: { favouriteItems: newList } })
}

export const loadMarketItems = async () => {
  const dataRef = collection(firestore, 'marketItems')

  const fetchedData = await getDocs(dataRef)
  return fetchedData.docs.map((el) => {
    return { ...el.data() } as unknown as ItemType
  })
}

export const loadMarketItemById = async (id: string) => {
  const dataRef = query(collection(firestore, 'marketItems'), where('code', '==', id))

  const fetchedData = await getDocs(dataRef)
  return fetchedData.docs.map((el) => {
    return { ...el.data() }
  })[0] as unknown as ItemType
}
