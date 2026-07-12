import React, { createContext, useContext, useState, useCallback } from 'react'
import { CartItem, Product } from '../types'

interface CartContextType {
  cart: CartItem[]
  addToCart: (product: Product) => void
  updateQty: (id: number, delta: number) => void
  removeFromCart: (id: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
  isOpen: boolean
  toggleCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const addToCart = useCallback((product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id)
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        )
      }
      return [...prev, { ...product, qty: 1 }]
    })
  }, [])

  const updateQty = useCallback((id: number, delta: number) => {
    setCart(prev => {
      return prev
        .map(item => {
          if (item.id === id) {
            const newQty = item.qty + delta
            return newQty > 0 ? { ...item, qty: newQty } : null
          }
          return item
        })
        .filter((item): item is CartItem => item !== null)
    })
  }, [])

  const removeFromCart = useCallback((id: number) => {
    setCart(prev => prev.filter(item => item.id !== id))
  }, [])

  const clearCart = useCallback(() => {
    setCart([])
  }, [])

  const toggleCart = useCallback(() => {
    setIsOpen(prev => !prev)
  }, [])

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0)
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0)

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQty,
        removeFromCart,
        clearCart,
        totalItems,
        totalPrice,
        isOpen,
        toggleCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
