import { useState } from 'react'
import { ActivityIndicator, Text } from 'react-native'
import { wait } from 'shared/types'

export const useInfiniteScroll = ({
  items,
  step = 1,
  initialPage = 1,
  noItemsLabel = 'Всі товари переглянуто.',
}: any) => {
  const [pageNumber, setPageNumber] = useState<number>(initialPage)
  const [isNewItemsLoading, setIsNewItemsLoading] = useState(false)
  const [isLastPage, setIsLastPage] = useState(false)

  const fetchNextPage = async () => {
    setIsNewItemsLoading(true)
    await wait(900)
    if (!items.length) return
    if (items?.length < pageNumber * step) {
      setIsLastPage(true)
      setPageNumber((prev) => prev + 1)
      return
    }
    setPageNumber((prev) => prev + 1)
    setIsNewItemsLoading(false)
  }

  const ListEndLoader = () => {
    if (!isLastPage) {
      if (isNewItemsLoading) {
        return <ActivityIndicator size={'large'} />
      }
    } else {
      return <Text style={{ alignSelf: 'center' }}>{noItemsLabel}</Text>
    }
  }

  return {
    displayedItems: (items?.length ? [...items] : []).slice(0, pageNumber * step),
    fetchNextPage,
    ListEndLoader,
  }
}
