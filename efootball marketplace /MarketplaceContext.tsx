import React, { createContext, useContext, useState, useCallback } from 'react'
import { AccountListing, Transaction } from '../types'

interface MarketplaceContextType {
  listings: AccountListing[]
  transactions: Transaction[]
  myListings: AccountListing[]
  myPurchases: AccountListing[]
  addListing: (listing: Omit<AccountListing, 'id' | 'createdAt' | 'status'>) => void
  buyAccount: (accountId: string, buyerId: string) => Transaction | null
  getAccountById: (id: string) => AccountListing | undefined
  getSellerListings: (sellerId: string) => AccountListing[]
}

const AuthContext = createContext<MarketplaceContextType | undefined>(undefined)

// Demo listings
const DEMO_LISTINGS: AccountListing[] = [
  {
    id: '1',
    sellerId: '2',
    sellerName: 'Demo Seller',
    title: 'Epic Account - 2500 Team Strength',
    description: 'Maxed out team with Messi, Ronaldo, Neymar. All legends unlocked.',
    teamStrength: 2500,
    players: ['Messi', 'Ronaldo', 'Neymar', 'Mbappé', 'Haaland'],
    price: 15000,
    currency: 'NGN',
    loginEmail: 'seller1@game.com',
    loginPassword: 'password123',
    status: 'available',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    sellerId: '2',
    sellerName: 'Demo Seller',
    title: 'Pro Account - 2200 Team Strength',
    description: 'Great starter account with solid players and 500k GP.',
    teamStrength: 2200,
    players: ['Lewandowski', 'Salah', 'De Bruyne', 'Van Dijk'],
    price: 8000,
    currency: 'NGN',
    loginEmail: 'seller2@game.com',
    loginPassword: 'password456',
    status: 'available',
    createdAt: new Date().toISOString(),
  },
]

export function MarketplaceProvider({ children }: { children: React.ReactNode }) {
  const [listings, setListings] = useState<AccountListing[]>(() => {
    const stored = localStorage.getItem('efootball_listings')
    return stored ? [...JSON.parse(stored), ...DEMO_LISTINGS] : DEMO_LISTINGS
  })
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const stored = localStorage.getItem('efootball_transactions')
    return stored ? JSON.parse(stored) : []
  })

  const addListing = useCallback((listing: Omit<AccountListing, 'id' | 'createdAt' | 'status'>) => {
    const newListing: AccountListing = {
      ...listing,
      id: Date.now().toString(),
      status: 'available',
      createdAt: new Date().toISOString(),
    }
    setListings(prev => {
      const updated = [newListing, ...prev]
      localStorage.setItem('efootball_listings', JSON.stringify(updated.filter(l => !DEMO_LISTINGS.includes(l))))
      return updated
    })
  }, [])

  const buyAccount = useCallback((accountId: string, buyerId: string): Transaction | null => {
    const account = listings.find(l => l.id === accountId && l.status === 'available')
    if (!account) return null

    const platformFee = Math.round(account.price * 0.2)
    const sellerEarnings = account.price - platformFee

    const transaction: Transaction = {
      id: Date.now().toString(),
      buyerId,
      sellerId: account.sellerId,
      accountId,
      amount: account.price,
      currency: account.currency,
      platformFee,
      sellerEarnings,
      status: 'completed',
      createdAt: new Date().toISOString(),
    }

    setTransactions(prev => {
      const updated = [...prev, transaction]
      localStorage.setItem('efootball_transactions', JSON.stringify(updated))
      return updated
    })

    setListings(prev => prev.map(l => l.id === accountId ? { ...l, status: 'sold' as const } : l))

    return transaction
  }, [listings])

  const getAccountById = useCallback((id: string) => {
    return listings.find(l => l.id === id)
  }, [listings])

  const getSellerListings = useCallback((sellerId: string) => {
    return listings.filter(l => l.sellerId === sellerId)
  }, [listings])

  const myListings = listings
  const myPurchases = listings.filter(l => l.status === 'sold')

  return (
    <AuthContext.Provider value={{
      listings,
      transactions,
      myListings,
      myPurchases,
      addListing,
      buyAccount,
      getAccountById,
      getSellerListings,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useMarketplace() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useMarketplace must be used within a MarketplaceProvider')
  }
  return context
}
