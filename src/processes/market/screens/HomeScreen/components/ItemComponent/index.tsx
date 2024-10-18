import { Image, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import React from 'react'
import { useAppDispatch, useAppSelector, User, userUpdateFavouriteList } from 'shared/store'
import { ItemType } from 'src/processes/market/screens/types.ts'
import { gatewayUpdateUserFavourite } from 'shared/lib/api'
import { windowWidth } from 'shared/types'
import { LineDecorator } from 'shared/components'

const ItemComponent = ({ item, isLoading }: { item: ItemType; isLoading: boolean }) => {
  const user: User = useAppSelector((state) => state.user.user)
  const favoriteList: string[] = useAppSelector((state) => state.user.user?.marketData?.favouriteItems)
  const isFavorite = favoriteList?.includes(item.code)

  const dispatch = useAppDispatch()

  const handleFavoriteClick = () => {
    const newList = isFavorite
      ? user.marketData.favouriteItems.filter((listItem) => listItem !== item.code) || []
      : [...favoriteList, item.code]

    dispatch(userUpdateFavouriteList(newList))
    gatewayUpdateUserFavourite(newList)
  }
  return (
    <TouchableOpacity
      style={{ marginHorizontal: 8 }}
      onPress={() => {
        // Navigate to details
      }}
    >
      <View
        style={{
          borderRadius: 10,
          backgroundColor: '#fff',
          width: (windowWidth - 16 * 3) / 2,
          alignItems: 'center',
          padding: 4,
          paddingBottom: 14,
          justifyContent: 'center',
          gap: 8,
        }}
      >
        <Image
          source={{ uri: item.photoURL }}
          style={{
            width: (windowWidth - 24 * 3) / 2,
            height: (windowWidth - 32 * 3) / 2 / 1.5,
            resizeMode: 'contain',
            borderRadius: 10,
          }}
        />
        {!isLoading && (
          <TouchableOpacity
            onPress={handleFavoriteClick}
            style={{
              position: 'absolute',
              zIndex: 4,
              top: 5,
              left: 5,
              borderRadius: 50,
              overflow: 'hidden',
            }}
          >
            <Icon
              name={isFavorite ? 'heart' : 'heart-o'}
              style={{
                zIndex: 4,
                borderRadius: 50,
                padding: 4,
                backgroundColor: '#04b108',
              }}
              color={'#fff'}
              size={20}
            />
          </TouchableOpacity>
        )}

        <View style={{ gap: 8, height: 82 }}>
          <Text
            numberOfLines={1}
            ellipsizeMode={'tail'}
            style={{
              fontFamily: 'Manrope-SemiBold',
              color: '#141314',
              maxWidth: '85%',
              fontSize: 16,
            }}
          >
            {item.title}
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
            {item.shortDescription}
          </Text>
          <LineDecorator />
          <Text
            style={{
              fontSize: 16,
              color: '#141314',
              fontFamily: 'Manrope-Bold',
            }}
          >
            ₴{item.price}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default React.memo(ItemComponent)
