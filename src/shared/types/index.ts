import { Dimensions } from 'react-native'

export const { width: windowWidth, height: windowHeight } = Dimensions.get('window')

export const wait = async (duration?: number) => {
  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve(1)
    }, duration || 600)
  })
}
