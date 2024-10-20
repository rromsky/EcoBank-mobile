import { NavigatorScreenParams } from '@react-navigation/native'
import { ItemType } from 'src/processes/market/screens/types.ts'

export enum Route {
  AuthStack = 'AuthStack',
  RootStack = 'RootStack',
  MarketStack = 'MarketStack',
  StockMarketStack = 'StockMarketStack',
  SettingsScreen = 'SettingsScreen',

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
  LearningScreen = 'LearningScreen',
  StockDetailsScreen = 'StockDetailsScreen',
  StockMarketScreen = 'StockMarketScreen',
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

export type ProductStackParamList = {
  [Route.HomeScreen]: undefined
  [Route.StockMarketScreen]: undefined
  [Route.StockDetailsScreen]: {
    stock: any // TODO: define stock type
  }
  [Route.LearningScreen]: undefined
  [Route.SettingsScreen]: undefined
}

// export type StockMarketStackParamList = {
//   [Route.StockDetailsScreen]: {
//     stock: any // TODO: define stock type
//   }
// }

export type RootStackParamList = {
  [Route.AuthStack]: NavigatorScreenParams<AuthStackParamList>
  [Route.MarketStack]: NavigatorScreenParams<ProductStackParamList>
  // [Route.StockMarketStack]: NavigatorScreenParams<StockMarketStackParamList>
  [Route.ItemDetailsScreen]: {
    item: ItemType // TODO: define item type
  }
  [Route.CartScreen]: undefined
}
