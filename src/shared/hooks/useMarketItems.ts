import { useEffect, useMemo, useState } from 'react'
import { ItemType } from 'src/processes/market/screens/types.ts'
import { loadMarketItems } from 'shared/lib/api'

export const useMarketItems = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [items, setItems] = useState<ItemType[]>([])
  const [searchString, setSearchString] = useState('')

  const filteredItems = useMemo(() => {
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(searchString.toLowerCase()) ||
        item.shortDescription.toLowerCase().includes(searchString.toLowerCase()) ||
        item.description.includes(searchString)
    )
  }, [searchString, items])

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
