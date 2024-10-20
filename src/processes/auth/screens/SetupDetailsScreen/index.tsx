import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useState } from 'react'
import { EmailAuthProvider, linkWithCredential } from 'firebase/auth'
import { updateUserPersonalData, useAppDispatch, useAppSelector, userLogout, userSet } from 'shared/store'
import { emailValidator, passwordValidator } from 'src/processes/auth/screens/LoginScreen'
import { auth, gatewaySetUser } from 'shared/lib/api'
import GradientButtonFill from 'shared/components/GradientButtonFill'
import DetailInput from 'shared/components/DetailInput'
import styles from './styles'
import { goToAuthOnboardingScreen, goToAuthWelcomeScreen } from 'shared/navigation/authStack.ts'
import { useNavigationTyped } from 'shared/navigation'
import { wait } from 'shared/types'

const SetupDetails = () => {
  const dispatch = useAppDispatch()
  const navigation = useNavigationTyped()

  const [surname, setSurname] = useState('')
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [isPasswordVerified, setPasswordVerified] = useState(true)
  const [isEmailVerified, setEmailVerified] = useState(true)
  const [isNameVerified, setNameVerified] = useState(true)
  const [isSurnameVerified, setSurnameVerified] = useState(true)
  const [isAddressVerified, setIsAddressVerified] = useState(true)

  const onClickContinue = async () => {
    const emailValid = emailValidator.test(email)
    if (!emailValid) setEmailVerified(false)
    const passwordValid = passwordValidator.test(password)
    if (!passwordValid) setPasswordVerified(false)

    if (!name.length) setNameVerified(false)
    if (!surname.length) setSurnameVerified(false)
    if (!address.length) setIsAddressVerified(false)

    if (emailValid && passwordValid && name.length && surname.length && address.length && auth.currentUser) {
      const cred = EmailAuthProvider.credential(email, password)
      const personalData = {
        name,
        surname,
        address,
        email,
      }
      const { uid, emailVerified, phoneNumber, photoURL, displayName = `${name} ${surname}` } = auth.currentUser || {}

      const user = {
        personalData: personalData,
        uid,
        email,
        emailVerified,
        phoneNumber,
        photoURL,
        displayName,
        marketData: { favouriteItems: [] },
      }
      linkWithCredential(auth.currentUser, cred).then(() => {
        dispatch(userSet(user))

        gatewaySetUser({ user })
        goToAuthOnboardingScreen(navigation)
      })
    }
  }

  return (
    <SafeAreaView style={styles.root}>
      <View style={{ flexDirection: 'row', marginTop: 24 }}>
        <TouchableOpacity
          style={{}}
          onPress={() => {
            auth.signOut()
            dispatch(userLogout)
            wait(100).then(() => {
              goToAuthWelcomeScreen(navigation)
            })
          }}
        >
          <Icon name={'chevron-left'} size={32} />
        </TouchableOpacity>

        <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.title}>Персональні дані</Text>
        </View>
      </View>
      <View style={{ flex: 1, justifyContent: 'center', gap: 8 }}>
        <DetailInput
          isValid={isSurnameVerified}
          value={surname}
          placeholder={'Ваше прізвище'}
          description={'Прізвише'}
          onChangeText={setSurname}
          textContentType={'middleName'}
        />
        <DetailInput
          isValid={isNameVerified}
          value={name}
          placeholder={'Ваше імʼя'}
          description={'Імʼя'}
          onChangeText={setName}
          textContentType={'name'}
        />
        <DetailInput
          isValid={isAddressVerified}
          value={address}
          placeholder={'Адреса проживання'}
          description={'Вулиця, будинок, квартира'}
          onChangeText={setAddress}
          textContentType={'fullStreetAddress'}
        />
        <DetailInput
          isValid={isEmailVerified}
          value={email}
          placeholder={'Електронна пошта'}
          description={'Ваша елекронна пошта'}
          onChangeText={setEmail}
          textContentType={'emailAddress'}
        />
        <DetailInput
          isValid={isPasswordVerified}
          value={password}
          placeholder={'Пароль'}
          description={'Пароль'}
          onChangeText={setPassword}
          textContentType={'password'}
          isPassword
        />
        <Text style={styles.text}>
          Пароль має бути щонайменше 6 символів, містити цифри та латинські літери, зокрема великі, і не повинен
          збігатися з ім'ям та ел. поштою
        </Text>
      </View>
      <View style={{ marginBottom: 22 }}>
        <GradientButtonFill onPress={onClickContinue}>Зареєструватись</GradientButtonFill>
      </View>
    </SafeAreaView>
  )
}

export default SetupDetails
