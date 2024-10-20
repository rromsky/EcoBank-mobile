import { NavigationContainer } from '@react-navigation/native'
import { RootStackParamList, Route } from 'src/app/types'
import { NavigationRef } from 'shared/navigation'
import { createStackNavigator } from '@react-navigation/stack'
import AuthorizationFlow from 'src/processes/auth'
import { useAppDispatch, useAppSelector, userSet } from 'shared/store'
import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, gatewayLoadUser } from 'shared/lib/api'
import MarketFlow from 'src/processes/market'
import ItemDetailsScreen from 'src/processes/market/screens/ItemDetailsScreen'
import Header from 'src/processes/auth/components/Header'
import CartScreen from 'src/processes/market/screens/CartScreen'

const Stack = createStackNavigator<RootStackParamList>()

const showHeader = { headerShown: true }

export default function AppRoot() {
  const userOnboarded = useAppSelector((state) => state.user.isOnboarded || state.user.user?.isOnboarded)
  const isLoggedIn = useAppSelector((state) => !!state.user.user)
  const dispatch = useAppDispatch()
  const [initializing, setInitializing] = useState(true)
  const [listenUser, setListenUser] = useState(false)

  useEffect(() => {
    const authListener = onAuthStateChanged(auth, (result) => {
      const userID = result?.uid
      console.log(userID)
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
          header: () => <Header />,
        }}
      >
        {(!userOnboarded || !isLoggedIn) && <Stack.Screen name={Route.AuthStack} component={AuthorizationFlow} />}
        <Stack.Screen name={Route.MarketStack} component={MarketFlow} />
        <Stack.Screen options={showHeader} name={Route.ItemDetailsScreen} component={ItemDetailsScreen} />
        <Stack.Screen options={showHeader} name={Route.CartScreen} component={CartScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
