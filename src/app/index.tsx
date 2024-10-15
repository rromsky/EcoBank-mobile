import { NavigationContainer } from '@react-navigation/native'
import { RootStackParamList } from 'src/app/types.ts'
import { NavigationRef } from 'shared/navigation'

const Stack = 0

export default function AppRoot() {
  return (
    <NavigationContainer<RootStackParamList>
      ref={(ref) => {
        NavigationRef.setRef(ref)
      }}
    >
      <></>
    </NavigationContainer>
  )
}
