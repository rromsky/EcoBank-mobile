import { AuthStackParamList, Route } from 'src/app/types.ts'
import { createStackNavigator } from '@react-navigation/stack'
import Header from './components/Header'
import WelcomeScreen from 'src/processes/auth/screens/WelcomeScreen'
import RegisterScreen from 'src/processes/auth/screens/RegisterScreen'
import OTPVerificationScreen from 'src/processes/auth/screens/OTPScreen'

const AuthStack = createStackNavigator<AuthStackParamList>()

const noHeader = { headerShown: false }

export default function AuthorizationFlow() {
  return (
    <AuthStack.Navigator
      screenOptions={{
        header: () => <Header />,
      }}
      initialRouteName={Route.WelcomeScreen}
    >
      <AuthStack.Screen name={Route.WelcomeScreen} component={WelcomeScreen} options={noHeader} />
      <AuthStack.Screen name={Route.RegisterScreen} component={RegisterScreen} />
      <AuthStack.Screen name={Route.OTPVerificationScreen} component={OTPVerificationScreen} />
      <AuthStack.Screen name={Route.LoginScreen} component={WelcomeScreen} />
      <AuthStack.Screen name={Route.ResetPasswordScreen} component={WelcomeScreen} />
      <AuthStack.Screen name={Route.OnboardingScreen} component={WelcomeScreen} options={noHeader} />
    </AuthStack.Navigator>
  )
}
