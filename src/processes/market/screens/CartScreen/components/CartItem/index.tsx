import { Image, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { ItemType } from 'src/processes/market/screens/types'
import { Route } from 'src/app/types'
import Icon from 'react-native-vector-icons/FontAwesome'
import { cartRemoveItem, useAppDispatch } from 'shared/store'

export const CartItem = ({ item }: { item: ItemType }) => {
  const dispatch = useAppDispatch()
  const navigation = useNavigation()
  return (
    item && (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(Route.ItemDetailsScreen as never, { item } as never)
        }}
      >
        <View
          style={{
            borderRadius: 10,
            flexDirection: 'row',
            padding: 4,
            backgroundColor: '#fff',
            gap: 8,
            marginBottom: 8,
          }}
        >
          <Image
            source={{ uri: item?.photoURL }}
            style={{
              width: 144,
              height: 144,
              resizeMode: 'contain',
              borderRadius: 10,
            }}
          />
          <View
            style={{
              paddingVertical: 4,
              paddingRight: 24,
              gap: 4,
              flexGrow: 1,
              justifyContent: 'space-between',
            }}
          >
            <View>
              <Text
                numberOfLines={2}
                ellipsizeMode={'tail'}
                style={{
                  fontFamily: 'Manrope-SemiBold',
                  color: '#141314',
                  maxWidth: '75%',
                  fontSize: 16,
                }}
              >
                {item.title}
              </Text>
              <Text
                style={{
                  fontFamily: 'Manrope-SemiBold',
                  color: '#141314',
                  maxWidth: '75%',
                  fontSize: 14,
                }}
                numberOfLines={3}
              >
                {item ? item?.description : ''}
              </Text>
            </View>
            <Text
              numberOfLines={3}
              ellipsizeMode={'tail'}
              style={{
                fontSize: 15,
                color: '#141314',
                fontFamily: 'Manrope',
              }}
            >
              ₴{item ? item?.price : ''} / місяць
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            dispatch(cartRemoveItem(item.code))
          }}
          style={{
            borderRadius: 50,
            position: 'absolute',
            right: 20,
            padding: 6,
          }}
        >
          <Icon name={'close'} />
        </TouchableOpacity>
      </TouchableOpacity>
    )
  )
}
