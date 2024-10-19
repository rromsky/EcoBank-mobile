import React from 'react'

import { SafeAreaProvider } from 'react-native-safe-area-context'
import { LogBox, StatusBar } from 'react-native'

import Toast from 'react-native-toast-message'
import AppRoot from './src/app'
import WelcomeLoadingComponent from 'src/features/modals/WelcomeLoadingModal'

import 'react-native-gesture-handler'
import { store } from 'src/app/providers/redux'
import { Provider } from 'react-redux'
import { StripeProvider } from '@stripe/stripe-react-native'

LogBox.ignoreAllLogs()

export default function App() {
  return (
    <StripeProvider
      publishableKey={
        'pk_test_51QBXGVFpJ1u0XmeuaFmuh1JkaN1iIT3H0lK6OWOQvdBEkv0acynxvfmcLiOj0yWwZk5H9KgBYL3Y8hWM3OUjYLgf00tTVuqK5L'
      }
      merchantIdentifier='merchant.com.ecoinvest'
      urlScheme='https://rromsky.tech/ecobank-web'
    >
      <Provider store={store}>
        <SafeAreaProvider>
          <StatusBar />
          <AppRoot />
          <Toast />
        </SafeAreaProvider>
        <WelcomeLoadingComponent />
      </Provider>
    </StripeProvider>
  )
}
