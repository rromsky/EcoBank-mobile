import { Image, KeyboardAvoidingView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useNavigationTyped } from 'shared/navigation'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import OnboardingImage from 'assets/loginOnboardingImage.png'
import GradientButtonFill from 'shared/components/GradientButtonFill'

import styles from './styles'
import React from 'react'
import { goToAuthLoginScreen, goToAuthRegisterScreen } from 'shared/navigation/authStack.ts'

export default function WelcomeScreen() {
  const navigation = useNavigationTyped()
  const { top, bottom } = useSafeAreaInsets()

  const onRegisterPress = () => {
    goToAuthRegisterScreen(navigation)
  }

  const onLoginPress = () => {
    goToAuthLoginScreen(navigation)
  }

  return (
    <ScrollView>
      <KeyboardAvoidingView
        keyboardVerticalOffset={100}
        behavior={'position'}
        style={[
          styles.root,
          {
            paddingTop: top,
            paddingBottom: bottom,
          },
        ]}
      >
        <Image source={OnboardingImage} style={styles.image} />
        <View style={styles.contentContainer}>
          <View style={styles.gap}>
            <Text style={styles.title}>Твій провідник у світ інвестування!</Text>
            <Text style={styles.description}>
              Інвестуй разом з нами, обравши акції або довірся провідним фахівцям EcoBank'у, та примножуй свої гроші
              прямо зараз!
            </Text>
          </View>
          <View style={[styles.gap, styles.bottomContent]}>
            <GradientButtonFill onPress={onRegisterPress}>Зареєструватись</GradientButtonFill>
            <View style={[styles.gap, styles.row]}>
              <Text style={styles.description}>Вже є акаунт?</Text>
              <TouchableOpacity onPress={onLoginPress}>
                <Text style={styles.footerLink}>Ввійти в існуючий.</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  )
}
