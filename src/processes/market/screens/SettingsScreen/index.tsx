import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { ProfileIcon } from 'src/processes/market/components/CustomTabBar'
import { useAppDispatch, useAppSelector, userLogout } from 'shared/store'
import ProfileButton from './components/ProfileButton'

import styles from './styles'
import Icon from 'react-native-vector-icons/Entypo'
import { theme } from 'theme'
import { useNavigationTyped } from 'shared/navigation'
import { goToAuthWelcomeScreen } from 'shared/navigation/authStack.ts'

export default function SettingsScree() {
  const user = useAppSelector((state) => state.user.user)

  const dispatch = useAppDispatch()
  const navigation = useNavigationTyped()

  const onLogout = () => {
    dispatch(userLogout())
    goToAuthWelcomeScreen(navigation)
  }

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.content}>
        <View style={styles.headerContainer}>
          <ProfileIcon width={48} height={48} isActive />
          <Text style={styles.title}>{`${user.personalData.name} ${user.personalData.surname}`}</Text>
        </View>
        <ProfileButton disabled iconName={'user'} title={'Персональні дані'} onPress={() => {}} />

        <ProfileButton disabled iconName={'shopping-cart'} title={'Мої замовлення'} onPress={() => {}} />

        <ProfileButton disabled iconName={'stopwatch'} title={'Трекер'} onPress={() => {}} />

        <ProfileButton disabled iconName={'credit-card'} title={'Платіжні налаштування'} onPress={() => {}} />

        <ProfileButton disabled iconName={'help'} title={'Служба підтримки'} onPress={() => {}} />

        <ProfileButton disabled iconName={'cog'} title={'Налаштування'} onPress={() => {}} />
      </View>
      <TouchableOpacity onPress={onLogout} style={styles.logoutButton}>
        <Icon name={'log-out'} size={24} color={theme.red} />
        <Text style={styles.logoutLabel}>Вийти</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}
