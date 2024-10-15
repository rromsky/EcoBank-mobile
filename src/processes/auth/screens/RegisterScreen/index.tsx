import { useCallback, useState } from 'react'
import { KeyboardAvoidingView, Text, View } from 'react-native'

import PhoneNumberInput from 'src/processes/auth/components/PhoneNumberInput'
import GradientButtonFill from 'shared/components/GradientButtonFill'
import { useFirebaseLogin } from 'src/processes/auth/lib/hooks/useFirebaseOTPLogin'
import { auth, firebaseConfig } from 'shared/lib/api'
import { useNavigationTyped } from 'shared/navigation'
import { goToAuthOTPVerificationScreen } from 'shared/navigation/authStack.ts'
import { BottomText } from 'src/processes/auth/screens/RegisterScreen/components/BottomText'

import styles from './styles'

const RegisterScreen = () => {
  const navigation = useNavigationTyped()

  const [formattedValue, setFormattedValue] = useState('')
  const [value, setValue] = useState('')

  const { recaptcha, sendOtp } = useFirebaseLogin({ auth: auth, firebaseConfig: firebaseConfig })

  const handleSendOtp = useCallback(() => {
    sendOtp(formattedValue)
      .then((res) => {
        if (!res) {
          console.log('OTP_CODE_EMPTY')
          return
        }
        goToAuthOTPVerificationScreen(navigation, { otpCode: res })
      })
      .catch((e) => {
        console.log(e, 'ERROR_WHILE_GET_OTP_CODE')
      })
  }, [formattedValue, sendOtp, navigation])

  return (
    <View style={styles.root}>
      <KeyboardAvoidingView keyboardVerticalOffset={1} behavior='padding' style={styles.container}>
        <View style={styles.gap}>
          <Text style={styles.title}>Реєстрація</Text>
          <Text style={styles.subtitle}>Будь ласка, введіть свій мобільний номер, щоб отримати код підтвердження.</Text>
          <View style={{ alignSelf: 'center' }}>
            <PhoneNumberInput value={value} setValue={setValue} setFormattedValue={setFormattedValue} />
          </View>
          <GradientButtonFill onPress={handleSendOtp}>Відправити</GradientButtonFill>
        </View>
      </KeyboardAvoidingView>
      <BottomText />
      {recaptcha}
    </View>
  )
}

export default RegisterScreen
