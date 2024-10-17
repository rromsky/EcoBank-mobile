import { AuthStackParamList, Route } from 'src/app/types.ts'
import { createStackNavigator } from '@react-navigation/stack'
import Header from './components/Header'
import WelcomeScreen from './screens/WelcomeScreen'
import RegisterScreen from './screens/RegisterScreen'
import OTPVerificationScreen from './screens/OTPScreen'
import LoginScreen from './screens/LoginScreen'
import SetupDetailsScreen from './screens/SetupDetailsScreen'
import { useAppSelector } from 'shared/store'

const AuthStack = createStackNavigator<AuthStackParamList>()

const noHeader = { headerShown: false }

export default function AuthorizationFlow() {
  const isLoggedIn = useAppSelector((state) => !!state.user.user)
  return (
    <AuthStack.Navigator
      screenOptions={{
        header: () => <Header />,
      }}
      initialRouteName={isLoggedIn ? Route.WelcomeScreen : Route.SetupDetailsScreen}
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
