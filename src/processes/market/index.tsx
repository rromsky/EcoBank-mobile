import { ProductStackParamList, Route } from 'src/app/types.ts'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import HomeScreen from './screens/HomeScreen'
import SettingsScreen from './screens/SettingsScreen'

import { theme } from 'theme'
import {
  CatalogIcon,
  ChartIcon,
  CustomTabButton,
  CustomTabLabel,
  HomeIcon,
  ProfileIcon,
} from 'src/processes/market/components/CustomTabBar'
import LearningScreen from 'src/processes/market/screens/LearningScreen'
import StockMarketScreen from 'src/processes/market/screens/StockMarketScreen'

const MarketStack = createBottomTabNavigator<ProductStackParamList>()

export const screenOptions = {
  headerShown: false,
  tabBarShowLabel: true,
  headerTitleAlign: 'center',
  tabBarActiveTintColor: theme.green,
  tabBarInactiveTintColor: 'rgba(22,80,0,0.5)',
  tabBarLabelStyle: {
    fontSize: 14,
  },

  tabBarStyle: {
    height: 90,
    backgroundColor: theme.white,
    borderTopColor: theme.white,
    alignItems: 'center',
    borderTopWidth: 0,
  },
}

export default function MarketFlow() {
  return (
    <MarketStack.Navigator screenOptions={screenOptions as any} initialRouteName={Route.HomeScreen}>
      <MarketStack.Screen
        options={{
          tabBarLabel: (props) => <CustomTabLabel name={'Головна'} {...props} />,
          tabBarButton: CustomTabButton,
          tabBarIcon: (props) => <HomeIcon isActive={props.focused} {...props} />,
        }}
        name={Route.HomeScreen}
        component={HomeScreen}
      />
      <MarketStack.Screen
        options={{
          tabBarLabel: (props) => <CustomTabLabel name={'Інвестиції'} {...props} />,
          tabBarButton: CustomTabButton,
          tabBarIcon: (props) => <ChartIcon isActive={props.focused} {...props} />,
        }}
        name={Route.StockMarketScreen}
        component={StockMarketScreen}
      />
      <MarketStack.Screen
        options={{
          tabBarLabel: (props) => <CustomTabLabel name={'Навчання'} {...props} />,
          tabBarButton: CustomTabButton,
          tabBarIcon: (props) => <CatalogIcon isActive={props.focused} {...props} />,
        }}
        name={Route.LearningScreen}
        component={LearningScreen}
      />
      <MarketStack.Screen
        options={{
          tabBarLabel: (props) => <CustomTabLabel name={'Профіль'} {...props} />,
          tabBarButton: CustomTabButton,
          tabBarIcon: (props) => <ProfileIcon isActive={props.focused} {...props} />,
        }}
        name={Route.SettingsScreen}
        component={SettingsScreen}
      />
    </MarketStack.Navigator>
  )
}
