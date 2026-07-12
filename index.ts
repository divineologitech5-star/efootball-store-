export interface Product {
  id: number
  name: string
  category: string
  description: string
  price: number
  oldPrice: number | null
  emoji: string
  tag: 'new' | 'hot' | 'sale'
  tagText: string
}

export interface CartItem extends Product {
  qty: number
}

export interface Stat {
  value: string
  label: string
}

export interface Feature {
  icon: string
  title: string
  description: string
}
