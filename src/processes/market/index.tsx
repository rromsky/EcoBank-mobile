import { ProductStackParamList, Route } from 'src/app/types.ts'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from 'src/processes/market/screens/HomeScreen'
import { theme } from 'theme'
import {
  CatalogIcon,
  CustomTabButton,
  CustomTabLabel,
  HomeIcon,
  ProfileIcon,
} from 'src/processes/market/components/CustomTabBar'

const MarketStack = createBottomTabNavigator<ProductStackParamList>()

const noHeader = { headerShown: false }

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
          tabBarLabel: (props) => <CustomTabLabel name={'Новини'} {...props} />,
          tabBarButton: CustomTabButton,
          tabBarIcon: (props) => <CatalogIcon isActive={props.focused} {...props} />,
        }}
        name={Route.StockHomeScreen}
        component={HomeScreen}
      />
      <MarketStack.Screen
        options={{
          tabBarLabel: (props) => <CustomTabLabel name={'Профіль'} {...props} />,
          tabBarButton: CustomTabButton,
          tabBarIcon: (props) => <ProfileIcon isActive={props.focused} {...props} />,
        }}
        name={Route.SettingsScreen}
        component={HomeScreen}
      />
    </MarketStack.Navigator>
  )
}
