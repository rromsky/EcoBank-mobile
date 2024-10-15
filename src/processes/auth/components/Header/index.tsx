import { TouchableOpacity, View, Text } from 'react-native'
import styles from './styles'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/FontAwesome'

export default function Header() {
  const { top } = useSafeAreaInsets()
  return (
    <View style={[styles.container, { top }]}>
      <TouchableOpacity>
        <Icon name={'chevron-left'} size={20} color={'#000'} />
        <Text>{'<'}- </Text>
      </TouchableOpacity>
    </View>
  )
}
