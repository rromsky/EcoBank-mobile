import { TouchableOpacity } from 'react-native'
import { LinearGradient } from 'react-native-linear-gradient'
import { windowHeight, windowWidth } from 'shared/types'

export const BottomGradient = ({
  height = windowHeight * 0.3,
  colors = ['rgba(255,255,255,0)', '#ffffff'],
}: {
  height?: number
  colors?: string[]
}) => {
  return (
    <TouchableOpacity
      disabled
      style={{
        position: 'absolute',
        width: windowWidth,
        height: height,
        bottom: 0,
        zIndex: 997,
        pointerEvents: 'none',
      }}
    >
      <LinearGradient colors={colors} style={{ flex: 1 }} />
    </TouchableOpacity>
  )
}
