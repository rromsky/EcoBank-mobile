import { Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import React from 'react'
import { useAppDispatch, useAppSelector, User, userUpdateFavouriteList } from 'shared/store'
import { ItemType } from 'src/processes/market/screens/types.ts'
import { gatewayUpdateUserFavourite } from 'shared/lib/api'
import { windowWidth } from 'shared/types'
import { LineDecorator } from 'shared/components'
import { useNavigationTyped } from 'shared/navigation'
import { Route } from 'src/app/types.ts'
import FastImage from 'react-native-fast-image'

import styles from './styles'

const ItemComponent = ({ item, isLoading }: { item: ItemType; isLoading: boolean }) => {
  const user: User = useAppSelector((state) => state.user.user)
  const favoriteList: string[] = useAppSelector((state) => state.user.user?.marketData?.favouriteItems)
  const isFavorite = favoriteList?.includes(item.code)

  const dispatch = useAppDispatch()
  const navigation = useNavigationTyped()

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
        navigation.navigate(Route.ItemDetailsScreen, { item })
        // Navigate to details
      }}
    >
      <View style={styles.root}>
        <FastImage source={{ uri: item.photoURL }} resizeMode={FastImage.resizeMode.contain} style={styles.image} />
        {!isLoading && (
          <TouchableOpacity onPress={handleFavoriteClick} style={styles.content}>
            <Icon name={isFavorite ? 'heart' : 'heart-o'} style={styles.icon} color={'#fff'} size={20} />
          </TouchableOpacity>
        )}

        <View style={{ gap: 8, height: 82 }}>
          <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.title}>
            {item.title}
          </Text>
          <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.description}>
            {item.shortDescription}
          </Text>
          <LineDecorator />
          <Text style={styles.price}>₴{item.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default React.memo(ItemComponent)
