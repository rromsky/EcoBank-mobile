import { Text, TouchableOpacity, View } from 'react-native'
import styles from './styles'
import { useNavigationTyped } from 'shared/navigation'
import { goToAuthLoginScreen } from 'shared/navigation/authStack.ts'
import { ExternalLink } from 'shared/components/ExternalLink'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export const BottomText = () => {
  const navigation = useNavigationTyped()
  const { bottom } = useSafeAreaInsets()

  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <Text style={[styles.text, styles.loginText]}>Вже є акаунт?</Text>
        <TouchableOpacity
          onPress={() => {
            goToAuthLoginScreen(navigation)
          }}
        >
          <Text numberOfLines={1} adjustsFontSizeToFit style={[styles.text, styles.loginText, styles.link]}>
            Ввійти в акаунт.
          </Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.termsContainer, { paddingBottom: bottom }]}>
        <Text style={styles.textContainer}>
          <Text style={styles.text}>Створюючи обліковий запис, ви приймаєте наші</Text>
          <ExternalLink url={'https://rromsky.tech/ecobank-web/terms'}>Умови та положення, </ExternalLink>
          <Text style={styles.text}>а також ознайомлюєтеся з нашою</Text>
          <ExternalLink url={'https://rromsky.tech/ecobank-web/pp'}>Політикою конфіденційності.</ExternalLink>
        </Text>
      </View>
    </View>
  )
}
