import { useState } from 'react'
import { sendPasswordResetEmail } from 'firebase/auth'
import Toast from 'react-native-toast-message'
import { SafeAreaView, Text, View } from 'react-native'
import { useAppDispatch, userLogout } from 'shared/store'
import DetailInput from 'shared/components/DetailInput'
import GradientButtonFill from 'shared/components/GradientButtonFill'
import { auth } from 'shared/lib/api'
import { goToAuthWelcomeScreen } from 'shared/navigation/authStack.ts'
import { emailValidator } from 'src/processes/auth/screens/LoginScreen'
import { useNavigationTyped } from 'shared/navigation'
import LoadingFullScreen from 'shared/components/LoadingFullScreen'

import styles from '../styles'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [isValid, setIsValid] = useState(true)
  const [isSend, setIsSend] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const dispatch = useAppDispatch()
  const navigation = useNavigationTyped()

  const handleClick = async () => {
    const isEmailValid = emailValidator.test(email)
    if (!isEmailValid) {
      setIsValid(false)
      return
    }
    setIsLoading(true)
    const actionCodeSettings = {
      handleCodeInApp: true,
      url: 'https://rromsky.tech/ecobank-web',
      // iOS: { // TODO: Create dynamic linking to application
      //   bundleId: 'com.ecoinvest',
      // },
      // android: {
      //   packageName: 'com.ecoinvest',
      //   installApp: true,
      //   minimumVersion: '0',
      // },
    }

    sendPasswordResetEmail(auth, email, actionCodeSettings)
      .then((data) => {
        setIsSend(true)
      })
      .catch((e) => {
        console.log(e)
        Toast.show({
          type: 'error',
          text1: 'Щось пішло не так!',
          position: 'top',
          swipeable: true,
        })
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <View style={styles.root}>
      {isLoading && <LoadingFullScreen />}
      <SafeAreaView style={styles.contentContainer}>
        {isSend ? (
          <View style={{ gap: 18 }}>
            <Text style={styles.title}>Відправлено лист відновлення!</Text>
            <Text style={styles.description}>
              Будь ласка, перевірте свою електронну пошту, щоб дізнатися про подальші кроки зі зміни пароля.
            </Text>
            <GradientButtonFill
              onPress={() => {
                auth.signOut()
                dispatch(userLogout)
                goToAuthWelcomeScreen(navigation)
              }}
            >
              ОК
            </GradientButtonFill>
          </View>
        ) : (
          <View style={{ gap: 42 }}>
            <Text style={styles.title}>Скинути пароль</Text>
            <Text style={styles.description}>
              Введіть зареєстровану адресу електронної пошти або номер телефону, щоб скинути пароль
            </Text>
            <DetailInput
              isValid={isValid}
              placeholder={'Ел. пошта або номер телефону'}
              description={'Ел. пошта або номер телефону'}
              onChangeText={setEmail}
              value={email}
              textContentType={'emailAddress'}
            />
            <GradientButtonFill onPress={handleClick}> Надіслати </GradientButtonFill>
          </View>
        )}
      </SafeAreaView>
    </View>
  )
}

export default ForgotPassword
