import { useRef, useState } from 'react'
import { KeyboardAvoidingView, View } from 'react-native'

const RegisterScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'red', paddingHorizontal: 24 }}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={1}
        behavior='padding'
        style={{
          padding: 6,
          flexGrow: 1,
          flexShrink: 1,
          justifyContent: 'center',
        }}
      >
        <View style={{ gap: 40 }}>
          <View style={{ alignSelf: 'center' }}></View>
        </View>
      </KeyboardAvoidingView>
    </View>
  )
}

export default RegisterScreen
