import { SafeAreaView } from 'moti'
import { Image, ScrollView, Text, View } from 'react-native'
import React from 'react'
import Stars from 'shared/components/Star'
import GradientButtonFill from 'shared/components/GradientButtonFill'
import { useRoute } from '@react-navigation/native'
import { RootStackParamList, Route } from 'src/app/types.ts'
import { cartAddItem, useAppDispatch } from 'shared/store'
import { useNavigationTyped } from 'shared/navigation'

import styles from './styles'

export const AchiveContainer = ({ label, value }: { label: string; value: string }) => {
  return (
    <View style={styles.achiveContainer}>
      <Text style={{ fontSize: 16 }}>{label}</Text>
      <Text style={styles.smallItemStatus}>{value}</Text>
    </View>
  )
}
export default React.memo(() => {
  // @ts-ignore
  const item = useRoute<RootStackParamList[Route.ItemDetailsScreen]>().params.item

  const dispatch = useAppDispatch()
  const navigation = useNavigationTyped()

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.photoURL }} style={styles.image} />
          <View style={styles.rating}>
            <Stars rate={4} />
          </View>
        </View>
        <View>
          <View style={styles.labelsContainer}>
            <AchiveContainer label={'Категорія: '} value={'Нумізматика'} />
            <AchiveContainer label={'Реалізація: '} value={'24.02.2024'} />
          </View>
          <View style={styles.labelsContainer}>
            <AchiveContainer label={'Художник: '} value={'М.А. Зур'} />
            <AchiveContainer label={'Ціна: '} value={`${item.price}$`} />
          </View>
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.smallText} numberOfLines={5} ellipsizeMode={'tail'}>
            {item.description}
          </Text>
          <View>
            <GradientButtonFill
              onPress={() => {
                dispatch(cartAddItem(item))
                navigation.goBack()
              }}
            >
              Купити
            </GradientButtonFill>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
})
