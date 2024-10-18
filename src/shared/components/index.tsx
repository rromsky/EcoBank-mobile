import { windowWidth } from 'shared/types'
import React from 'react'
import { View } from 'react-native'

export const LineDecorator = ({ width = (windowWidth - 32 * 3) / 2 - 12 }: { width?: number }) => (
  <View style={{ height: 1, backgroundColor: 'rgba(0,0,0,0.08)', width, alignSelf: 'center' }} />
)
