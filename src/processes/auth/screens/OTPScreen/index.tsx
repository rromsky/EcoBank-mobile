import React, { useState } from 'react'
import useTimer from 'shared/lib/hooks/useTimer'
import { KeyboardAvoidingView, Text, View } from 'react-native'
import { OtpInput } from 'react-native-otp-entry'
import { auth, firebaseConfig } from 'shared/lib/api'
import { useFirebaseLogin } from 'src/processes/auth/lib/hooks/useFirebaseOTPLogin'
import GradientButtonFill from 'shared/components/GradientButtonFill'

import styles from './styles'
import LoadingFullScreen from 'shared/components/LoadingFullScreen'
import { useRoute } from '@react-navigation/native'
import { AuthStackParamList, Route } from 'src/app/types.ts'
import { goToAuthSetupDetailsScreen } from 'shared/navigation/authStack.ts'
import { useNavigationTyped } from 'shared/navigation'

const OTPVerificationScreen = () => {
  const { verifyOtp } = useFirebaseLogin({ auth, firebaseConfig })

  // @ts-ignore
  const otpCodeId = useRoute<AuthStackParamList[Route.OTPVerificationScreen]>().params.otpCode

  const navigation = useNavigationTyped()
  const [isWrongCode, setWrongCode] = useState(false)
  const [userOtpCode, setOtpCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { time, stopped } = useTimer({ minutes: 3, autoRefresh: true, stoppedText: 'Час вичерпано.' })

  const onClickContinue = () => {
    setIsLoading(() => true)
    ;(async () => {
      try {
        await verifyOtp(userOtpCode, otpCodeId)
        goToAuthSetupDetailsScreen(navigation)
      } catch (e) {
        console.log(e)
        setWrongCode(true)
      } finally {
        setIsLoading(false)
      }
    })()
  }

  return (
    <View style={styles.root}>
      {isLoading && <LoadingFullScreen />}
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
            autoFocus
            onFilled={() => onClickContinue()}
          />
          <GradientButtonFill disabled={stopped} onPress={onClickContinue}>
            Перевірити
          </GradientButtonFill>
          <Text style={styles.footerText}>
            {!stopped && 'Термін коду закінчиться через'} {time}
          </Text>
        </View>
      </KeyboardAvoidingView>
    </View>
  )
}
export default OTPVerificationScreen
