import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import { StockData } from 'shared/hooks/useStocksData.ts'
import { theme } from 'theme'
import { LineDecorator } from 'shared/components'
import React, { useCallback } from 'react'
import { LinearGradient } from 'react-native-linear-gradient'
import { windowWidth } from 'shared/types'
import { useNavigationTyped } from 'shared/navigation'
import { Route } from 'src/app/types.ts'

const MockedData: StockData[] = [
  {
    country: null,
    has_eod: true,
    has_intraday: false,
    name: 'Vodafone Group plc',
    stock_exchange: {
      acronym: 'NASDAQ',
      city: 'New York',
      country: 'USA',
      country_code: 'US',
      mic: 'XNAS',
      name: 'NASDAQ Stock Exchange',
      website: 'www.nasdaq.com',
    },
    symbol: 'VOD',
  },
  {
    country: null,
    has_eod: true,
    has_intraday: false,
    name: 'Microsoft Corporation',
    stock_exchange: {
      acronym: 'NASDAQ',
      city: 'New York',
      country: 'USA',
      country_code: 'US',
      mic: 'XNAS',
      name: 'NASDAQ Stock Exchange',
      website: 'www.nasdaq.com',
    },
    symbol: 'MSFT',
  },
  {
    country: null,
    has_eod: true,
    has_intraday: false,
    name: 'Apple Inc',
    stock_exchange: {
      acronym: 'NASDAQ',
      city: 'New York',
      country: 'USA',
      country_code: 'US',
      mic: 'XNAS',
      name: 'NASDAQ Stock Exchange',
      website: 'www.nasdaq.com',
    },
    symbol: 'AAPL',
  },
  {
    country: null,
    has_eod: true,
    has_intraday: false,
    name: 'Amazon.com Inc',
    stock_exchange: {
      acronym: 'NASDAQ',
      city: 'New York',
      country: 'USA',
      country_code: 'US',
      mic: 'XNAS',
      name: 'NASDAQ Stock Exchange',
      website: 'www.nasdaq.com',
    },
    symbol: 'AMZN',
  },
  {
    country: null,
    has_eod: true,
    has_intraday: false,
    name: 'Alibaba Group Holding Ltd',
    stock_exchange: {
      acronym: 'NYSE',
      city: 'New York',
      country: 'USA',
      country_code: 'US',
      mic: 'XNYS',
      name: 'New York Stock Exchange',
      website: 'www.nyse.com',
    },
    symbol: 'BABA',
  },
  {
    country: null,
    has_eod: true,
    has_intraday: false,
    name: 'Meta Platforms Inc - Class A',
    stock_exchange: {
      acronym: 'NASDAQ',
      city: 'New York',
      country: 'USA',
      country_code: 'US',
      mic: 'XNAS',
      name: 'NASDAQ Stock Exchange',
      website: 'www.nasdaq.com',
    },
    symbol: 'FB',
  },
]

export default function HorizontalItemComponent() {
  const navigation = useNavigationTyped()

  const renderItem = useCallback(({ item }: { item: StockData }) => {
    const handleOnPress = () => {
      navigation.navigate(Route.StockDetailsScreen as never, { item: item } as never)
    }
    return (
      <TouchableOpacity onPress={handleOnPress}>
        <LinearGradient
          colors={[theme.green, theme.gray]}
          style={{ width: 102, height: 116, padding: 14, gap: 6, borderRadius: 4, alignItems: 'center' }}
        >
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={{ fontSize: 19, fontFamily: 'Manrope-Bold', color: theme.white }}
          >
            {item.symbol}
          </Text>

          <LineDecorator color={theme.milk} width={64} />
          <Text
            numberOfLines={2}
            adjustsFontSizeToFit
            style={{ fontSize: 14, fontFamily: 'Manrope', color: theme.white }}
          >
            {item.name}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    )
  }, [])

  return (
    <>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        contentContainerStyle={{ padding: 24, gap: 12 }}
        data={MockedData}
        renderItem={renderItem}
      />
      <LineDecorator color={theme.milk} width={windowWidth - 32} />
    </>
  )
}
