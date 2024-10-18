import { useEffect, useState } from 'react'
import { ItemType } from 'src/processes/market/screens/types.ts'
import { loadMarketItemById } from 'shared/lib/api'

export const useGetItemDetails = (itemCode: string) => {
  const [isLoading, setIsLoading] = useState(true)
  const [item, setItem] = useState<ItemType | null>(null)

  useEffect(() => {
    ;(async () => {
      const loadedItem = await loadMarketItemById(itemCode)
      if (loadedItem) {
        setItem(loadedItem)
      }
      setIsLoading(false)
    })()
  }, [])
  return {
    isLoading,
    item,
  }
}
