import { windowHeight, windowWidth } from 'shared/types'
import { SafeAreaView } from 'moti'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Stars from 'shared/components/Star'
import GradientButtonFill from 'shared/components/GradientButtonFill'
import { useRoute } from '@react-navigation/native'
import { RootStackParamList, Route } from 'src/app/types.ts'
import { cartAddItem, useAppDispatch } from 'shared/store'
import { useNavigationTyped } from 'shared/navigation'
const cartStyle = StyleSheet.create({
  container: {
    marginTop: 15,
    paddingVertical: 10,
    backgroundColor: '#f3f3f3',
  },
  header: {
    paddingHorizontal: 18,
    fontSize: 32,
    fontWeight: '400',
    paddingBottom: 12,
  },
  subHeader: {
    paddingHorizontal: 18,
    fontSize: 28,
    fontWeight: '400',
    paddingBottom: 12,
    color: '#3d3a3a',
  },
  smallText: {
    fontSize: 16,
  },
  smallItemStatus: {
    color: '#0f839d',
    fontSize: 16,
  },
  image: {
    minWidth: 170,
    minHeight: 170,
    width: windowWidth * 0.9,
    height: windowWidth * 0.85 < windowHeight * 0.45 ? windowWidth * 0.85 : windowHeight * 0.45,
    alignSelf: 'center',
    borderRadius: 10,
    marginBottom: 10,
    resizeMode: 'contain',
  },
})
export const AchiveContainer = ({ label, value }: { label: string; value: string }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        paddingHorizontal: 8,
        paddingVertical: 10,
        backgroundColor: '#eaeaea',
        borderRadius: 12,
        marginVertical: 6,
        maxWidth: 188,
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text style={cartStyle.smallText}>{label}</Text>
      <Text style={cartStyle.smallItemStatus}>{value}</Text>
    </View>
  )
}

export default React.memo(() => {
  // @ts-ignore
  const item = useRoute<RootStackParamList[Route.ItemDetailsScreen]>().params.item

  const dispatch = useAppDispatch()
  const navigation = useNavigationTyped()

  return (
    <SafeAreaView style={{ alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}>
      <ScrollView
        contentContainerStyle={{
          marginTop: 64,
          marginBottom: 12,
          width: windowWidth,
          paddingBottom: 120,
          gap: 18,
        }}
      >
        <View style={{ position: 'relative', alignSelf: 'center', width: windowWidth * 0.9 }}>
          <Image source={{ uri: item.photoURL }} style={cartStyle.image} />
          <View
            style={{
              position: 'absolute',
              backgroundColor: '#333',
              borderRadius: 10,
              padding: 1,
              bottom: 20,
              left: 5,
            }}
          >
            <Stars rate={4} />
          </View>
        </View>
        <View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <AchiveContainer label={'Категорія: '} value={'Нумізматика'} />
            <AchiveContainer label={'Реалізація: '} value={'24.02.2024'} />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <AchiveContainer label={'Художник: '} value={'М.А. Зур'} />
            <AchiveContainer label={'Ціна: '} value={`${item.price}$`} />
          </View>
        </View>

        <Text
          style={{ ...cartStyle.smallText, alignSelf: 'center', marginVertical: 12 }}
          numberOfLines={5}
          ellipsizeMode={'tail'}
        >
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
      </ScrollView>
    </SafeAreaView>
  )
})
