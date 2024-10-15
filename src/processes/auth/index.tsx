import { AuthStackParamList, Route } from 'src/app/types.ts'
import { createStackNavigator } from '@react-navigation/stack'
import { useNavigationTyped } from 'shared/navigation'
import { Text, View } from 'react-native'
import { goToAuthLoginScreen } from 'shared/navigation/authStack.ts'
import Header from './components/Header'

const AuthStack = createStackNavigator<AuthStackParamList>()

const WelcomeScreen = () => {
  const navigation = useNavigationTyped()

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text
        onPress={() => {
          goToAuthLoginScreen(navigation)
        }}
      >
        WelcomeScreen
      </Text>
    </View>
  )
}

export default function AuthorizationFlow() {
  return (
    <AuthStack.Navigator
      screenOptions={{
        header: () => <Header />,
      }}
      initialRouteName={Route.WelcomeScreen}
    >
      <AuthStack.Screen options={{ headerShown: false }} name={Route.WelcomeScreen} component={WelcomeScreen} />
      <AuthStack.Screen name={Route.RegisterScreen} component={WelcomeScreen} />
      <AuthStack.Screen name={Route.LoginScreen} component={WelcomeScreen} />
      <AuthStack.Screen name={Route.ResetPasswordScreen} component={WelcomeScreen} />
      <AuthStack.Screen name={Route.OnboardingScreen} component={WelcomeScreen} />
    </AuthStack.Navigator>
  )
}
