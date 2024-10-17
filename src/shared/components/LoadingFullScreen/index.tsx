import { ActivityIndicator, View } from 'react-native'
import { theme } from 'theme'
import { windowHeight, windowWidth } from 'shared/types'

export default function LoadingFullScreen() {
  return (
    <View
      style={{
        position: 'absolute',
        width: windowWidth,
        height: windowHeight,
        zIndex: 2,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          position: 'absolute',
          width: windowWidth,
          height: windowHeight,
          zIndex: 2,
          backgroundColor: theme.gray,
          opacity: 0.25,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      />
      <ActivityIndicator style={{ zIndex: 2 }} size={'large'} color={theme.green} />
    </View>
  )
}
