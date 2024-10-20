import { useEffect, useMemo, useState } from 'react'
import { ItemType } from 'src/processes/market/screens/types.ts'
import { loadMarketItems } from 'shared/lib/api'

export const useMarketItems = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [items, setItems] = useState<ItemType[]>([])
  const { filteredItems, searchString, setSearchString } = useSearch(items)
  const refetchItems = () => {
    setIsLoading(true)
    loadMarketItems().then((items) => {
      setItems(items)
    })
    // fetch items
    setIsLoading(false)
  }

  useEffect(() => {
    ;(async () => {
      const loadedItems = await loadMarketItems()
      setItems(loadedItems)
      setIsLoading(false)
    })()
  }, [])
  return {
    isLoading,
    items,
    filteredItems,
    refetchItems,
    setSearchString,
    searchString,
  }
}

export const useSearch = (items: any) => {
  const [searchString, setSearchString] = useState('')

  const filteredItems = useMemo(() => {
    return !searchString
      ? items
      : items?.filter(
          (item: any) =>
            item?.stock_exchange?.name.toLowerCase().includes(searchString.toLowerCase()) ||
            item?.title.toLowerCase().includes(searchString.toLowerCase()) ||
            item?.shortDescription.toLowerCase().includes(searchString.toLowerCase()) ||
            item?.description.includes(searchString)
        )
  }, [searchString, items])
  return {
    filteredItems,
    searchString,
    setSearchString,
  }
}
