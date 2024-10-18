import { View } from 'react-native'
import React from 'react'
import { useAppSelector } from 'shared/store'
import { windowWidth } from 'shared/types'
import GradientButtonFill from 'shared/components/GradientButtonFill'

export const OpenCartButton = () => {
  const isButtonShown = useAppSelector((state) => state.cart.isButtonShown)
  const totalPrice = useAppSelector((state) => state.cart.totalPrice)
  return (
    isButtonShown && (
      <View
        style={{
          zIndex: 998,
          margin: 32,
          width: windowWidth - 32 * 2,
          position: 'absolute',
          bottom: 0,
        }}
      >
        <GradientButtonFill onPress={() => {}}>{`Перейти в кошик $${totalPrice}`}</GradientButtonFill>
      </View>
    )
  )
}
