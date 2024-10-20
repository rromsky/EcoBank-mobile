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
import { windowWidth } from 'shared/types'
import { LineChart } from 'react-native-chart-kit'
import { useStockChartData } from 'shared/hooks/useStocksData.ts'
import LoadingFullScreen from 'shared/components/LoadingFullScreen'

export const AchiveContainer = ({ label, value }: { label: string; value: string }) => {
  return (
    <View style={styles.achiveContainer}>
      <Text style={{ fontSize: 16 }}>{label}</Text>
      <Text style={styles.smallItemStatus}>{value}</Text>
    </View>
  )
}
const ItemDetailsScreen = () => {
  // @ts-ignore
  const item = useRoute<RootStackParamList[Route.StockDetailsScreen]>().params.item
  const { isLoading, stocksDetails: itemData } = useStockChartData(item.symbol)
  const dispatch = useAppDispatch()
  const navigation = useNavigationTyped()
  console.log(itemData)
  return (
    <SafeAreaView style={styles.root}>
      {isLoading && <LoadingFullScreen />}
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.imageContainer}>
          <LineChart
            data={{
              labels: itemData?.map((el, i) => {
                const numberOfHours = Math.floor(i / 4)
                let result = ''
                if (!!numberOfHours) {
                  result += `${numberOfHours}h `
                }
                result += `${(i % 4) * 15}m`
                return result
              }) || ['Loading'],
              datasets: [
                {
                  data: itemData?.map((el) => {
                    return el.last
                  }) || [0],
                },
              ],
            }}
            width={windowWidth} // from react-native
            height={240}
            yAxisLabel='$'
            yAxisSuffix='k'
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: '#82e39d',
              backgroundGradientFrom: '#19732d',
              backgroundGradientTo: '#19b845',
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 4,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#ffa726',
              },
            }}
            bezier
            style={{
              backgroundColor: '#19732d',
              marginVertical: 8,
              paddingHorizontal: 4,
            }}
          />
        </View>
        <View>
          <Text style={styles.title} numberOfLines={5} ellipsizeMode={'tail'}>
            {item.name}
          </Text>
          <View style={styles.labelsContainer}>
            <AchiveContainer label={'LOW: '} value={`${itemData?.[0].low} $`} />
            <AchiveContainer label={'HIGH: '} value={`${itemData?.at(-1)?.low} $`} />
          </View>
          <View style={styles.labelsContainer}>
            <AchiveContainer label={'Open: '} value={`${itemData?.[0].open} $`} />
            <AchiveContainer label={'CLOSE: '} value={`${itemData?.at(-1)?.close} $`} />
          </View>
        </View>
      </ScrollView>
      <View style={styles.contentContainer}>
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
    </SafeAreaView>
  )
}

export default React.memo(ItemDetailsScreen)
