import { LinearGradient } from 'react-native-linear-gradient'
import { Text, TouchableOpacity, View } from 'react-native'
import styles from './styles'

export type GradientButtonProps = {
  isValid?: boolean
  children: any
  onPress: () => void
  pv?: number
  mv?: number | 'auto'
  mh?: number
  disabled?: boolean
  colors?: string[]
  disabledColors?: string[]
}

export default function GradientButtonFill({
  children,
  onPress,
  pv = 21,
  mv = 0,
  mh = 0,
  disabled = false,
  colors = ['#42d16a', '#19b845'],
  disabledColors = ['#A0FFBA', '#72E893'],
}: GradientButtonProps) {
  return (
    <TouchableOpacity disabled={disabled} activeOpacity={0.6} onPress={onPress}>
      <LinearGradient style={[styles.button, { marginHorizontal: mh }]} colors={disabled ? disabledColors : colors}>
        <View style={[styles.button, { paddingVertical: pv, marginVertical: mv }]}>
          <Text style={styles.label}>{children}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  )
}
