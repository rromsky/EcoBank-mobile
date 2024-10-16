import { AuthStackParamList, Route } from 'src/app/types.ts'
import { createStackNavigator } from '@react-navigation/stack'
import Header from './components/Header'
import WelcomeScreen from './screens/WelcomeScreen'
import RegisterScreen from './screens/RegisterScreen'
import OTPVerificationScreen from './screens/OTPScreen'
import LoginScreen from './screens/LoginScreen'
import { useAppDispatch, userSet } from 'shared/store'
import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from 'shared/lib/api'
import SetupDetailsScreen from './screens/SetupDetailsScreen'

const AuthStack = createStackNavigator<AuthStackParamList>()

const noHeader = { headerShown: false }

export default function AuthorizationFlow() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const unsubscribeAuthHandler = onAuthStateChanged(auth, (userInstance) => {
      if (!userInstance) return
      const { displayName, uid, phoneNumber, email, photoURL, emailVerified } = userInstance
      dispatch(
        userSet({
          displayName,
          uid,
          phoneNumber,
          email,
          photoURL,
          emailVerified,
        })
      )
      return () => {
        unsubscribeAuthHandler()
      }
    })
  }, [])
  // @ts-ignore
  return (
    <AuthStack.Navigator
      screenOptions={{
        header: () => <Header />,
      }}
      initialRouteName={Route.SetupDetailsScreen}
    >
      <AuthStack.Screen name={Route.WelcomeScreen} component={WelcomeScreen} options={noHeader} />
      <AuthStack.Screen name={Route.RegisterScreen} component={RegisterScreen} />
      <AuthStack.Screen
        name={Route.OTPVerificationScreen}
        initialParams={{ otpCode: '' }}
        component={OTPVerificationScreen}
      />
      <AuthStack.Screen name={Route.LoginScreen} component={LoginScreen} />
      <AuthStack.Screen name={Route.ResetPasswordScreen} component={WelcomeScreen} />
      <AuthStack.Screen name={Route.OnboardingScreen} component={WelcomeScreen} options={noHeader} />
      <AuthStack.Screen name={Route.SetupDetailsScreen} component={SetupDetailsScreen} options={noHeader} />
    </AuthStack.Navigator>
  )
}
