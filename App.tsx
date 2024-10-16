import React from 'react'

import { SafeAreaProvider } from 'react-native-safe-area-context'
import { LogBox, StatusBar } from 'react-native'

import Toast from 'react-native-toast-message'
import AppRoot from './src/app'
import WelcomeLoadingComponent from 'src/features/modals/WelcomeLoadingModal'

import 'react-native-gesture-handler'
import { store } from 'src/app/providers/redux'
import { Provider } from 'react-redux'

LogBox.ignoreAllLogs()

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar />
        <AppRoot />
        <WelcomeLoadingComponent />
        <Toast />
      </SafeAreaProvider>
    </Provider>
  )
}
