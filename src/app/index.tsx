import { NavigationContainer } from '@react-navigation/native'
import { RootStackParamList, Route } from 'src/app/types'
import { NavigationRef } from 'shared/navigation'
import { createStackNavigator } from '@react-navigation/stack'
import AuthorizationFlow from 'src/processes/auth'
import { useAppDispatch, useAppSelector, userSet } from 'shared/store'
import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, gatewayLoadUser } from 'shared/lib/api'

const Stack = createStackNavigator<RootStackParamList>()

export default function AppRoot() {
  const userOnboarded = useAppSelector((state) => state.user.isOnboarded)
  const isLoggedIn = useAppSelector((state) => !!state.user.user)
  const dispatch = useAppDispatch()
  const [initializing, setInitializing] = useState(true)
  const [listenUser, setListenUser] = useState(false)

  useEffect(() => {
    const authListener = onAuthStateChanged(auth, (result) => {
      const userID = result?.uid

      if (userID) {
        gatewayLoadUser({ userID }).then((user) => {
          dispatch(userSet(user))
        })
      }
      if (initializing && !listenUser) {
        setInitializing(false)
        setListenUser(true)
      }
    })

    return () => {
      if (authListener) {
        authListener()
      }
    }
  }, [initializing, listenUser])

  return (
    <NavigationContainer<RootStackParamList>
      ref={(ref) => {
        NavigationRef.setRef(ref)
      }}
    >
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {(!userOnboarded || !isLoggedIn) && <Stack.Screen name={Route.AuthStack} component={AuthorizationFlow} />}
        {/*<Stack.Screen name={Route.AuthStack} component={AuthorizationFlow} />*/}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
