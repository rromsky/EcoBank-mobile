import { NavigatorScreenParams } from '@react-navigation/native'

export enum Route {
  AuthStack = 'AuthStack',
  RootStack = 'RootStack',
  MarketStack = 'MarketStack',
  StockMarketStack = 'StockMarketStack',

  RegisterScreen = 'RegisterScreen',
  LoginScreen = 'LoginScreen',
  OnboardingScreen = 'OnboardingScreen',
  WelcomeScreen = 'WelcomeScreen',
  ResetPasswordScreen = 'ResetPasswordScreen',

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
  [Route.ResetPasswordScreen]: {
    phoneNumber?: string
  }
}

export type MarketStackParamList = {
  [Route.HomeScreen]: undefined
  [Route.CartScreen]: undefined
  [Route.ItemDetailsScreen]: {
    item: any // TODO: define item type
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
} & AuthStackParamList &
  MarketStackParamList &
  StockMarketStackParamList
