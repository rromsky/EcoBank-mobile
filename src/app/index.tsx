import { NavigationContainer } from '@react-navigation/native'
import { RootStackParamList, Route } from 'src/app/types'
import { NavigationRef } from 'shared/navigation'
import { createStackNavigator } from '@react-navigation/stack'
import AuthorizationFlow from 'src/processes/auth'

const Stack = createStackNavigator<RootStackParamList>()

export default function AppRoot() {
  const user = {}

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
        <Stack.Screen name={Route.AuthStack} component={AuthorizationFlow} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
