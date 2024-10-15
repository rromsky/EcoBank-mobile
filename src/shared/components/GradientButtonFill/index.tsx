import { LinearGradient } from 'react-native-linear-gradient'
import { Text, TouchableOpacity } from 'react-native'
import styles from './styles'

export type GradientButtonProps = {
  isValid?: boolean
  children: any
  onPress: () => void
  pv?: number
  mv?: number | 'auto'
  disabled?: boolean
  colors?: string[]
  disabledColors?: string[]
}

export default function GradientButtonFill({
  children,
  onPress,
  pv = 21,
  mv = 0,
  disabled = false,
  colors = ['#72E893', '#34C95D'],
  disabledColors = ['#A0FFBA', '#72E893'],
}: GradientButtonProps) {
  return (
    <LinearGradient colors={disabled ? disabledColors : colors}>
      <TouchableOpacity
        style={[styles.button, { paddingVertical: pv, marginVertical: mv }]}
        disabled={disabled}
        activeOpacity={0.6}
        onPress={onPress}
      >
        <Text style={styles.label}>{children}</Text>
      </TouchableOpacity>
    </LinearGradient>
  )
}
