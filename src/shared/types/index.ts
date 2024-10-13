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
