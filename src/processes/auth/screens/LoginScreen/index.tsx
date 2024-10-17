import { KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import GradientButtonFill from 'shared/components/GradientButtonFill'
import styles from './styles.ts'
import { goToAuthRegisterScreen, goToAuthResetPasswordScreen } from 'shared/navigation/authStack.ts'
import { useNavigationTyped } from 'shared/navigation'
import LoadingFullScreen from 'shared/components/LoadingFullScreen'
import DetailInput from 'shared/components/DetailInput'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from 'shared/lib/api'

export const emailValidator =
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+))/
export const passwordValidator = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,16}$/

export default function LoginScreen() {
  const navigation = useNavigationTyped()

  const [email, setEmailOrPhone] = useState('')
  const [password, setPassword] = useState('')
  const [isEmailValid, setIsMailValid] = useState(true)
  const [isPasswordValid, setIsPasswordValid] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const onClickContinue = () => {
    let invalidData = false
    if (!emailValidator.test(email)) {
      setIsMailValid(false)
      invalidData = true
    }
    if (!passwordValidator.test(password)) {
      setIsPasswordValid(false)
      invalidData = true
    }
    if (invalidData) {
      setTimeout(() => {
        setIsMailValid(true)
        setIsPasswordValid(true)
      }, 5000)
      return
    }
    setIsLoading(true)
    signInWithEmailAndPassword(auth, email, password).then(() => {
      setIsLoading(false)
    })
  }

  return (
    <View style={styles.root}>
      {isLoading && <LoadingFullScreen />}
      <KeyboardAvoidingView keyboardVerticalOffset={1} behavior='padding' style={styles.container}>
        <View style={styles.gap}>
          <View>
            <Text style={styles.title}>Авторизація</Text>
            <Text style={styles.subtitle}>
              Введіть свій логін та пароль для входу в аккаунт. Якщо забули пароль, його можна скинути натиснувши кнопку
              знизу
            </Text>
          </View>
          <View style={{}}>
            <DetailInput
              value={email}
              isValid={isEmailValid}
              onChangeText={setEmailOrPhone}
              placeholder='email@gmail.com'
              description='Ел. Пошта або номер телефону'
              textContentType='emailAddress'
            />
            <DetailInput
              value={password}
              isValid={isPasswordValid}
              onChangeText={setPassword}
              placeholder='Qwerty123'
              description='Пароль'
              textContentType='password'
              isPassword
            />
          </View>
          <View style={styles.bottomContainer}>
            <GradientButtonFill disabled={!isEmailValid || !isPasswordValid} onPress={onClickContinue}>
              УВІЙТИ
            </GradientButtonFill>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
              <TouchableOpacity
                onPress={() => {
                  goToAuthRegisterScreen(navigation)
                }}
              >
                <Text style={styles.link}>Зареєструватись</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  goToAuthResetPasswordScreen(navigation)
                }}
              >
                <Text style={[styles.link, styles.warning]}>Забули пароль?</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  )
}
