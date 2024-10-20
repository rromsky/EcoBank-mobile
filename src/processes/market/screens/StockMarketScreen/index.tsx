import { ActivityIndicator, FlatList, RefreshControl, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import React, { useCallback } from 'react'
import { OpenCartButton } from './components/OpenCartButton'
import { BottomGradient } from 'shared/components/BottomGradient'
import ItemComponent from './components/ItemComponent'
import { SearchBar } from './components/SearchBar'
import { StockData, useStocksData } from 'shared/hooks/useStocksData.ts'
import { useSearch } from 'shared/hooks/useMarketItems.ts'
import LoadingFullScreen from 'shared/components/LoadingFullScreen'
import { theme } from 'theme'
import HorizontalItemComponent from 'src/processes/market/screens/StockMarketScreen/components/HorizontalItemComponent'

const ListEndLoader = ({ isLoading }: { isLoading: boolean }) => {
  if (isLoading) {
    return <ActivityIndicator size={'large'} />
  }
  return <></>
}

const RecomendedList = () => {
  return (
    <View>
      <View>
        <Text style={{ fontSize: 22, fontFamily: 'Manrope-Bold', marginLeft: 24 }}>Recomended</Text>
        <Text style={{ fontSize: 12, fontFamily: 'Manrope', color: theme.base40, marginLeft: 24 }}>AI Powered</Text>
      </View>
      <HorizontalItemComponent />

      <Text style={{ fontSize: 22, fontFamily: 'Manrope-Bold', marginLeft: 24, paddingTop: 14 }}>Popular</Text>
    </View>
  )
}

const StockMarketScreen = () => {
  const { stocks, refetchItems, isLoading, loadMore, error } = useStocksData()
  const { filteredItems, setSearchString, searchString } = useSearch(stocks)

  const renderItem = useCallback(
    ({ item }: { item: StockData }) => {
      return <ItemComponent isLoading={isLoading} item={item} />
    },
    [isLoading]
  )
  const RenderListLoader = useCallback(() => {
    return <ListEndLoader isLoading />
  }, [isLoading])
  const { bottom } = useSafeAreaInsets()

  return (
    <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
      {isLoading && <LoadingFullScreen />}
      <SearchBar searchString={searchString} onChangeText={setSearchString} />
      <FlatList
        refreshControl={
          <RefreshControl style={{ backgroundColor: '#EFEEEEDD' }} refreshing={false} onRefresh={refetchItems} />
        }
        contentContainerStyle={{
          paddingTop: 12,
          gap: 12,
          paddingBottom: bottom,
        }}
        data={filteredItems}
        onEndReachedThreshold={0.8}
        // @ts-ignore
        ListFooterComponent={RenderListLoader}
        ListHeaderComponent={RecomendedList}
        onEndReached={loadMore}
        renderItem={renderItem}
        numColumns={1}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={10}
        updateCellsBatchingPeriod={100}
      />
      <BottomGradient />
    </View>
  )
  return <></>
}
export default React.memo(StockMarketScreen)
