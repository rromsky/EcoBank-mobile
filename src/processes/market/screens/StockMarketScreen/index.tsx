import { FlatList, RefreshControl, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useCallback } from 'react'
import { useAppSelector } from 'shared/store'
import { useInfiniteScroll } from 'shared/hooks/useInfiniteScroll.tsx'
import { OpenCartButton } from 'src/processes/market/screens/HomeScreen/components/OpenCartButton'
import { BottomGradient } from 'shared/components/BottomGradient'
import ItemComponent from 'src/processes/market/screens/HomeScreen/components/ItemComponent'
import { ItemType } from 'src/processes/market/screens/types.ts'
import { SearchBar } from 'src/processes/market/screens/HomeScreen/components/SearchBar'
import { useMarketItems } from 'shared/hooks/useMarketItems.ts'

const HomeScreen = () => {
  const { isLoading, filteredItems, refetchItems, setSearchString, searchString } = useMarketItems()
  const isButtonShown = useAppSelector((state) => state.cart.isButtonShown)

  const { displayedItems, fetchNextPage, ListEndLoader } = useInfiniteScroll({
    items: filteredItems,
    step: 6,
  })

  const renderItem = useCallback(
    ({ item }: { item: ItemType }) => {
      return <ItemComponent isLoading={isLoading} item={item} />
    },
    [isLoading]
  )

  const { bottom } = useSafeAreaInsets()
  return (
    <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <SearchBar searchString={searchString} onChangeText={setSearchString} />
      <FlatList
        refreshControl={
          <RefreshControl style={{ backgroundColor: '#EFEEEEDD' }} refreshing={isLoading} onRefresh={refetchItems} />
        }
        contentContainerStyle={{
          gap: 12,
          paddingBottom: bottom + isButtonShown ? 32 * 3.5 : 0,
        }}
        data={displayedItems}
        onEndReachedThreshold={0.8}
        // @ts-ignore
        ListFooterComponent={ListEndLoader}
        onEndReached={fetchNextPage}
        renderItem={renderItem}
        numColumns={2}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={10}
        updateCellsBatchingPeriod={100}
      />
      <BottomGradient />
      <OpenCartButton />
    </View>
  )
}

export default HomeScreen
