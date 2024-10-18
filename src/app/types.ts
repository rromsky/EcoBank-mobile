import { NavigatorScreenParams } from '@react-navigation/native'
import { ItemType } from 'src/processes/market/screens/types.ts'

export enum Route {
  AuthStack = 'AuthStack',
  RootStack = 'RootStack',
  MarketStack = 'MarketStack',
  StockMarketStack = 'StockMarketStack',

  RegisterScreen = 'RegisterScreen',
  LoginScreen = 'LoginScreen',
  OnboardingScreen = 'OnboardingScreen',
  OTPVerificationScreen = 'OTPVerificationScreen',
  WelcomeScreen = 'WelcomeScreen',
  ResetPasswordScreen = 'ResetPasswordScreen',
  SetupDetailsScreen = 'SetupDetailsScreen',

  HomeScreen = 'HomeScreen',
  CartScreen = 'CartScreen',
  ItemDetailsScreen = 'ItemDetailsScreen',
  PaymentScreen = 'PaymentScreen',

  StockDetailsScreen = 'StockDetailsScreen',
  StockHomeScreen = 'StockHomeScreen',
}

export type AuthStackParamList = {
  [Route.RegisterScreen]: undefined
  [Route.LoginScreen]: undefined
  [Route.OnboardingScreen]: undefined
  [Route.WelcomeScreen]: undefined
  [Route.ResetPasswordScreen]: undefined
  [Route.SetupDetailsScreen]: undefined
  [Route.OTPVerificationScreen]: {
    otpCode: string
  }
}

export type MarketStackParamList = {
  [Route.HomeScreen]: undefined
  [Route.CartScreen]: undefined
  [Route.ItemDetailsScreen]: {
    item: ItemType // TODO: define item type
  }
  [Route.PaymentScreen]: undefined
}

export type StockMarketStackParamList = {
  [Route.StockDetailsScreen]: {
    stock: any // TODO: define stock type
  }
  [Route.StockHomeScreen]: undefined
}

export type RootStackParamList = {
  [Route.AuthStack]: NavigatorScreenParams<AuthStackParamList>
  [Route.MarketStack]: NavigatorScreenParams<MarketStackParamList>
  [Route.StockMarketStack]: NavigatorScreenParams<StockMarketStackParamList>
}
