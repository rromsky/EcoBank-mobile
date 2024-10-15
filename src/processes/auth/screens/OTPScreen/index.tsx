import { useState } from 'react'
import useTimer from 'shared/lib/hooks/useTimer'
import { KeyboardAvoidingView, Text, View } from 'react-native'
import { OtpInput } from 'react-native-otp-entry'
import { auth, firebaseConfig } from 'shared/lib/api'
import { useFirebaseLogin } from 'src/processes/auth/lib/hooks/useFirebaseOTPLogin'
import GradientButtonFill from 'shared/components/GradientButtonFill'

import styles from './styles'

const OTPVerificationScreen = ({ otpCode }: { otpCode: string }) => {
  const { verifyOtp } = useFirebaseLogin({ auth: auth, firebaseConfig: firebaseConfig })
  const [isWrongCode, setWrongCode] = useState(false)
  const [userOtpCode, setOtpCode] = useState('')

  const { time } = useTimer({ minutes: 3 })

  const onClickContinue = async () => {
    try {
      const res = await verifyOtp(userOtpCode, otpCode)
      // TODO: Provide authorization token to Firebase Auth
    } catch (e) {
      console.log(e, 'ERROR_WHILE_VERIFY_OTP')
      setWrongCode(true)
    }
  }

  return (
    <View style={styles.root}>
      <KeyboardAvoidingView keyboardVerticalOffset={1} behavior='padding' style={styles.container}>
        <View style={styles.gap}>
          <Text style={styles.title}>Верифікація</Text>
          <Text style={styles.subtitle}>
            Будь ласка, введіть код підтвердження, який ми надіслали на ваш мобільний номер
          </Text>
          <OtpInput
            textInputProps={{
              style: {
                color: '#cf9531',
              },
            }}
            theme={{
              pinCodeTextStyle: {
                color: isWrongCode ? '#F20909' : '#04b108',
              },
            }}
            numberOfDigits={6}
            onTextChange={(text) => setOtpCode(text)}
          />
          <GradientButtonFill onPress={onClickContinue}>Перевірити</GradientButtonFill>
          <Text style={styles.footerText}>Термін коду закінчиться через {time}</Text>
        </View>
      </KeyboardAvoidingView>
    </View>
  )
}
export default OTPVerificationScreen
