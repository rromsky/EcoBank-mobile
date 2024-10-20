import { Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'

import styles from './styles'
import { theme } from 'theme'

interface Props {
  iconName: string
  title: string
  secondTitle?: string
  onPress: () => void
  disabled?: boolean
}

export default function ProfileButton({ iconName, title, secondTitle, onPress, disabled }: Props) {
  return (
    <TouchableOpacity disabled={disabled} onPress={onPress} style={styles.root}>
      <View style={styles.container}>
        <Icon name={iconName} color={theme.profileButtonLabel} size={38} />
        <Text style={styles.label}>{title}</Text>
      </View>
      <View style={styles.subTitleContainer}>
        {secondTitle && <Text>{secondTitle}</Text>}
        <Icon name={'chevron-small-right'} size={34} color={theme.base60} />
      </View>
    </TouchableOpacity>
  )
}
