import { useCallback, useEffect, useState } from 'react'

export interface StocksResponse<T> {
  pagination: {
    limit: number
    offset: number
    count: number
    total: number
  }
  data: T[]
}

export interface IntradayChartData {
  open: number
  high: number
  low: number
  last: number
  close: number
  volume: number
  date: string
  symbol: string
  exchange: string
}

export interface StockData {
  name: string
  symbol: string
  has_intraday: boolean
  has_eod: boolean
  country: string | null
  stock_exchange: {
    name: string
    acronym: string
    mic: string
    country: string
    country_code: string
    city: string
    website: string
  }
}

export function useStocksData() {
  const [isLoading, setIsLoading] = useState(true)
  const [stocks, setStocks] = useState<StockData[] | null>(null)
  const [error, setError] = useState<any>(null)

  const [page, setPage] = useState(1)

  const loadMore = useCallback(() => {
    setPage((prev) => prev + 1)
  }, [])
  const refetchItems = useCallback(() => {
    setPage(1)
  }, [])

  useEffect(() => {
    ;(async () => {
      const url = `https://api.marketstack.com/v1/tickers?access_key=54629f1b2b48254a18f69552e2cb3939&limit=${
        10 * page
      }&offset=${10 * (page - 1)}`
      const options = {
        method: 'GET',
      }

      try {
        const response = await fetch(url, options)
        const result = (await response.text()) as unknown as string // as StocksResponse<StockData>
        const res = (await JSON.parse(result)) as StocksResponse<StockData>
        if (page !== 1 && stocks) {
          console.log('APPEND', res.data.length)
          setStocks([...stocks, ...res.data])

          return
        }
        setStocks(res.data)
      } catch (error) {
        console.error(error, 'EE')
        setError(error)
      } finally {
        setIsLoading(false)
      }
    })()
  }, [page])

  return {
    stocks,
    isLoading,
    error,
    refetchItems,
    loadMore,
  }
}

export function useStockDetails(stockName: string) {
  const [isLoading, setIsLoading] = useState(true)
  const [stocksDetails, setStocks] = useState<IntradayChartData | null>(null)
  const [error, setError] = useState<StockData | null>(null)

  useEffect(() => {
    ;(async () => {
      const url = `https://api.marketstack.com/v1/tickers?access_key=54629f1b2b48254a18f69552e2cb3939&symbol=${stockName}`
      const options = {
        method: 'GET',
      }

      try {
        const response = await fetch(url, options)
        const result = (await response.text()) as unknown as string
        const res = (await JSON.parse(result)) as StocksResponse<StockData>
        setStocks(res.data[0])
      } catch (error) {
        console.error(error)
        setError(error)
      } finally {
        setIsLoading(false)
      }
    })()
  }, [])

  return { stocksDetails, isLoading, error }
}

export function useStockChartData(stockName: string) {
  const [isLoading, setIsLoading] = useState(true)
  const [stocksDetails, setStocks] = useState<IntradayChartData[] | null>(null)
  const [error, setError] = useState<any>(null)

  useEffect(() => {
    ;(async () => {
      const url = `https://api.marketstack.com/v1/intraday?access_key=54629f1b2b48254a18f69552e2cb3939&symbols=${stockName}&interval=15min&limit=6`
      const options = {
        method: 'GET',
      }

      try {
        const response = await fetch(url, options)
        const result = (await response.text()) as unknown as string
        const res = (await JSON.parse(result)) as StocksResponse<StockData>
        setStocks(res.data)
      } catch (error) {
        console.error(error)
        setError(error)
      } finally {
        setIsLoading(false)
      }
    })()
  }, [])

  return { stocksDetails, isLoading, error }
}
