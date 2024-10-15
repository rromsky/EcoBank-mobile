import { TouchableOpacity, View, Text } from 'react-native'
import styles from './styles'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/FontAwesome'
import { theme } from 'theme'
import { useNavigationTyped } from 'shared/navigation'

export default function Header() {
  const { top } = useSafeAreaInsets()
  const navigation = useNavigationTyped()

  return (
    <View style={[styles.container, { top }]}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.button}>
        <Icon name={'chevron-left'} size={24} color={theme.black} />
      </TouchableOpacity>
    </View>
  )
}
