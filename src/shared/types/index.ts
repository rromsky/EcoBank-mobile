import { Dimensions } from 'react-native'

export type ItemCategory = 'coin' | 'banknote' | 'souvenir'

export type ItemType = {
  title: string
  price: number
  description: string
  shortDescription: string
  code: string
  amount?: number
  category: ItemCategory
}

export const { width: windowWidth, height: windowHeight } = Dimensions.get('window')

export const wait = async (duration?: number) => {
  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve(1)
    }, duration || 600)
  })
}
