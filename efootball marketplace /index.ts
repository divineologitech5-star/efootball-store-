export interface User {
  id: string
  email: string
  name: string
  isSeller: boolean
  sellerPaid: boolean
  country: string
  createdAt: string
}

export interface AccountListing {
  id: string
  sellerId: string
  sellerName: string
  title: string
  description: string
  teamStrength: number
  players: string[]
  price: number
  currency: string
  loginEmail: string
  loginPassword: string
  status: 'available' | 'sold' | 'pending'
  imageUrl?: string
  createdAt: string
}

export interface Transaction {
  id: string
  buyerId: string
  sellerId: string
  accountId: string
  amount: number
  currency: string
  platformFee: number
  sellerEarnings: number
  status: 'pending' | 'completed' | 'failed'
  createdAt: string
}
