import { TouchableOpacity, View } from 'react-native'
import React from 'react'
import GradientText from 'shared/components/GradientText'
import { LinearGradient } from 'react-native-linear-gradient'

export const CustomTabLabel = (props: any) => (
  <GradientText
    text={props.name}
    fontSize={12}
    isGradientFill
    {...props}
    gradientColors={props.focused ? ['#19732d', '#19b845'] : ['rgba(178,191,181,0.36)', 'rgba(174,186,170,0.3)']}
  />
)
export const CustomTabButton = (props: any) => (
  <TouchableOpacity {...props}>
    <View>
      <LinearGradient
        colors={['#19732d', '#24aa49']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          width: 64,
          height: props.accessibilityState.selected ? 2 : 0,
          alignSelf: 'center',
          marginBottom: 6,
        }}
      />
      {props.children}
    </View>
  </TouchableOpacity>
)

export * from './TabBarIcons'
