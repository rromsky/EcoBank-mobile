import { NavigationMethod, NavigationType } from 'shared/navigation/index.ts'
import { RootStackParamList, Route } from 'src/app/types.ts'

export const goToProductStack = (
  navigation: NavigationType,
  params?: RootStackParamList[Route.MarketStack],
  navigationMethod: NavigationMethod = 'navigate'
) => {
  ;(navigation[navigationMethod] as any)(Route.MarketStack, params)
}

export const goToHomeScreen = (
  navigation: NavigationType,
  params?: RootStackParamList[Route.MarketStack],
  navigationMethod: NavigationMethod = 'navigate'
) => {
  ;(navigation[navigationMethod] as any)(Route.MarketStack, params)
}
