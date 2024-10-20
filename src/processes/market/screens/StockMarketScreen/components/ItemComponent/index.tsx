import { Image, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import React from 'react'
import { useAppDispatch, useAppSelector, User, userUpdateFavouriteList } from 'shared/store'
import { ItemType } from 'src/processes/market/screens/types.ts'
import { gatewayUpdateUserFavourite } from 'shared/lib/api'
import { windowWidth } from 'shared/types'
import { LineDecorator } from 'shared/components'
import { useNavigationTyped } from 'shared/navigation'
import { Route } from 'src/app/types.ts'
import { StockData } from 'shared/hooks/useStocksData.ts'
import { theme } from 'theme'

const ItemComponent = ({ item, isLoading }: { item: StockData; isLoading: boolean }) => {
  const navigation = useNavigationTyped()

  return (
    <TouchableOpacity
      style={{ alignItems: 'center', justifyContent: 'center', marginHorizontal: 12 }}
      onPress={() => {
        navigation.navigate(Route.StockDetailsScreen as any, { item })
      }}
    >
      <View
        style={{
          borderRadius: 10,
          backgroundColor: theme.base10,
          width: '100%',
          height: 82,
          alignItems: 'center',
          padding: 4,
          paddingBottom: 14,
          justifyContent: 'center',
          flexDirection: 'row',
          gap: 12,
        }}
      >
        <Text style={{ fontFamily: 'Manrope-Bold', fontSize: 24 }} adjustsFontSizeToFit numberOfLines={1}>
          {item?.symbol}
        </Text>
        <LineDecorator vertical width={64} />

        <View style={{ gap: 2, height: 82, justifyContent: 'center' }}>
          <Text
            numberOfLines={1}
            style={{
              fontFamily: 'Manrope-SemiBold',
              color: '#141314',
              maxWidth: '60%',
              fontSize: 16,
            }}
            adjustsFontSizeToFit
          >
            {item.name}
          </Text>
          <Text
            numberOfLines={1}
            ellipsizeMode={'tail'}
            style={{
              fontFamily: 'Manrope-Regular',
              color: '#141314',
              maxWidth: '85%',
              fontSize: 12,
            }}
          >
            {item.stock_exchange.website}
          </Text>
          <LineDecorator width={windowWidth / 2} />
          <Text
            style={{
              fontSize: 16,
              color: '#141314',
              fontFamily: 'Manrope-Bold',
              maxWidth: '65%',
            }}
            adjustsFontSizeToFit
            numberOfLines={1}
          >
            Description is not provided in free API's.
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default React.memo(ItemComponent)
