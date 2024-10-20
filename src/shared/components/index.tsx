import { windowWidth } from 'shared/types'
import React from 'react'
import { View } from 'react-native'

export const LineDecorator = ({
  vertical = false,
  width = (windowWidth - 32 * 3) / 2 - 12,
  color = 'rgba(0,0,0,0.08)',
}: {
  vertical?: boolean
  width?: number
  color?: string
}) => (
  <View
    style={{
      height: vertical ? width : 1,
      backgroundColor: color,
      width: !vertical ? width : 1,
      alignSelf: 'center',
    }}
  />
)
