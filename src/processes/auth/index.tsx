import { AuthStackParamList, Route } from 'src/app/types.ts'
import { createStackNavigator } from '@react-navigation/stack'
import Header from './components/Header'
import WelcomeScreen from './screens/WelcomeScreen'
import RegisterScreen from './screens/RegisterScreen'
import OTPVerificationScreen from './screens/OTPScreen'
import LoginScreen from './screens/LoginScreen'
import SetupDetailsScreen from './screens/SetupDetailsScreen'
import { useAppSelector } from 'shared/store'
import OnboardingScreen from 'src/processes/auth/screens/OnboardingScreen'
import ForgotPasswordScreen from 'src/processes/auth/screens/ForgotPasswordScreen'
import { auth } from 'shared/lib/api'

const AuthStack = createStackNavigator<AuthStackParamList>()

const noHeader = { headerShown: false }

export default function AuthorizationFlow() {
  const isLoggedIn = Boolean(auth.currentUser)
  const isDetailsSetuped = Boolean(auth.currentUser?.email)
  return (
    <AuthStack.Navigator
      screenOptions={{
        header: () => <Header />,
      }}
    >
      {!isLoggedIn && (
        <>
          <AuthStack.Screen name={Route.WelcomeScreen} component={WelcomeScreen} options={noHeader} />
          <AuthStack.Screen name={Route.RegisterScreen} component={RegisterScreen} />
          <AuthStack.Screen
            name={Route.OTPVerificationScreen}
            initialParams={{ otpCode: '' }}
            component={OTPVerificationScreen}
          />
          <AuthStack.Screen name={Route.LoginScreen} component={LoginScreen} />
          <AuthStack.Screen name={Route.ResetPasswordScreen} component={ForgotPasswordScreen} />
        </>
      )}
      {isLoggedIn && (
        <>
          {isDetailsSetuped && (
            <AuthStack.Screen name={Route.OnboardingScreen} component={OnboardingScreen} options={noHeader} />
          )}
          {!isDetailsSetuped && (
            <AuthStack.Screen name={Route.SetupDetailsScreen} component={SetupDetailsScreen} options={noHeader} />
          )}
        </>
      )}
    </AuthStack.Navigator>
  )
}
