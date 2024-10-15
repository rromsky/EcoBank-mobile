import {
  createNavigationContainerRef,
  NavigationContainerRef,
  StackActions,
  useNavigation,
} from '@react-navigation/native'
import { AuthStackParamList, RootStackParamList, Route } from 'src/app/types.ts'
import { StackNavigationProp } from '@react-navigation/stack'

type NavigationProps<T extends keyof RootStackParamList> = T extends unknown
  ? undefined extends RootStackParamList[T]
    ? [screen: T] | [screen: T, args: RootStackParamList[T]]
    : [screen: T, args: RootStackParamList[T]]
  : never

type ModalsPending = {
  name: string
  params: any
}

class NavigationReferenceService {
  private navigationRef = createNavigationContainerRef<RootStackParamList>()

  private modalsPending: ModalsPending[] = []

  setRef(ref: NavigationContainerRef<RootStackParamList> | null) {
    this.navigationRef.current = ref
  }

  getCurrentRoute() {
    return this.navigationRef.current?.getCurrentRoute()
  }

  navigate<RouteName extends keyof RootStackParamList>(...args: NavigationProps<RouteName>) {
    this.navigationRef.current?.navigate(...args)
  }

  goBack() {
    this.navigationRef.current?.goBack()
  }

  isModalOpen() {
    return !!this.getCurrentRoute()?.name?.includes('Modal')
  }

  isModalPendingByName(RouteName: string) {
    return this.modalsPending.some((modal) => modal.name === RouteName)
  }
  openModal<RouteName extends keyof RootStackParamList>(...args: NavigationProps<RouteName>) {
    const currentRoute = this.getCurrentRoute()?.name
    const [modalName, params] = args

    if (!currentRoute) {
      this.modalsPending.push({ name: modalName, params })
      return
    }
    if (this.isModalPendingByName(modalName)) {
      return
    }
    if (this.isModalOpen()) {
      this.modalsPending.push({ name: modalName, params })
      return
    }

    this.navigationRef.current?.dispatch(StackActions.push(modalName, params))
  }

  closeModal() {
    if (this.isModalOpen()) this.navigationRef.current?.goBack()
  }

  clearPendingModals() {
    this.modalsPending = []
  }

  screenChange(prevScreen?: string, currentScreen?: string) {
    if (prevScreen?.includes('Modal')) {
      const nextModal = this.modalsPending.shift()

      if (nextModal) {
        // @ts-ignore
        this.openModal(nextModal.name, nextModal.params)
      }
    }
  }
}

export const NavigationRef = new NavigationReferenceService()

export enum NavigatorTypes {
  AuthStack = 'AuthStack',
  RootStack = 'RootStack',
  MarketStack = 'MarketStack',
  StockMarketStack = 'StockMarketStack',
  Drawer = 'Drawer',
  BottomTabs = 'BottomTabs',
}

export type AuthStackNavigatorProps = StackNavigationProp<AuthStackParamList, keyof AuthStackParamList>

export type HomeRootStackNavigationProps = StackNavigationProp<RootStackParamList, keyof RootStackParamList>

export type NavigationType = AuthStackNavigatorProps & HomeRootStackNavigationProps

export const useNavigationTyped = () => useNavigation<NavigationType>()

export type NavigationMethod = 'navigate' | 'push' | 'replace'
