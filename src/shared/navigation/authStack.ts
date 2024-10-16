import { AuthStackParamList, RootStackParamList, Route } from 'src/app/types.ts'
import { NavigationType } from 'shared/navigation/index.ts'
import { NavigationMethod } from './index.ts'
import { trackScreenChange } from 'shared/lib/services/tracking'

export const goToAuthStack = (
  navigation: NavigationType,
  params?: RootStackParamList[Route.AuthStack],
  navigationMethod: NavigationMethod = 'navigate'
) => {
  trackScreenChange(params?.screen || Route.AuthStack)
  ;(navigation[navigationMethod] as any)(Route.AuthStack, params)
}

export const goToAuthWelcomeScreen = (
  navigation: NavigationType,
  params?: AuthStackParamList[Route.WelcomeScreen],
  navigationMethod?: NavigationMethod
) => {
  goToAuthStack(navigation, { screen: Route.WelcomeScreen, params }, navigationMethod)
}

export const goToAuthLoginScreen = (
  navigation: NavigationType,
  params?: AuthStackParamList[Route.LoginScreen],
  navigationMethod?: NavigationMethod
) => {
  goToAuthStack(navigation, { screen: Route.LoginScreen, params }, navigationMethod)
}

export const goToAuthRegisterScreen = (
  navigation: NavigationType,
  params?: AuthStackParamList[Route.RegisterScreen],
  navigationMethod?: NavigationMethod
) => {
  goToAuthStack(navigation, { screen: Route.RegisterScreen, params }, navigationMethod)
}

export const goToAuthOTPVerificationScreen = (
  navigation: NavigationType,
  params: AuthStackParamList[Route.OTPVerificationScreen],
  navigationMethod?: NavigationMethod
) => {
  goToAuthStack(navigation, { screen: Route.OTPVerificationScreen, params }, navigationMethod)
}

export const goToAuthResetPasswordScreen = (
  navigation: NavigationType,
  params?: AuthStackParamList[Route.ResetPasswordScreen],
  navigationMethod?: NavigationMethod
) => {
  goToAuthStack(navigation, { screen: Route.ResetPasswordScreen, params }, navigationMethod)
}

export const goToAuthOnboardingScreen = (
  navigation: NavigationType,
  params?: AuthStackParamList[Route.OnboardingScreen],
  navigationMethod?: NavigationMethod
) => {
  goToAuthStack(navigation, { screen: Route.OnboardingScreen, params }, navigationMethod)
}
