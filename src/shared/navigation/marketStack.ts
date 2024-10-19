import { NavigationMethod, NavigationType } from 'shared/navigation/index.ts'
import { RootStackParamList, Route } from 'src/app/types.ts'

export const goToProductStack = (
  navigation: NavigationType,
  params?: RootStackParamList[Route.AuthStack],
  navigationMethod: NavigationMethod = 'navigate'
) => {
  ;(navigation[navigationMethod] as any)(Route.AuthStack, params)
}
