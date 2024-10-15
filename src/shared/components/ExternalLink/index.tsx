import { Linking, Text, TouchableOpacity } from 'react-native'
import { theme } from 'theme'
import styles from './styles'

export const ExternalLink = (props: any) => {
  const {
    url,
    children,
    style = {
      fontFamily: 'CeraPro-Regular',
      fontSize: 12,
      lineHeight: 14,
      color: theme.green,
    },
  } = props

  const onPress = () =>
    Linking.canOpenURL(url).then(() => {
      Linking.openURL(url)
    })

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={style}>{children}</Text>
    </TouchableOpacity>
  )
}
